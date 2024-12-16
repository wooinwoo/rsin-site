import { useCalendar } from "../../hooks/useCalendar";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import type { CalendarEvent } from "../../types/event";
import type { CalendarFilters } from "../../types/filters";

interface CalendarProps {
  events?: CalendarEvent[];
  filters: CalendarFilters;
}

export function Calendar({ events = [], filters }: CalendarProps) {
  const { currentDate, calendarDays, goToNextMonth, goToPrevMonth } = useCalendar();

  const filteredEvents = events.filter((event) => {
    if (event.status === "used" && !filters.showUsed) return false;
    if (event.status === "scheduled" && !filters.showScheduled) return false;
    if (event.status === "pendingApproval" && !filters.showPending) return false;
    return true;
  });

  return (
    <div className="sm:p-4">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={goToPrevMonth}
        onNextMonth={goToNextMonth}
      />
      <CalendarGrid days={calendarDays} events={filteredEvents} />
    </div>
  );
}
