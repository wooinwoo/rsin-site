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
  disabled?: boolean;
}

export function DatePicker({
  isRange = true,
  onChange,
  className = "",
  required,
  name,
  value,
  disabled,
}: DatePickerProps) {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  useEffect(() => {
    if (isRange) {
      setDateRange(Array.isArray(value) ? value : [null, null]);
    } else {
      setDateRange([value as Date | null, null]);
    }
  }, [value]);

  const [startDate, endDate] = dateRange;
  const baseClassName =
    "w-full min-w-[200px] z-10 px-3 py-2 w-full rounded-lg bg-white disabled:bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm";

  const wrapperClassName = "w-full h-9 inline-block bg-white";

  if (!isRange) {
    return (
      <div className={wrapperClassName}>
        <ClientOnly
          fallback={
            <input
              className={`${baseClassName} ${className}`.trim()}
              placeholder="날짜 선택"
              disabled
            />
          }
        >
          <ReactDatePicker
            selected={startDate}
            onChange={(date: Date | null) => {
              setDateRange([date, null]);
              onChange?.(date);
            }}
            required={required}
            name={name}
            isClearable
            disabled={disabled}
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
      <ClientOnly
        fallback={
          <input
            className={`${baseClassName} text-sm pr-8 ${className}`.trim()}
            placeholder="시작일 - 종료일"
            disabled
          />
        }
      >
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
          onCalendarClose={() => {
            if (startDate && !endDate) {
              setDateRange([null, null]);
              onChange?.([null, null]);
            }
          }}
          isClearable
          disabled={disabled}
          locale={ko}
          dateFormat="yyyy.MM.dd"
          placeholderText="시작일 - 종료일"
          className={`${baseClassName} text-sm pr-8 ${className}`.trim()}
        />
      </ClientOnly>
    </div>
  );
}
