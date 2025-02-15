import type { RouteHandle } from "~/root"; // root.tsx에서 export 필요

export const handle: RouteHandle = {
  isPublic: true,
  standalone: true,
};

export default function MobileAccessDenied() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">앱에서만 이용 가능합니다</h1>
        <p className="text-gray-600">
          모바일 웹에서는 접근할 수 없습니다.
          <br />
          RSIN 앱을 이용해 주세요.
        </p>
      </div>
    </div>
  );
}
