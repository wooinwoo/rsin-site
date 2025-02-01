import { json, type ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useNavigate, useSubmit } from "@remix-run/react";
import { useState, useEffect } from "react";
import { saveApiToken } from "~/cookies.server";
import { authApi } from "~/entities/auth/api";
import { useAuthStore } from "~/shared/store/auth";
import { Button } from "~/shared/ui/components/Button";
import { EyeIcon, EyeOffIcon, LogoIcon } from "~/shared/ui/icons";
import type { SignInResponse } from "~/entities/auth/model";
import { User } from "~/shared/store/auth/types";
import { saveUserInfo } from "~/cookies.server";
type ActionData = { user?: SignInResponse; error?: string };

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await authApi.signIn({
      email: email as string,
      password: password as string,
    });

    const cookieHeader = await saveApiToken(response?.headers["set-cookie"]?.[0] ?? "");
    const userInfoHeader = await saveUserInfo(response.data);

    return json(
      { user: response.data, error: null },
      {
        headers: {
          "Set-Cookie": [cookieHeader, userInfoHeader].join(", "),
        },
      }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return json({ error: "이메일 또는 비밀번호가 올바르지 않습니다." });
  }
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const submit = useSubmit();
  const actionData = useActionData<ActionData>();
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    submit(form, { replace: true });
  };

  useEffect(() => {
    if (actionData?.error) {
      setIsLoading(false);
    }

    if (actionData?.user) {
      setUser(actionData.user as User);
      navigate("/");
    }
  }, [actionData, setUser, navigate]);

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-200 rounded-2xl shadow-lg p-8 space-y-8 border border-gray-300">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <LogoIcon className="w-12 h-12 text-gray-900" />
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">
                <span className="text-red-500">RS</span>
                <span className="text-gray-900">IN</span>
              </h1>
              <p className="text-gray-600 text-sm font-medium">HR Management System</p>
            </div>
          </div>

          <Form method="post" onSubmit={handleSubmit} className="space-y-6" navigate>
            {actionData?.error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
                {actionData.error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="이메일을 입력하세요"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 bg-white rounded-xl border border-gray-300
                           focus:border-red-500/30 focus:ring-2 focus:ring-red-500/10 transition-all
                           text-gray-900 placeholder:text-gray-500"
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="비밀번호를 입력하세요"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 bg-white rounded-xl border border-gray-300
                           focus:border-red-500/30 focus:ring-2 focus:ring-red-500/10 transition-all
                           text-gray-900 placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
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
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    {/* ... loading svg ... */}
                  </svg>
                  로그인 중...
                </div>
              ) : (
                "로그인"
              )}
            </Button>
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => navigate("/auth/forgot-password")}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm"
              >
                비밀번호 찾기
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
