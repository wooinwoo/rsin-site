import { useCalendar } from "../../hooks/useCalendar";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import type { CalendarEvent } from "../../types/event";

interface CalendarProps {
  events?: CalendarEvent[];
}

export function Calendar({ events = [] }: CalendarProps) {
  const { currentDate, calendarDays, goToNextMonth, goToPrevMonth } = useCalendar();

  return (
    <div className="p-4">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={goToPrevMonth}
        onNextMonth={goToNextMonth}
      />
      <CalendarGrid days={calendarDays} events={events} />
    </div>
  );
}
