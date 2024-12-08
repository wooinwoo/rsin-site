import type { CalendarEvent } from "../../types/event";

interface EventItemProps {
  event: CalendarEvent;
}

export function EventItem({ event }: EventItemProps) {
  return (
    <div
      className={`
        px-2 py-1 rounded text-sm mb-1 truncate
        ${
          event.color
            ? `bg-${event.color}-100 text-${event.color}-800`
            : "bg-blue-100 text-blue-800"
        }
      `}
    >
      {event.title}
    </div>
  );
}
