import { useState, useCallback, useTransition } from "react";
import { useSearchParams } from "@remix-run/react";
import { getCalendarDays, getNextMonth, getPrevMonth } from "../utils/dateUtils";
import type { CalendarDate } from "../types/calendar";

export function useCalendar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const dateParam = searchParams.get("date");
  const initialDate = dateParam ? new Date(dateParam) : new Date();

  const [currentDate, setCurrentDate] = useState(initialDate);
  const [calendarDays, setCalendarDays] = useState<CalendarDate[]>(() =>
    getCalendarDays(currentDate)
  );

  const goToNextMonth = useCallback(() => {
    startTransition(() => {
      setCurrentDate((prev) => {
        const nextMonth = getNextMonth(prev);
        setCalendarDays(getCalendarDays(nextMonth));
        setSearchParams({ date: nextMonth.toISOString() });
        return nextMonth;
      });
    });
  }, [setSearchParams]);

  const goToPrevMonth = useCallback(() => {
    startTransition(() => {
      setCurrentDate((prev) => {
        const prevMonth = getPrevMonth(prev);
        setCalendarDays(getCalendarDays(prevMonth));
        setSearchParams({ date: prevMonth.toISOString() });
        return prevMonth;
      });
    });
  }, [setSearchParams]);

  const goToToday = useCallback(() => {
    startTransition(() => {
      const today = new Date();
      setCurrentDate(today);
      setCalendarDays(getCalendarDays(today));
      setSearchParams({ date: today.toISOString() });
    });
  }, [setSearchParams]);

  return {
    currentDate,
    calendarDays,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
    isPending,
  };
}
