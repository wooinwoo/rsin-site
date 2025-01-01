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
          overflow-hidden
          min-h-[70px] lg:min-h-[100px] py-2 border border-gray-400 rounded-md cursor-pointer
          ${day.isCurrentMonth ? (isWeekend ? "bg-[#F6F6F6]" : "bg-white") : "bg-white"}
          ${day.isToday ? "border-blue-500" : ""}
        `}
      >
        <span
          className={`
            inline-flex w-6 h-6 items-center justify-center text-xs mx-1 sm:mx-2
            ${day.isToday ? "bg-[#282828] text-white rounded-md" : ""}
            ${!day.isCurrentMonth ? "text-gray-400" : ""}
          `}
        >
          {day.formattedDate}
        </span>
        <div className="hidden lg:flex mt-1 gap-1.5 xl:px-1 flex-wrap">
          {dayEvents.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </div>
        {dayEvents.length > 0 && (
          <div className="flex lg:hidden justify-center">
            <button className="w-6 h-6 rounded-full bg-gray-600 text-white text-sm flex items-center justify-center">
              {dayEvents.length}
            </button>
          </div>
        )}
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
              총 <span className="font-medium text-gray-900">{dayEvents.length}</span>건의 휴가
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
