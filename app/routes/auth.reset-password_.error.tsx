import { Link, useSearchParams } from "@remix-run/react";
import { Button } from "~/shared/ui/components/Button";
import { XCircleIcon } from "~/shared/ui/icons";
import { ERROR_MESSAGES } from "~/shared/constants/auth";

export default function ResetError() {
  const [searchParams] = useSearchParams();
  const errorType = searchParams.get("type") || "invalid";

  return (
    <div className="flex min-h-screen items-center justify-center  px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg text-center">
        <div className="text-red-500 mb-4">
          <XCircleIcon className="h-16 w-16 mx-auto" />
        </div>

        <h2 className="text-2xl font-bold">링크 오류</h2>
        <p className="text-gray-600 ">
          {errorType === "expired" ? ERROR_MESSAGES.expiredToken : ERROR_MESSAGES.invalidToken}
        </p>

        <Link to="/auth/forgot-password">
          <Button className="w-full mt-6" size="lg">
            비밀번호 찾기 다시 시도
          </Button>
        </Link>
      </div>
    </div>
  );
}
