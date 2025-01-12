import { RemixBrowser } from "@remix-run/react";
import { startTransition } from "react";
import { hydrateRoot } from "react-dom/client";

// 서비스 워커 등록 해제
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}

// HTTPS 강제 처리
if (typeof window !== "undefined") {
  // pushState 수정
  const originalPushState = window.history.pushState;
  window.history.pushState = function (state, title, url) {
    try {
      if (url && typeof url === "string" && url.startsWith("http:")) {
        url = url.replace("http:", "https:");
      }
      return originalPushState.call(this, state, title, url);
    } catch (error) {
      console.error("Navigation error:", error);
      return originalPushState.call(this, state, title, url);
    }
  };

  // replaceState 수정 (추가 안전장치)
  const originalReplaceState = window.history.replaceState;
  window.history.replaceState = function (state, title, url) {
    try {
      if (url && typeof url === "string" && url.startsWith("http:")) {
        url = url.replace("http:", "https:");
      }
      return originalReplaceState.call(this, state, title, url);
    } catch (error) {
      console.error("Navigation error:", error);
      return originalReplaceState.call(this, state, title, url);
    }
  };
}

startTransition(() => {
  hydrateRoot(document, <RemixBrowser />);
});
