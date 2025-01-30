import type { LeaveDocument } from "~/entities/leave/model";

export interface LeaveApprovalCardProps {
  key?: number;
  item: LeaveDocument;
  onClick?: (row: LeaveDocument) => void;
  onSelect?: (selected: boolean) => void;
  selected?: boolean;
}
