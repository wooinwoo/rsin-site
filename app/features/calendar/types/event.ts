// 휴가 유형
export type LeaveType = "full" | "morning" | "afternoon"; // 연차, 오전반차, 오후반차

// 휴가 상태
export type LeaveStatus = "used" | "scheduled" | "pendingApproval";

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  leaveType: LeaveType; // 휴가 유형
  status: LeaveStatus; // 휴가 상태
  description?: string; // 휴가 사유 (선택사항)
  requestDate?: Date; // 신청일
  approver?: string; // 승인자
  approvedDate?: Date; // 승인일
}
