import type { CalendarDate } from "../../types/calendar";
import type { CalendarEvent } from "../../types/event";
import { EventItem } from "../EventItem";
import { isSameDay } from "date-fns";

interface CalendarCellProps {
  day: CalendarDate;
  events?: CalendarEvent[];
  isWeekend: boolean;
}

export function CalendarCell({ day, events = [], isWeekend }: CalendarCellProps) {
  const dayEvents = events.filter((event) => isSameDay(event.date, day.date));

  return (
    <div
      className={`
        min-h-[100px] p-2 border border-gray-400 rounded-md
        ${day.isCurrentMonth ? (isWeekend ? "bg-[#F6F6F6]" : "bg-white") : "bg-white"}
        ${day.isToday ? "border-blue-500" : ""}
      `}
    >
      <span
        className={`
          inline-flex w-6 h-6 items-center justify-center text-xs 
          ${day.isToday ? "bg-[#282828] text-white rounded-md" : ""}
          ${!day.isCurrentMonth ? "text-gray-400" : ""}
        `}
      >
        {day.formattedDate}
      </span>
      <div className="mt-1 grid gap-1.5 px-1">
        {dayEvents.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
