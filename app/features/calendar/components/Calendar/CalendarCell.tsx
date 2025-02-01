import { useState } from "react";
import { isSameDay } from "date-fns";
import type { CalendarDate } from "../../types/calendar";
import type { CalendarEvent } from "../../types/event";
import { EventItem } from "./EventItem";
import { Modal } from "~/shared/ui/components/Modal";
import { Button } from "~/shared/ui/components/Button";
interface CalendarCellProps {
  day: CalendarDate;
  events?: CalendarEvent[];
  isWeekend: boolean;
}

export function CalendarCell({ day, events = [], isWeekend }: CalendarCellProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dayEvents = events.filter((event) => isSameDay(event.date, day.date));

  const handleCellClick = () => {
    if (dayEvents.length > 0) {
      setIsModalOpen(true);
    }
  };
  const month = day.date.getMonth() + 1;

  return (
    <>
      <div
        onClick={handleCellClick}
        className={`
          min-h-[70px] lg:min-h-[100px] 
          border border-gray-200 
          rounded-md cursor-pointer
          overflow-hidden
          ${day.isCurrentMonth ? (isWeekend ? "bg-gray-50" : "bg-white") : "bg-white"}
          ${day.isToday ? "border-blue-500" : ""}
        `}
      >
        {/* 날짜 표시 - 패딩 축소 */}
        <div className="px-2 py-1">
          <span
            className={`
              inline-flex w-6 h-6 items-center justify-center text-xs
              ${day.isToday ? "bg-blue-500 text-white rounded-full" : ""}
              ${!day.isCurrentMonth ? "text-gray-400" : ""}
            `}
          >
            <span className="pt-1">{day.formattedDate}</span>
          </span>
        </div>

        {/* 이벤트 목록 - 패딩 축소 */}
        <div className="px-1.5">
          <div className="hidden lg:flex flex-col gap-0.5">
            {dayEvents.map((event) => (
              <EventItem key={event.id} event={event} isOtherMonth={!day.isCurrentMonth} />
            ))}
          </div>

          {/* 모바일용 이벤트 카운트 */}
          {dayEvents.length > 0 && (
            <div className="flex lg:hidden justify-center">
              <div className="w-4 h-4 rounded-full bg-gray-600 text-white text-xs flex items-center justify-center">
                <span className="pt-0.5">{dayEvents.length}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 모바일용 이벤트 목록 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${month}월 ${day.formattedDate}일 일정 내역`}
        size="small"
      >
        <div className="px-1">
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">
              총 <span className="font-medium text-gray-900">{dayEvents.length}</span>건의 일정
            </div>
          </div>

          <div className="space-y-2">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className="p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <EventItem event={event} variant="list" />
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
