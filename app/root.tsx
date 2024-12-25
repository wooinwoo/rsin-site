import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { Header } from "./shared/ui/layouts/Header";
import { Sidebar } from "./shared/ui/layouts/Sidebar";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap",
  },
];

export default function App() {
  const location = useLocation();
  const isLoginPage = location.pathname.split("/")[1] === "auth";

  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-200 text-gray-800">
        {isLoginPage ? (
          <Outlet />
        ) : (
          <div className="min-h-screen flex">
            <Sidebar />
            {/* flex-1과 min-w-0를 함께 사용하여 flex item이 제대로 줄어들 수 있도록 함 */}
            <div className="flex-1 flex flex-col min-w-0">
              <Header />
              {/* main에도 min-w-0 추가 */}
              <main className="flex-1 p-4 min-w-0 ">
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
