import type { CalendarEvent, LeaveType, LeaveStatus } from "../../../types/event";

interface EventItemProps {
  event: CalendarEvent;
  variant?: "calendar" | "list";
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
} as const;

// 휴가 유형별 라벨
const LEAVE_TYPE_LABELS = {
  full: "연차",
  morning: "오전",
  afternoon: "오후",
} as const;

// 기본 스타일 (fallback)
const DEFAULT_STYLE = {
  background: "bg-blue-500",
  text: "text-blue-500",
};

export function EventItem({ event, variant = "calendar" }: EventItemProps) {
  const style = STATUS_STYLES[event.status] || DEFAULT_STYLE;
  const leaveTypeLabel = LEAVE_TYPE_LABELS[event.leaveType];

  if (variant === "calendar") {
    return (
      <div className="px-2 py-1 text-sm flex-1 flex items-center justify-start">
        <div className={`${style.background} w-2 h-2 rounded-full mr-1`}></div>
        <span className="whitespace-nowrap">
          {event.title} {leaveTypeLabel}
        </span>
      </div>
    );
  }

  return (
    <div className="px-3 py-1.5  first:pt-2 last:pb-2">
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-1.5">
          <div className={`${style.background} w-1.5 h-1.5 rounded-full`} />
          <span className="text-gray-600 mr-2">{leaveTypeLabel}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-medium">{event.title}</span>
          <span className="text-gray-500 text-xs">{event.department}</span>
        </div>

        <span className="text-gray-400 text-xs mx-1">•</span>

        <div className="text-gray-600 truncate">{event.description || "연차 휴가"}</div>
      </div>
    </div>
  );
}
