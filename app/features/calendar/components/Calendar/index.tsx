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
    if (event.isHoliday && !filters.showHoliday) return false;
    if (event.isBirthday && !filters.showBirthday) return false;
    if (!event.isHoliday && !event.isBirthday && !filters.showLeave) return false;
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
      <div>
        {viewMode === "calendar" ? (
          <CalendarGrid days={calendarDays} events={filteredEvents} />
        ) : (
          <ListView events={filteredEvents} currentDate={currentDate} />
        )}
      </div>
    </div>
  );
}
