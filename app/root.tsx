import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
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
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-200">
        <div className="min-h-screen flex">
          <Sidebar /> {/* 사이드바 */}
          <div className="flex-1 flex flex-col">
            <Header /> {/* 헤더 */}
            <main className="flex-1 p-4 sm:p-6">
              <Outlet /> {/* 페이지 컨텐츠 */}
            </main>
          </div>
        </div>
        <ScrollRestoration /> {/* 스크롤 위치 자동 관리 */}
        <Scripts /> {/* 스크립트 */}
        <LiveReload /> {/* 라이브 리로드 */}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
  {
    /* 페이지 컨텐츠 */
  }
}
