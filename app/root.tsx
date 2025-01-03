import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
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
export type LoaderData = {
  user: User | null;
};

export const shouldRevalidate: ShouldRevalidateFunction = ({
  currentUrl,
  nextUrl,
  formAction,
  defaultShouldRevalidate,
}) => {
  // 같은 페이지 내에서 검색이나 페이지네이션으로 인한 변경인 경우
  if (currentUrl.pathname === nextUrl.pathname && currentUrl.search !== nextUrl.search) {
    return false;
  }

  // 로그인/로그아웃 관련 action이 아닌 경우 루트 loader 재실행 방지
  if (!formAction?.includes("/auth")) {
    return false;
  }

  return defaultShouldRevalidate;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const isAuthPage = url.pathname.startsWith("/auth");

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

    // 토큰이 없는 경우
    if (!isAuthPage) {
      return redirect("/auth/login");
    }

    // 인증 페이지면서 토큰이 없는 경우
    return json<LoaderData>({ user: null });
  } catch (error) {
    if (!isAuthPage) {
      return redirect("/auth/login");
    }
    return json<LoaderData>({ user: null });
  }
};

export default function App() {
  const location = useLocation();

  const isAuthPage = location.pathname.startsWith("/auth");

  const { user } = useLoaderData() as LoaderData;
  const updateUser = useAuthStore((state) => state.updateUser);

  useEffect(() => {
    updateUser(user || {}); // updateUser 사용
  }, [user, updateUser]);
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-200 text-gray-800">
        <GlobalLoadingIndicator />
        {isAuthPage ? (
          <Outlet />
        ) : (
          <div className="min-h-screen flex">
            <Sidebar />
            {/* flex-1과 min-w-0를 함께 사용하여 flex item이 제대로 줄어들 수 있도록 함 */}
            <div className="flex-1 flex flex-col min-w-0">
              <Header />
              {/* main에도 min-w-0 추가 */}
              <main className="flex-1 p-2 sm:p-4 min-w-0 ">
                <Outlet />
              </main>
            </div>
          </div>
        )}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: "/app/tailwind.css" }];
}
