import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  useLocation,
  useLoaderData,
  useMatches,
} from "@remix-run/react";
import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { getApiToken } from "~/cookies.server";
import { authApi } from "./entities/auth/api";
import { Header } from "./shared/ui/layouts/Header";
import { Sidebar } from "./shared/ui/layouts/Sidebar";
import { GlobalLoadingIndicator } from "./shared/ui/components/GlobalLoadingIndicator";
import { useAuthStore } from "./shared/store/auth";
import { useEffect } from "react";
import "~/tailwind.css";
import { User } from "./shared/store/auth/types";
import { ShouldRevalidateFunction } from "@remix-run/react";
import { GlobalToast } from "./shared/ui/components/GlobalToast";
import { getNotifications } from "~/features/notification/api/notification.server";
import type { Notification } from "~/entities/notification/model";
import { initWebViewFunctions } from "~/shared/utils/webview";
import { checkUserAgent } from "~/middleware/checkUserAgent.server";

export type LoaderData = {
  user: User | null;
  notifications: Notification[];
};

export interface RouteHandle {
  isPublic?: boolean;
  standalone?: boolean;
}

export const shouldRevalidate: ShouldRevalidateFunction = ({
  currentUrl,
  nextUrl,
  formAction,
  defaultShouldRevalidate,
}) => {
  if (formAction?.includes("/resources/notifications/read")) {
    return true;
  }

  if (currentUrl.pathname === nextUrl.pathname && currentUrl.search !== nextUrl.search) {
    return false;
  }

  if (formAction?.includes("/auth") || formAction?.includes("/profile")) {
    return true;
  }

  if (currentUrl.pathname.includes("/profile") && !nextUrl.pathname.includes("/profile")) {
    return true;
  }

  return defaultShouldRevalidate;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const isAuthPage = url.pathname.startsWith("/auth");
  try {
    const isMobileAccessDenied = url.pathname === "/mobile-access-denied";

    if (isMobileAccessDenied) {
      return json<LoaderData>({ user: null, notifications: [] });
    }

    // 정적 자원이나 데이터 요청은 체크하지 않음
    if (
      url.pathname.startsWith("/build/") ||
      url.pathname.startsWith("/assets/") ||
      url.pathname.startsWith("/resources/") ||
      url.pathname.includes(".")
    ) {
      return null;
    }

    const userAgentCheck = await checkUserAgent(request);
    if (userAgentCheck) return userAgentCheck;

    const token = await getApiToken(request);

    if (!token && !isAuthPage) {
      return redirect("/auth/login");
    }

    if (token) {
      try {
        const [userResponse, notificationsResponse] = await Promise.all([
          authApi.getMyProfile(token),
          getNotifications(request),
        ]);

        const userData = userResponse.data as User;

        if (isAuthPage) {
          return redirect("/");
        }

        return json<LoaderData>({
          user: userData,
          notifications: notificationsResponse.notifications,
        });
      } catch (error) {
        if (!isAuthPage) {
          return redirect("/auth/login");
        }
        return json<LoaderData>({ user: null, notifications: [] });
      }
    }

    if (isAuthPage) {
      return json<LoaderData>({ user: null, notifications: [] });
    }

    return redirect("/auth/login");
  } catch (error) {
    console.error("Loader Error:", error);
    if (!isAuthPage) {
      return redirect("/auth/login");
    }
    return json<LoaderData>({ user: null, notifications: [] });
  }
};

function Document({
  children,
  isStandalone = false,
}: {
  children: React.ReactNode;
  isStandalone?: boolean;
}) {
  if (isStandalone) {
    return (
      <html lang="ko">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>RSIN</title>
          <link rel="icon" type="image/jpg" href="/images/favicon.png" />
          <Meta />
          <Links />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  }

  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>RSIN</title>
        <link rel="icon" type="image/jpg" href="/images/favicon.png" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalLoadingIndicator />
      <GlobalToast />
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-2 pt-3 sm:p-4 min-w-0 bg-gray-200">{children}</main>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const location = useLocation();
  const matches = useMatches();
  const currentRoute = matches[matches.length - 1];
  const isStandalone = (currentRoute?.handle as RouteHandle)?.standalone;
  const isAuthPage = location.pathname.startsWith("/auth");
  const { user } = useLoaderData<LoaderData>();
  const { updateUser, clearUser } = useAuthStore();

  useEffect(() => {
    if (user) {
      updateUser(user);
    } else {
      clearUser();
    }
  }, [user, updateUser, clearUser]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      initWebViewFunctions();
    }
  }, []);

  return (
    <Document isStandalone={isStandalone}>
      {isStandalone ? (
        <Outlet />
      ) : isAuthPage ? (
        <Outlet />
      ) : (
        <Layout>
          <Outlet />
        </Layout>
      )}
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth");

  return (
    <Document>
      <div className={isAuthPage ? "min-h-screen" : ""}>
        {isAuthPage ? (
          <div className="flex items-center justify-center p-4 min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-auto">
              <ErrorContent error={error} />
            </div>
          </div>
        ) : (
          <Layout>
            <div className="h-full flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-auto">
                <ErrorContent error={error} />
              </div>
            </div>
          </Layout>
        )}
      </div>
    </Document>
  );
}

function ErrorContent({ error }: { error: unknown }) {
  return (
    <>
      {isRouteErrorResponse(error) ? (
        <>
          <h1 className="text-2xl font-bold mb-4">
            {error.status === 404
              ? "페이지를 찾을 수 없습니다"
              : error.status === 500
              ? "서버 오류가 발생했습니다"
              : error.data.message || "오류가 발생했습니다"}
          </h1>
          <p className="text-gray-600 mb-6">
            {error.status === 404
              ? "요청하신 페이지가 존재하지 않습니다."
              : "잠시 후 다시 시도해주세요."}
          </p>
        </>
      ) : error instanceof Error ? (
        <>
          <h1 className="text-2xl font-bold mb-4">예상치 못한 오류가 발생했습니다</h1>
          <p className="text-gray-600 mb-6">{error.message}</p>
        </>
      ) : (
        <h1 className="text-2xl font-bold mb-4">알 수 없는 오류가 발생했습니다</h1>
      )}

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => window.history.back()}
          className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          이전으로
        </button>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          새로고침
        </button>
      </div>
    </>
  );
}
