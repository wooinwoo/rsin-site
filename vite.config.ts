import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, loadEnv } from "vite"; // loadEnv 추가
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  // mode 파라미터 추가
  const env = loadEnv(mode, process.cwd(), ""); // env 로드

  return {
    plugins: [
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          v3_lazyRouteDiscovery: true,
          v3_singleFetch: true,
        },
      }),
      tsconfigPaths(),
    ],
    define: {
      "process.env.API_URL": JSON.stringify(env.API_URL),
    },
  };
});
