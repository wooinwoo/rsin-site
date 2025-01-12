import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { useLocation, useLoaderData } from "react-router-dom";
import { getApiToken } from "~/cookies.server";
import { authApi } from "./entities/auth/api";
import { Header } from "./shared/ui/layouts/Header";
import { Sidebar } from "./shared/ui/layouts/Sidebar";
import { GlobalLoadingIndicator } from "./shared/ui/components/GlobalLoadingIndicator";
import { useAuthStore } from "./shared/store/auth";
import { useEffect } from "react";
import "./tailwind.css";
import { User } from "./shared/store/auth/types";
import { ShouldRevalidateFunction } from "@remix-run/react";
import { GlobalToast } from "./shared/ui/components/GlobalToast";
export type LoaderData = {
  user: User | null;
};

export const shouldRevalidate: ShouldRevalidateFunction = ({
  currentUrl,
  nextUrl,
  formAction,
  defaultShouldRevalidate,
}) => {
  if (currentUrl.pathname === nextUrl.pathname && currentUrl.search !== nextUrl.search) {
    return false;
  }

  if (!formAction?.includes("/auth")) {
    return false;
  }

  return defaultShouldRevalidate;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const isAuthPage = url.pathname.startsWith("/auth");

  if (
    process.env.NODE_ENV === "production" &&
    url.protocol === "http:" &&
    !url.hostname.includes("localhost")
  ) {
    const secureUrl = request.url.replace("http:", "https:");
    return redirect(secureUrl, {
      status: 301,
      headers: {
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      },
    });
  }

  try {
    const token = await getApiToken(request);

    if (!token && !isAuthPage) {
      return redirect("/auth/login");
    }
    if (token) {
      const response = await authApi.getMyProfile(token);
      const userData = response.data as User;

      if (isAuthPage) {
        return json<LoaderData>({ user: userData });
      }

      return json<LoaderData>({ user: userData });
    }

    if (!isAuthPage) {
      return redirect("/auth/login");
    }

    return json<LoaderData>({ user: null });
  } catch (error) {
    if (!isAuthPage) {
      return redirect("/auth/login");
    }
    return json<LoaderData>({ user: null });
  }
};

function Document({ children, title = "RSIN" }: { children: React.ReactNode; title?: string }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-200 text-gray-800">
        <GlobalLoadingIndicator />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth");
  const { user } = useLoaderData() as LoaderData;
  const updateUser = useAuthStore((state) => state.updateUser);

  useEffect(() => {
    updateUser(user || {});
  }, [user, updateUser]);

  return (
    <Document>
      {isAuthPage ? (
        <Outlet />
      ) : (
        <>
          <GlobalToast />
          <div className="min-h-screen flex">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <Header />
              <main className="flex-1 p-2 sm:p-4 min-w-0 ">
                <Outlet />
              </main>
            </div>
          </div>
        </>
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
      {isAuthPage ? (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <ErrorContent error={error} />
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Header />
            <main className="flex-1 p-2 sm:p-4 min-w-0">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto mt-8 text-center">
                <ErrorContent error={error} />
              </div>
            </main>
          </div>
        </div>
      )}
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

export function links() {
  return [{ rel: "stylesheet", href: "/app/tailwind.css" }];
}
