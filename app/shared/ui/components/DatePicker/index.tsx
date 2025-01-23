import ReactDatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { ClientOnly } from "../ClientOnly";
import { useEffect } from "react";
import { useToastStore } from "~/shared/store/toast";
interface DatePickerProps {
  isRange?: boolean;
  onChange?: (dates: [Date | null, Date | null] | Date | null) => void;
  className?: string;
  required?: boolean;
  name?: string;
  value?: Date | null | [Date | null, Date | null] | null;
  disabled?: boolean;
  minDate?: Date | null;
  filterDate?: (date: Date) => boolean;
  excludeWeekends?: boolean;
}

export function DatePicker({
  isRange = true,
  onChange,
  className = "",
  required,
  name,
  value,
  disabled,
  minDate,
  filterDate,
  excludeWeekends = false,
}: DatePickerProps) {
  const { showToast } = useToastStore();

  const getWorkDays = (start: Date, end: Date) => {
    let count = 0;
    const current = new Date(start);

    while (current <= end) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
    return count;
  };

  // 주말 제외 필터
  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  // filterDate 로직 수정
  const combinedFilterDate = (date: Date) => {
    if (!filterDate && !excludeWeekends) return true;
    if (excludeWeekends && !isWeekday(date)) return false;
    return filterDate ? filterDate(date) : true;
  };

  // 선택 가능한 날짜인지 확인하는 함수
  const isValidDateRange = (start: Date, end: Date) => {
    const workDays = getWorkDays(start, end);
    return workDays <= 4;
  };

  const baseClassName =
    "w-full min-w-[200px] z-10 px-3 py-2 w-full rounded-lg bg-white disabled:bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm";
  const wrapperClassName = "w-full h-9 inline-block bg-white";
  const calendarClassNames = ["custom-calendar", excludeWeekends ? "exclude-weekends" : ""]
    .filter(Boolean)
    .join(" ");
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
            selected={value as Date | null}
            onChange={(date: Date | null) => {
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
            minDate={minDate || undefined}
            filterDate={filterDate}
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
          startDate={Array.isArray(value) ? value[0] ?? undefined : undefined}
          endDate={Array.isArray(value) ? value[1] ?? undefined : undefined}
          onChange={(update: [Date | null, Date | null]) => {
            const [start, end] = update;

            // 시작일만 선택된 경우
            if (start && !end) {
              onChange?.(update);
              return;
            }

            // 시작일과 종료일이 모두 선택된 경우
            if (start && end) {
              if (isValidDateRange(start, end)) {
                onChange?.(update);
              } else {
                showToast("최대 4일까지 선택 가능합니다.", "error");
                onChange?.([start, null]);
              }
            } else {
              onChange?.(update);
            }
          }}
          filterDate={combinedFilterDate}
          shouldCloseOnSelect={false}
          required={required}
          name={name}
          onCalendarClose={() => {
            if (Array.isArray(value) && value[0] && !value[1]) {
              onChange?.([null, null]);
            }
          }}
          isClearable
          disabled={disabled}
          locale={ko}
          dateFormat="yyyy.MM.dd"
          placeholderText="시작일 - 종료일"
          className={`${baseClassName} text-sm pr-8 ${className}`.trim()}
          minDate={minDate || undefined}
          calendarClassName={calendarClassNames}
        />
      </ClientOnly>
    </div>
  );
}
