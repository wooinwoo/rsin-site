import { useCalendar } from "../../hooks/useCalendar";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import type { CalendarEvent } from "../../types/event";
import type { CalendarFilters } from "../../types/filters";
import { ViewMode } from "../../types/calendar";
import { useState } from "react";
import { ListView } from "./ListView";

interface CalendarProps {
  events?: CalendarEvent[];
  filters: CalendarFilters;
}

export function Calendar({ events = [], filters }: CalendarProps) {
  const { currentDate, calendarDays, goToNextMonth, goToPrevMonth, goToToday } = useCalendar();
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const filteredEvents = events.filter((event) => {
    if (event.status === "used" && !filters.showUsed) return false;
    if (event.status === "scheduled" && !filters.showScheduled) return false;
    if (event.status === "pending" && !filters.showPending) return false;
    return true;
  });

  return (
    <div className="sm:p-4">
      <CalendarHeader
        currentDate={currentDate}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onPrevMonth={goToPrevMonth}
        onNextMonth={goToNextMonth}
        onTodayClick={goToToday}
      />
      {viewMode === "calendar" ? (
        <CalendarGrid days={calendarDays} events={filteredEvents} />
      ) : (
        <ListView events={filteredEvents} currentDate={currentDate} />
      )}
    </div>
  );
}
