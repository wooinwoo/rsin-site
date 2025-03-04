// 휴가 유형
export type LeaveType = "annual" | "annual_am" | "annual_pm"; // 연차, 오전반차, 오후반차

// 휴가 상태
export type LeaveStatus = "pending" | "scheduled" | "used" | "holiday";

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  profileUrl?: string;
  employeeId?: string;
  employeeName?: string;
  departmentId?: string;
  leaveType?: LeaveType;
  status: LeaveStatus;
  description?: string;
  requestDate?: Date;
  approver?: string;
  approvedDate?: Date;
  isHoliday?: boolean;
  isBirthday?: boolean;
}
