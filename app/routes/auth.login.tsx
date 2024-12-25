import { useState } from "react";
import { Form, useNavigate } from "@remix-run/react";
import { LogoIcon, EyeIcon, EyeOffIcon } from "~/shared/ui/icons";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-12">
        {/* Logo Section */}
        <div className="flex items-center gap-3 justify-center ">
          <LogoIcon className="w-12 h-12" />
          <div className="flex flex-col mr-11">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">RS-TEAM</h2>
            <p className="text-sm text-gray-600">RSIN - RS Internal Portal</p>
          </div>
        </div>

        {/* Login Form - 배경 및 그림자 제거 */}
        <Form method="post" className="space-y-8 px-4">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <img
                  src="/public/images/profile.jpg"
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
                  src="/public/images/profile.jpg"
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
            <button
              type="submit"
              className="w-full py-2.5 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 rounded-md transition-colors"
            >
              로그인
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
