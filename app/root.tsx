import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useLoaderData,
} from "@remix-run/react";
import { json, redirect, type LinksFunction, type LoaderFunctionArgs } from "@remix-run/node";
import { useEffect } from "react";
import { authApi } from "~/entities/auth/api";
import { useAuthStore } from "~/shared/store";
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

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const isAuthPath = url.pathname.startsWith("/auth");

  try {
    const response = await authApi.getMyProfile();
    const userData = response; // API 응답에서 data 객체 접근

    // 인증된 사용자가 auth 페이지 접근 시도하면 메인으로 리다이렉트
    if (isAuthPath) {
      return redirect("/");
    }

    return json({
      isAuthenticated: true,
      additionalUserInfo: {
        birth: userData.birth,
        phone: userData.phone,
        mbti: userData.mbti,
        joinedAt: userData.joinedAt,
        empNo: userData.empNo,
        name: userData.name,
        email: userData.email,
        thumbnailPath: userData.thumbnailPath,
        position: userData.position,
        departmentId: userData.departmentId,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    // 보호된 라우트 접근 시 로그인으로 리다이렉트
    if (!isAuthPath) {
      // return redirect("/auth/login");
    }
    return json({
      isAuthenticated: false,
      additionalUserInfo: null,
    });
  }
}

export default function App() {
  const location = useLocation();
  const { additionalUserInfo, isAuthenticated } = useLoaderData<typeof loader>();
  const updateUser = useAuthStore((state) => state.updateUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const user = useAuthStore((state) => state.user);
  const isLoginPage = location.pathname.startsWith("/auth");

  useEffect(() => {
    // 서버미인증 로컬에 user 정보가 있을시 초기화
    if (!isAuthenticated && user) {
      // clearUser();
    }

    // 서버인증 및 추가 정보가 있는 경우 업데이트
    if (isAuthenticated && additionalUserInfo) {
      updateUser(additionalUserInfo);
    }
  }, [isAuthenticated, additionalUserInfo, updateUser, clearUser, user]);

  // 스토어 조작 감지 시 로그인 페이지
  useEffect(() => {
    if (!isLoginPage && !isAuthenticated && user) {
      // window.location.href = "/auth/login";
    }
  }, [isLoginPage, isAuthenticated, user]);

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
