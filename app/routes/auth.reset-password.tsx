import { json, LoaderFunctionArgs, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import { accountApi } from "~/entities/account/api";
import { Button } from "~/shared/ui/components/Button";
import { EyeIcon, EyeOffIcon, LogoIcon } from "~/shared/ui/icons";

type ActionData = { success?: boolean; error?: string };

// accessToken 체크
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const accessToken = url.searchParams.get("accessToken");

  if (!accessToken) {
    return redirect("/auth/login");
  }

  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const url = new URL(request.url);
  const accessToken = url.searchParams.get("accessToken");
  const newPassword = formData.get("newPassword");
  const confirmPassword = formData.get("confirmPassword");

  // 비밀번호 유효성 검사
  if (newPassword !== confirmPassword) {
    return json({ error: "새 비밀번호가 일치하지 않습니다." });
  }

  // 비밀번호 복잡도 검사
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!passwordRegex.test(newPassword as string)) {
    return json({
      error: "비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.",
    });
  }

  try {
    await accountApi.resetPassword(accessToken as string, {
      password: newPassword as string,
    });

    return redirect("/auth/reset-password/complete");
  } catch (error) {
    console.error("Password Reset Error:", error);
    return redirect("/auth/reset-password/error");
  }
}

export default function ResetPasswordPage() {
  const actionData = useActionData<ActionData>();
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false,
  });
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-200 rounded-2xl shadow-lg p-8 space-y-8 border border-gray-300">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <LogoIcon className="w-12 h-12 text-gray-900" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">비밀번호 재설정</h1>
              <p className="text-gray-600 text-sm font-medium">새로운 비밀번호를 입력해주세요</p>
            </div>
          </div>

          <Form method="post" className="space-y-6">
            {actionData?.error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
                {actionData.error}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  name="newPassword"
                  placeholder="새 비밀번호"
                  required
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 bg-white rounded-xl border border-gray-300
                           focus:border-red-500/30 focus:ring-2 focus:ring-red-500/10 transition-all
                           text-gray-900 placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.new ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="새 비밀번호 확인"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 bg-white rounded-xl border border-gray-300
                           focus:border-red-500/30 focus:ring-2 focus:ring-red-500/10 transition-all
                           text-gray-900 placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.confirm ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium 
                       transition-all shadow-lg shadow-gray-900/10"
            >
              비밀번호 재설정
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
