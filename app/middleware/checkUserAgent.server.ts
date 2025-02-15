import { redirect } from "@remix-run/node";

// 체크가 제외되는 경로들을 명시적으로 지정
const EXCLUDED_ROUTES = ["/mobile-access-denied", "/build", "/assets", "/resources"];

export function checkUserAgent(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // 제외 경로이거나 정적 파일인 경우 체크 건너뛰기
  const shouldSkip = EXCLUDED_ROUTES.some(
    (route) => pathname.startsWith(route) || pathname.includes(".")
  );

  if (shouldSkip) {
    return null;
  }

  const userAgent = request.headers.get("user-agent") || "";
  const isMobile = /Mobile|Android|iPhone/i.test(userAgent);
  const isRsinApp = userAgent.includes("rsin-app");
  const isPC = !isMobile;

  // 디버깅을 위한 로그
  console.log("Current User-Agent:", userAgent);
  console.log("Is Mobile:", isMobile);

  console.log("Check results:", { isMobile, isRsinApp, isPC });

  if (isPC) return null;

//  if (isMobile && !isRsinApp) {
//    return redirect("/mobile-access-denied");
//  }

  return null;
}
