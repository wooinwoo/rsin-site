import type { MyAnnual, Approver } from "~/entities/leave/model";

export interface LeaveModalResponse {
  annualStatus: MyAnnual[];
  approvers: Approver[];
}

export interface LeaveRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    annual: MyAnnual[] | undefined;
    approverLines: Approver[] | undefined;
  };
}
export interface LeaveRequestData {
  /**
   * 휴가 유형
   */
  type: "full" | "morning" | "afternoon";

  /**
   * 결재자 정보
   */
  approvers: {
    first: string; // 1차 결재자 ID
    second: string; // 2차 결재자 ID
  };

  /**
   * 사용 기간
   */
  period: {
    startDate: string; // YYYY-MM-DD
    endDate: string; // YYYY-MM-DD
  };

  /**
   * 휴가 사유
   */
  reason: {
    type: "personal" | "family" | "health" | "other";
    detail: string;
  };
}
