export interface LeaveApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove?: () => void;
  onReject?: () => void;
}

export interface ApprovalStep {
  step: number;
  approver: {
    name: string;
    position: string;
  };
  status: "waiting" | "approved" | "rejected" | "pending";
}

export interface LeaveApprovalData {
  applicant: {
    name: string;
    department: string;
    profileImage?: string;
  };
  appliedAt: string;
  approvalSteps: ApprovalStep[];
  leaveType: string;
  period: {
    startDate: string;
    endDate: string;
  };
  duration: number;
  reason: string;
}
