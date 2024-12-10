import type { CalendarEvent, LeaveType, LeaveStatus } from "../../../types/event";

interface EventItemProps {
  event: CalendarEvent;
}

// 상태별 색상 매핑
const STATUS_STYLES = {
  used: {
    background: "bg-blue-300",
    text: "text-blue-500",
  },
  scheduled: {
    background: "bg-teal-300",
    text: "text-teal-500",
  },
  pendingApproval: {
    background: "bg-red-300",
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
  background: "bg-blue-300",
  text: "text-blue-500",
};

export function EventItem({ event }: EventItemProps) {
  // 상태에 따른 스타일 가져오기
  const style = STATUS_STYLES[event.status] || DEFAULT_STYLE;

  // 휴가 유형 라벨 가져오기
  const leaveTypeLabel = LEAVE_TYPE_LABELS[event.leaveType];

  return (
    <>
      <div
        className={`
        px-2 py-1 text-sm flex-1 lg:whitespace-nowrap rounded
        ${style.background} ${style.text}
      `}
      >
        <span className="font-medium whitespace-nowrap">{event.title}</span>
        <span className="lg:ml-1 whitespace-nowrap">({leaveTypeLabel})</span>
      </div>
    </>
  );
}
