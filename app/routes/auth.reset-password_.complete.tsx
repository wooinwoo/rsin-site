import { Link } from "@remix-run/react";
import { Button } from "~/shared/ui/components/Button";
import { CheckCircleIcon } from "~/shared/ui/icons";

export default function ResetComplete() {
  return (
    <div className="flex min-h-screen items-center justify-center  px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg text-center">
        <div className="text-green-500 mb-4">
          <CheckCircleIcon className="h-16 w-16 mx-auto" />
        </div>

        <h2 className="text-2xl font-bold">비밀번호 변경 완료</h2>
        <p className="text-gray-600">
          비밀번호가 성공적으로 변경되었습니다.
          <br />새 비밀번호로 로그인해 주세요.
        </p>

        <Link to="/auth/login" className="">
          <Button className="w-full mt-6">로그인하기</Button>
        </Link>
      </div>
    </div>
  );
}
