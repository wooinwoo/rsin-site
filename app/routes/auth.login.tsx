import { useState, useEffect } from "react";
import { json, type ActionFunctionArgs } from "@remix-run/node";
import { useActionData, useNavigate, Form } from "@remix-run/react";
import { LogoIcon, EyeIcon, EyeOffIcon } from "~/shared/ui/icons";
import { Button } from "~/shared/ui/components/Button";
import { authApi } from "~/entities/auth/api";
import { useAuthStore } from "~/shared/store";
import type { SignInResponse } from "~/entities/auth/model";

interface ActionSuccessData {
  success: true;
  redirectTo: string;
  user: SignInResponse;
}
interface ActionErrorData {
  success: false;
  message: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await authApi.signIn({ email, password });
    return json<ActionSuccessData>({
      success: true,
      redirectTo: "/",
      user: {
        role: response.role,
        sub: response.sub,
        email: response.email,
        name: response.name,
        thumbnailPath: response.thumbnailPath,
        position: response.position,
        departmentId: response.departmentId,
      },
    });
  } catch (error) {
    return json<ActionErrorData>(
      {
        success: false,
        message: "이메일 또는 비밀번호가 올바르지 않습니다.",
      },
      { status: 400 }
    );
  }
}

export default function LoginPage() {
  const navigate = useNavigate();
  const actionData = useActionData<typeof action>();
  const setUser = useAuthStore((state) => state.setUser);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    if (actionData?.success) {
      setUser(actionData.user);
      navigate(actionData.redirectTo || "/");
    } else if (actionData?.message) {
      setError(actionData.message);
    }
  }, [actionData, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-12 bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center gap-3 justify-center">
          <LogoIcon className="w-12 h-12" />
          <div className="flex flex-col mr-11">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">RS-TEAM</h2>
            <p className="text-sm text-gray-600">RSIN - RS Internal Portal</p>
          </div>
        </div>

        <Form method="post" className="space-y-8 px-4">
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <img
                  src="/images/profile.jpg"
                  alt="RS-TEAM Logo"
                  className="w-4 h-4 rounded-full mr-1"
                />
                이메일 또는 휴대폰 번호
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-0 py-2 focus:outline-none border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 bg-transparent"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <img
                  src="/images/profile.jpg"
                  alt="RS-TEAM Logo"
                  className="w-4 h-4 rounded-full mr-1"
                />
                비밀번호
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-0 py-2 focus:outline-none border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              type="button"
              className="text-sm text-gray-800 hover:text-gray-900"
              onClick={() => navigate("/auth/forgot-password")}
            >
              비밀번호 찾기
            </button>
          </div>

          <div>
            <Button type="submit" className="w-full" size="lg" variant="dark">
              로그인
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
