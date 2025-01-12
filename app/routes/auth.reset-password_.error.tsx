import { Link } from "@remix-run/react";
import { Button } from "~/shared/ui/components/Button";
import { LogoIcon, XCircleIcon } from "~/shared/ui/icons";

export default function ResetError() {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-200 rounded-2xl shadow-lg p-8 border border-gray-300">
          <div className="text-center">
            {/* 에러 아이콘 */}
            <div className="mb-6">
              <XCircleIcon className="w-16 h-16 text-red-500 mx-auto" />
            </div>

            {/* 텍스트 영역 */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
                비밀번호 변경 실패
              </h1>
              <p className="text-gray-600 text-sm font-medium leading-relaxed">
                비밀번호 변경 중 문제가 발생했습니다.
                <br />
                다시 시도해 주세요.
              </p>
            </div>

            {/* 버튼 */}
            <Link to="/auth/forgot-password">
              <Button
                className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-xl 
                         font-medium transition-all shadow-lg shadow-gray-900/10"
              >
                비밀번호 찾기로 돌아가기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
