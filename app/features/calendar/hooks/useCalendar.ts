import { useState, useCallback } from "react";
import { getCalendarDays, getNextMonth, getPrevMonth } from "../utils/dateUtils";
import type { CalendarDate } from "../types/calendar";

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<CalendarDate[]>(() =>
    getCalendarDays(currentDate)
  );

  const goToNextMonth = useCallback(() => {
    setCurrentDate((prev) => {
      const nextMonth = getNextMonth(prev);
      setCalendarDays(getCalendarDays(nextMonth));
      return nextMonth;
    });
  }, []);

  const goToPrevMonth = useCallback(() => {
    setCurrentDate((prev) => {
      const prevMonth = getPrevMonth(prev);
      setCalendarDays(getCalendarDays(prevMonth));
      return prevMonth;
    });
  }, []);

  return {
    currentDate,
    calendarDays,
    goToNextMonth,
    goToPrevMonth,
  };
}
