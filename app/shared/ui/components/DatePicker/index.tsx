import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { forwardRef, useRef } from "react";

interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ value, onChange, className, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
      inputRef.current?.showPicker();
    };

    return (
      <div className="relative cursor-pointer" onClick={handleClick}>
        <input
          {...props}
          ref={inputRef}
          type="date"
          value={value ? format(value, "yyyy-MM-dd") : ""}
          onChange={(e) => {
            const date = e.target.value ? parseISO(e.target.value) : null;
            onChange(date);
          }}
          className={`w-full px-3 py-2  h-11 rounded ${className} opacity-0 absolute inset-0`}
        />
        <div className="px-3 py-2 border h-11 border-gray-300 rounded text-sm flex items-center justify-between">
          {value ? format(value, "yyyy년 MM월 dd일", { locale: ko }) : "날짜 선택"}
        </div>
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";
