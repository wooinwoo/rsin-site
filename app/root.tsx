import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { useLocation } from "react-router-dom";
import { getApiToken } from "~/cookies.server";
import { authApi } from "./entities/auth/api";
import { Header } from "./shared/ui/layouts/Header";
import { Sidebar } from "./shared/ui/layouts/Sidebar";
import { GlobalLoadingIndicator } from "./shared/ui/components/GlobalLoadingIndicator";
import "./tailwind.css";

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

      if (isAuthPage) {
        return redirect("/");
      }

      return json({ user: response.data });
    }

    return json({ user: null });
  } catch (error) {
    if (!isAuthPage) {
      return redirect("/auth/login");
    }
    return json({ user: null });
  }
};

export default function App() {
  const location = useLocation();

  const isAuthPage = location.pathname.startsWith("/auth");

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
