export interface LeaveRequestModalProps {
  /**
   * 모달의 열림/닫힘 상태
   */
  isOpen: boolean;

  /**
   * 모달이 닫힐 때 호출되는 함수
   */
  onClose: () => void;

  /**
   * 휴가 신청 완료 시 호출되는 함수
   */
  onSubmit?: (data: LeaveRequestData) => void | Promise<void>;
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
