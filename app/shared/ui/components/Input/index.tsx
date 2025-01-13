import { InputProps } from "./types";
import { useEffect } from "react";

export function Input({
  value,
  onChange,
  placeholder,
  className = "",
  disabled,
  type = "text",
  error,
  ...props
}: InputProps) {
  const validateInput = (value: string): string => {
    if (!value) return "";

    switch (type) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return "올바른 이메일 주소를 입력해주세요.";
        }
        break;

      case "password":
        if (value.length < 8 || value.length > 16) {
          return "비밀번호는 8자 이상 16자 이하여야 합니다.";
        }
        if (!/[A-Za-z]/.test(value)) {
          return "비밀번호에 영문자를 포함해주세요.";
        }
        if (!/\d/.test(value)) {
          return "비밀번호에 숫자를 포함해주세요.";
        }
        if (!/[@$!%*#?&]/.test(value)) {
          return "비밀번호에 특수문자(@$!%*#?&)를 포함해주세요.";
        }
        break;

      case "number":
        if (!/^\d*$/.test(value)) {
          return "숫자만 입력 가능합니다.";
        }
        const numValue = Number(value);
        if (props.min && numValue < Number(props.min)) {
          return `${props.min}보다 큰 값을 입력해주세요.`;
        }
        if (props.max && numValue > Number(props.max)) {
          return `${props.max}보다 작은 값을 입력해주세요.`;
        }
        break;

      case "tel":
        const telRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
        if (!telRegex.test(value)) {
          return "올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)";
        }
        break;
    }
    return "";
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 7) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    }
    return cleaned;
  };

  useEffect(() => {
    if (type === "tel" && value && typeof value === "string") {
      const formattedValue = formatPhoneNumber(value);
      if (formattedValue !== value) {
        const e = {
          target: { value: formattedValue },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(e);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // number 타입일 경우 숫자만 입력 가능하도록
    if (type === "number" && !/^\d*$/.test(newValue)) {
      return;
    }

    // tel 타입일 경우 자동으로 하이픈 추가
    if (type === "tel") {
      newValue = formatPhoneNumber(newValue);
      e.target.value = newValue;
    }

    onChange(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const validationError = validateInput(e.target.value);
    if (validationError) {
      e.target.setCustomValidity(validationError);
    } else {
      e.target.setCustomValidity("");
    }
  };

  return (
    <div className="w-full">
      <input
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder={placeholder}
        className={`
          w-full h-11 rounded-md border px-3 text-sm bg-white
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          }
          disabled:bg-gray-100
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
