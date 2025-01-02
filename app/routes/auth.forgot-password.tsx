import { useState } from "react";
import { Link } from "@remix-run/react";
import { Input } from "~/shared/ui/components/Input";
import { Button } from "~/shared/ui/components/Button";
import { ERROR_MESSAGES } from "~/shared/constants/auth";
import { useNavigate } from "@remix-run/react";
import { LogoIcon } from "~/shared/ui/icons";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // API 호출
      // await sendResetPasswordEmail(email);
      navigate("/auth/forgot-password/sent");
    } catch (error) {
      setError(ERROR_MESSAGES.invalidEmail);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-200 rounded-2xl shadow-lg p-8 space-y-6 border border-gray-300">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">비밀번호 찾기</h2>
            <p className="mt-2 text-sm text-gray-600">
              가입한 이메일 주소를 입력하시면
              <br />
              비밀번호 재설정 링크를 보내드립니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={error}
                className="w-full h-12 px-4 bg-white rounded-xl border border-gray-300
                         focus:border-red-500/30 focus:ring-2 focus:ring-red-500/10 transition-all
                         text-gray-900 placeholder:text-gray-500"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium 
                       transition-all shadow-lg shadow-gray-900/10"
              disabled={isLoading}
            >
              {isLoading ? "전송 중..." : "이메일 전송"}
            </Button>
          </form>

          <div className="text-center text-sm">
            <Link
              to="/auth/login"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              로그인으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
