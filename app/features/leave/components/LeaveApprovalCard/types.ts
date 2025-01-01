import type { LeaveRequest } from "~/routes/leaves.approval.pending";

export interface LeaveApprovalCardProps<T = LeaveRequest> {
  key?: number;
  item: T;
  onClick?: (row: T) => void;
  onSelect?: (selected: boolean) => void;
  selected?: boolean;
}
