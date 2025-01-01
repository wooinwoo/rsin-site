import { format, isSameMonth, getDaysInMonth, startOfMonth } from "date-fns";
import { ko } from "date-fns/locale";
import type { CalendarEvent } from "../../../types/event";
import { EventItem } from "../EventItem";

interface ListViewProps {
  events: CalendarEvent[];
  currentDate: Date;
}

export function ListView({ events, currentDate }: ListViewProps) {
  const currentMonthEvents = events.filter((event) => isSameMonth(event.date, currentDate));
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = startOfMonth(currentDate);

  const LEAVE_TYPE_LABELS = {
    full: "연차",
    morning: "오전",
    afternoon: "오후",
  } as const;

  const eventsByDate = currentMonthEvents.reduce((acc, event) => {
    const dateKey = format(event.date, "yyyy-MM-dd");
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden text-sm">
      {Array.from({ length: daysInMonth }, (_, i) => {
        const currentDay = new Date(firstDay);
        currentDay.setDate(i + 1);
        const dateKey = format(currentDay, "yyyy-MM-dd");
        const dayEvents = eventsByDate[dateKey] || [];
        const isWeekend = currentDay.getDay() === 0 || currentDay.getDay() === 6;

        return (
          <div
            key={dateKey}
            className={`flex border-b border-gray-200 last:border-b-0 ${
              isWeekend ? "bg-gray-50" : "bg-white"
            }`}
          >
            <div className="w-24 shrink-0 py-2 px-3 border-r border-gray-200">
              <div className="flex items-center gap-2">
                <span className="font-medium">{format(currentDay, "d일", { locale: ko })}</span>
                <span className="text-xs text-gray-500">
                  {format(currentDay, "EEEE", { locale: ko })}
                </span>
              </div>
            </div>

            <div className="flex-1 flex items-center">
              {!isWeekend && dayEvents.length === 0 ? (
                <div className="py-1.5 px-3 text-gray-400 text-xs">일정이 없습니다</div>
              ) : isWeekend ? (
                <div className="py-1.5 px-3" />
              ) : (
                <div className="divide-y w-full divide-gray-100">
                  {dayEvents.map((event) => (
                    <EventItem key={event.employeeId} event={event} variant="list" />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
function getStatusColor(status: string) {
  switch (status) {
    case "used":
      return "bg-blue-500";
    case "pending":
      return "bg-yellow-500";
    case "scheduled":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
}
