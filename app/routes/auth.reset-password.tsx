import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "@remix-run/react";
import { Input } from "~/shared/ui/components/Input";
import { Button } from "~/shared/ui/components/Button";
import { ERROR_MESSAGES, PASSWORD_RULES } from "~/shared/constants/auth";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    passwordConfirm: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return;
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      navigate("/auth/forgot-password", { replace: true });
    }

    // 토큰 유효성 검사
    // validateToken(token, email);
  }, [searchParams, navigate]);

  const validatePassword = (password: string) => {
    if (password.length < PASSWORD_RULES.minLength || password.length > PASSWORD_RULES.maxLength) {
      return ERROR_MESSAGES.invalidPassword;
    }
    // 추가 유효성 검사 규칙들...
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setErrors((prev) => ({ ...prev, password: passwordError }));
      return;
    }
    if (formData.password !== formData.passwordConfirm) {
      setErrors((prev) => ({ ...prev, passwordConfirm: ERROR_MESSAGES.passwordMismatch }));
      return;
    }

    setIsLoading(true);
    try {
      // API 호출
      // await resetPassword({
      //   token: searchParams.get("token")!,
      //   email: searchParams.get("email")!,
      //   password: formData.password,
      // });
      navigate("/auth/reset-password/complete");
    } catch (error) {
      // 에러 처리
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold">새 비밀번호 설정</h2>
          <p className="mt-2 text-sm text-gray-600">새로 사용할 비밀번호를 입력해 주세요.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="새 비밀번호"
              value={formData.password}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, password: e.target.value }));
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              // error={errors.password}
              required
            />
            <p className="mt-1 text-xs text-gray-500">영문, 숫자, 특수문자 포함 8-20자</p>
          </div>
          <div>
            <Input
              type="password"
              placeholder="새 비밀번호 확인"
              value={formData.passwordConfirm}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, passwordConfirm: e.target.value }));
                setErrors((prev) => ({ ...prev, passwordConfirm: "" }));
              }}
              // error={errors.passwordConfirm}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading} size="lg">
            {isLoading ? "변경 중..." : "비밀번호 변경"}
          </Button>
        </form>
      </div>
    </div>
  );
}
