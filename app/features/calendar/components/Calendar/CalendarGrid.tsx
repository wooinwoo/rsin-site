import { CalendarCell } from "./CalendarCell";
import type { CalendarDate } from "../../types/calendar";
import type { CalendarEvent } from "../../types/event";

const WEEKDAYS = [
  { day: "Sun", isWeekend: true },
  { day: "Mon", isWeekend: false },
  { day: "Tue", isWeekend: false },
  { day: "Wed", isWeekend: false },
  { day: "Thu", isWeekend: false },
  { day: "Fri", isWeekend: false },
  { day: "Sat", isWeekend: true },
];

interface CalendarGridProps {
  days: CalendarDate[];
  events?: CalendarEvent[];
}

export function CalendarGrid({ days, events = [] }: CalendarGridProps) {
  return (
    <div className="">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7">
        {WEEKDAYS.map(({ day, isWeekend }) => (
          <div
            key={day}
            className={`
              py-2 text-center font-normal text-sm
              ${day === "Sun" ? "text-red-500" : day === "Sat" ? "text-gray-700" : "text-gray-400"}
            `}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-x-1 gap-y-1.5">
        {days.map((day, index) => (
          <CalendarCell
            key={day.date.toISOString()}
            day={day}
            events={events}
            isWeekend={index % 7 === 0 || index % 7 === 6}
          />
        ))}
      </div>
    </div>
  );
}
