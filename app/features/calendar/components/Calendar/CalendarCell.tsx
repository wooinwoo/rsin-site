import { useState } from "react";
import { isSameDay } from "date-fns";
import type { CalendarDate } from "../../types/calendar";
import type { CalendarEvent } from "../../types/event";
import { EventItem } from "./EventItem";
import { Modal } from "~/shared/ui/components/Modal";

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

  return (
    <>
      <div
        onClick={handleCellClick}
        className={`
          min-h-[70px] sm:min-h-[100px] py-2 border border-gray-400 rounded-md cursor-pointer
          ${day.isCurrentMonth ? (isWeekend ? "bg-[#F6F6F6]" : "bg-white") : "bg-white"}
          ${day.isToday ? "border-blue-500" : ""}
        `}
      >
        <span
          className={`
            inline-flex w-6 h-6 items-center justify-center text-xs mx-2
            ${day.isToday ? "bg-[#282828] text-white rounded-md" : ""}
            ${!day.isCurrentMonth ? "text-gray-400" : ""}
          `}
        >
          {day.formattedDate}
        </span>
        <div className="hidden sm:flex mt-1 gap-1.5 px-1 flex-wrap">
          {dayEvents.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </div>
        {dayEvents.length > 0 && (
          <div className="flex sm:hidden justify-center">
            <button className="w-6 h-6 rounded-full bg-gray-600 text-white">
              {dayEvents.length}
            </button>
          </div>
        )}
      </div>

      {/* 모바일용 이벤트 목록 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${day.formattedDate}일 휴가 내역`}
      >
        <div className="space-y-2">
          {dayEvents.map((event) => (
            <div key={event.id} className="p-1">
              <EventItem event={event} />
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
