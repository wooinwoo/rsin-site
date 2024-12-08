import { CalendarCell } from "./CalendarCell";
import type { CalendarDate } from "../../types/calendar";
import type { CalendarEvent } from "../../types/event";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

interface CalendarGridProps {
  days: CalendarDate[];
  events?: CalendarEvent[];
}

export function CalendarGrid({ days, events = [] }: CalendarGridProps) {
  return (
    <div className="border-t border-l border-gray-200">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7">
        {WEEKDAYS.map((day) => (
          <div key={day} className="py-2 border-b border-r border-gray-200 text-center font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7">
        {days.map((day) => (
          <CalendarCell key={day.date.toISOString()} day={day} events={events} />
        ))}
      </div>
    </div>
  );
}
