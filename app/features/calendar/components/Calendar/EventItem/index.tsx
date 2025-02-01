import type { CalendarEvent, LeaveType, LeaveStatus } from "../../../types/event";

interface EventItemProps {
  event: CalendarEvent;
  variant?: "calendar" | "list";
  isOtherMonth?: boolean;
}

// 상태별 색상 매핑
const STATUS_STYLES = {
  used: {
    background: "bg-blue-400",
    text: "text-blue-500",
  },
  scheduled: {
    background: "bg-teal-400",
    text: "text-teal-500",
  },
  pending: {
    background: "bg-red-400",
    text: "text-red-500",
  },
  holiday: {
    background: "bg-purple-400",
    text: "text-purple-500",
  },
} as const;

// 휴가 유형별 라벨
const LEAVE_TYPE_LABELS = {
  annual: "연차",
  annual_am: "오전",
  annual_pm: "오후",
} as const;

// 기본 스타일 (fallback)
const DEFAULT_STYLE = {
  background: "bg-blue-500",
  text: "text-blue-500",
};

export function EventItem({ event, variant = "calendar", isOtherMonth = false }: EventItemProps) {
  const style = STATUS_STYLES[event.status] || DEFAULT_STYLE;
  const leaveTypeLabel = LEAVE_TYPE_LABELS[event.leaveType as LeaveType] || "연차";
  const opacityClass = isOtherMonth ? "opacity-40" : "opacity-100";

  if (event.isHoliday || event.isBirthday) {
    return (
      <div
        className={`
          px-1 py-0.5 text-xs flex items-center gap-1
          ${opacityClass} 
          ${event.isHoliday ? "text-red-500" : "text-gray-700"}
        `}
      >
        {event.isBirthday && <span className="shrink-0 text-amber-500">★</span>}
        <span className="truncate">{event.title}</span>
      </div>
    );
  }

  if (variant === "calendar") {
    return (
      <div className={`px-1 py-0.5 text-xs flex items-center ${opacityClass}`}>
        <div className={`${style.background} w-1.5 h-1.5 rounded-full shrink-0 mr-1`} />
        <span className="truncate">
          {event.title} {leaveTypeLabel && `(${leaveTypeLabel})`}
        </span>
      </div>
    );
  }

  // 리스트 뷰용 이벤트 아이템
  return (
    <div className={`px-2 py-1 first:pt-1.5 last:pb-1.5 ${opacityClass}`}>
      <div className="flex items-center gap-2 text-xs">
        <div className="flex items-center gap-1.5">
          <div className={`${style.background} w-1.5 h-1.5 rounded-full`} />
          <span className="text-gray-600">{leaveTypeLabel}</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="">{event.title}</span>
        </div>

        {event.description && (
          <>
            <span className="text-gray-400 text-xs">•</span>
            <div className="text-gray-600 truncate">{event.description}</div>
          </>
        )}
      </div>
    </div>
  );
}
