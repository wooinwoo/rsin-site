import ReactDatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { ClientOnly } from "../ClientOnly";
import { useEffect } from "react";

interface DatePickerProps {
  isRange?: boolean;
  onChange?: (dates: [Date | null, Date | null] | Date | null) => void;
  className?: string;
  required?: boolean;
  name?: string;
  value?: Date | null | [Date | null, Date | null] | null;
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

  // value prop과 내부 상태 동기화
  useEffect(() => {
    if (isRange) {
      setDateRange(Array.isArray(value) ? value : [null, null]);
    } else {
      setDateRange([value as Date | null, null]);
    }
  }, [value, isRange]);

  const [startDate, endDate] = dateRange;
  const baseClassName =
    "z-10 px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm";

  const wrapperClassName = "min-w-[200px] h-9 inline-block"; // 높이 추가 (h-9)

  if (!isRange) {
    return (
      <div className={wrapperClassName}>
        <ClientOnly>
          <ReactDatePicker
            selected={startDate}
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
      </div>
    );
  }

  return (
    <div className={wrapperClassName}>
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
    </div>
  );
}
