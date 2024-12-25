import { useState } from "react";
import { Link } from "@remix-run/react";
import { Input } from "~/shared/ui/components/Input";
import { Button } from "~/shared/ui/components/Button";
import { ERROR_MESSAGES } from "~/shared/constants/auth";
import { useNavigate } from "@remix-run/react";
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
      // 성공 시 sent 페이지로 리다이렉트
      navigate("/auth/forgot-password/sent");
    } catch (error) {
      setError(ERROR_MESSAGES.invalidEmail);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center  px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold">비밀번호 찾기</h2>
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
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "전송 중..." : "이메일 전송"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            로그인으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
