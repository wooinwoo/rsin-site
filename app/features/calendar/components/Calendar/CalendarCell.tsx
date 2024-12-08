import type { CalendarDate } from "../../types/calendar";
import type { CalendarEvent } from "../../types/event";
import { EventItem } from "../EventItem";
import { isSameDay } from "date-fns";

interface CalendarCellProps {
  day: CalendarDate;
  events?: CalendarEvent[];
}

export function CalendarCell({ day, events = [] }: CalendarCellProps) {
  const dayEvents = events.filter((event) => isSameDay(event.date, day.date));

  return (
    <div
      className={`
        min-h-[100px] p-2 border border-gray-200
        ${day.isCurrentMonth ? "bg-white" : "bg-gray-50"}
        ${day.isToday ? "border-blue-500" : ""}
      `}
    >
      <span
        className={`
          inline-flex w-6 h-6 items-center justify-center rounded-full
          ${day.isToday ? "bg-blue-500 text-white" : ""}
          ${!day.isCurrentMonth ? "text-gray-400" : ""}
        `}
      >
        {day.formattedDate}
      </span>
      <div className="mt-1">
        {dayEvents.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
