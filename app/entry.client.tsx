/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

// 원본 fetch 저장
const originalFetch = window.fetch;

// Remix의 모든 요청에 credentials: 'include' 추가
window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
  return originalFetch(input, {
    credentials: "include", // 이게 브라우저->Remix 서버 요청에 쿠키를 포함시킴
    ...init,
  });
};

startTransition(() => {
  hydrateRoot(document, <RemixBrowser />);
});
