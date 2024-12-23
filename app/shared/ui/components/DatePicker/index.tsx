import ReactDatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { ClientOnly } from "../ClientOnly";

interface DatePickerProps {
  isRange?: boolean;
  onChange?: (dates: [Date | null, Date | null] | Date | null) => void;
  className?: string;
  required?: boolean;
  name?: string;
  value?: Date | null;
}

export function DatePicker({
  isRange = true,
  onChange,
  className = "",
  required,
  name,
  value,
}: DatePickerProps) {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  const baseClassName =
    "z-10 px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm";

  if (!isRange) {
    return (
      <ClientOnly>
        <ReactDatePicker
          selected={value || startDate} // value prop 사용
          onChange={(date: Date | null) => {
            setDateRange([date, null]);
            onChange?.(date);
          }}
          required={required}
          name={name}
          isClearable
          locale={ko}
          dateFormat="yyyy.MM.dd"
          placeholderText="날짜 선택"
          className={`${baseClassName} ${className}`.trim()}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReactDatePicker
        selectsRange={true}
        selected={startDate}
        startDate={startDate || undefined}
        endDate={endDate || undefined}
        onChange={(update: [Date | null, Date | null]) => {
          setDateRange(update);
          onChange?.(update);
        }}
        required={required}
        name={name}
        isClearable
        locale={ko}
        dateFormat="yyyy.MM.dd"
        placeholderText="시작일 - 종료일"
        className={`${baseClassName} text-sm ${className}`.trim()}
      />
    </ClientOnly>
  );
}
