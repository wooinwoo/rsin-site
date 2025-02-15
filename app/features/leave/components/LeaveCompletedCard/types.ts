import type { LeaveDocument } from "~/entities/leave/model";

export interface LeaveCompletedCardProps {
  item: LeaveDocument;
  onClick?: (row: LeaveDocument) => void;
}
