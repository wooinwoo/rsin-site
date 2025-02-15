import { Link, useNavigate } from "@remix-run/react";
import { Button } from "~/shared/ui/components/Button";
import { CheckCircleIcon } from "~/shared/ui/icons/CheckCircleIcon";

export default function EmailSent() {
  const navigate = useNavigate();

  const handleResend = async () => {
    navigate("/auth/forgot-password");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-200 rounded-2xl shadow-lg p-8 space-y-6 border border-gray-300 text-center">
          <div className="text-green-500 mb-4">
            <CheckCircleIcon className="h-16 w-16 mx-auto" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">이메일 전송 완료</h2>
            <p className="text-gray-600">
              비밀번호 재설정 링크를 이메일로 전송했습니다.
              <br />
              이메일을 확인해 주세요.
            </p>
          </div>

          <div className="pt-4">
            <p className="text-sm text-gray-600 mb-4">이메일을 받지 못하셨나요?</p>
            <Button
              variant="outline"
              className="w-full h-12 border-gray-300 hover:bg-gray-100 text-gray-900 
                       rounded-xl font-medium transition-all"
              onClick={handleResend}
            >
              이메일 다시 보내기
            </Button>
          </div>

          <div className="pt-4">
            <Link
              to="/auth/login"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm"
            >
              로그인으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
