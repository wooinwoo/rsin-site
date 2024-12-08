import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isToday,
  isSameMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
} from "date-fns";
import { ko } from "date-fns/locale";
import type { CalendarDate } from "../types/calendar";

export const getCalendarDays = (date: Date): CalendarDate[] => {
  // 해당 월의 시작과 끝
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);

  // 달력에 표시할 첫 주의 시작일과 마지막 주의 종료일
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  // 달력에 표시할 모든 날짜 생성
  return eachDayOfInterval({ start: calendarStart, end: calendarEnd }).map((day) => ({
    date: day,
    isToday: isToday(day),
    isCurrentMonth: isSameMonth(day, date),
    formattedDate: format(day, "d", { locale: ko }),
  }));
};

export const formatYearMonth = (date: Date): string => {
  return format(date, "yyyy년 M월", { locale: ko });
};

export const getNextMonth = (date: Date): Date => {
  return addMonths(date, 1);
};

export const getPrevMonth = (date: Date): Date => {
  return subMonths(date, 1);
};
