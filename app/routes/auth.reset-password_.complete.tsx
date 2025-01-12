import { Link } from "@remix-run/react";
import { Button } from "~/shared/ui/components/Button";
import { CheckCircleIcon, LogoIcon } from "~/shared/ui/icons";

export default function ResetComplete() {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-200 rounded-2xl shadow-lg p-8 border border-gray-300">
          <div className="text-center">
            {/* 체크 아이콘 */}
            <div className="mb-6">
              <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
            </div>

            {/* 텍스트 영역 */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
                비밀번호 변경 완료
              </h1>
              <p className="text-gray-600 text-sm font-medium leading-relaxed">
                비밀번호가 성공적으로 변경되었습니다.
                <br />새 비밀번호로 로그인해 주세요.
              </p>
            </div>

            {/* 버튼 */}
            <Link to="/auth/login">
              <Button
                className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-xl 
                         font-medium transition-all shadow-lg shadow-gray-900/10"
              >
                로그인하기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
