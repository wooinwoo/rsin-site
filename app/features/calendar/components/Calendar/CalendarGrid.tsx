import { CalendarCell } from "./CalendarCell";
import type { CalendarDate } from "../../types/calendar";
import type { CalendarEvent } from "../../types/event";

const WEEKDAYS = [
  { day: "Sunday", isWeekend: true },
  { day: "Monday", isWeekend: false },
  { day: "Tuesday", isWeekend: false },
  { day: "Wednesday", isWeekend: false },
  { day: "Thursday", isWeekend: false },
  { day: "Friday", isWeekend: false },
  { day: "Saturday", isWeekend: true },
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
              ${
                day === "Sunday"
                  ? "text-red-500"
                  : day === "Saturday"
                  ? "text-gray-700"
                  : "text-gray-400"
              }
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
