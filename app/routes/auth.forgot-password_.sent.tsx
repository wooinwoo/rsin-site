import { useState } from "react";
import { Link } from "@remix-run/react";
import { Button } from "~/shared/ui/components/Button";
import { CheckCircleIcon } from "~/shared/ui/icons/CheckCircleIcon";

export default function EmailSent() {
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const handleResend = async () => {
    setIsResending(true);
    try {
      // API 호출
      // await resendResetPasswordEmail();
      setCooldown(60); // 1분 쿨타임
      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white  p-8 shadow-lg text-center">
        <div className="text-green-500 mb-4">
          <CheckCircleIcon className="h-16 w-16 mx-auto" />
        </div>

        <h2 className="text-2xl font-bold">이메일 전송 완료</h2>
        <p className="text-gray-600">
          비밀번호 재설정 링크를 이메일로 전송했습니다.
          <br />
          이메일을 확인해 주세요.
        </p>

        <div className="pt-4">
          <p className="text-sm text-gray-500 mb-4">이메일을 받지 못하셨나요?</p>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleResend}
            disabled={isResending || cooldown > 0}
            size="lg"
          >
            {cooldown > 0
              ? `${cooldown}초 후 재전송 가능`
              : isResending
              ? "전송 중..."
              : "이메일 다시 보내기"}
          </Button>
        </div>

        <div className="text-center text-sm pt-4">
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            로그인으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
