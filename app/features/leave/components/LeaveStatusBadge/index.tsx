import { Badge } from "~/shared/ui/components/Badge";

type LeaveStatus = "pending" | "scheduled" | "used";

interface LeaveStatusBadgeProps {
  status: LeaveStatus;
}

export function LeaveStatusBadge({ status }: LeaveStatusBadgeProps) {
  if (status === "pending") {
    return <Badge className="bg-red-300 text-red-700">승인대기</Badge>;
  }

  if (status === "scheduled") {
    return <Badge className="bg-teal-300 text-teal-700">사용예정</Badge>;
  }

  return <Badge className="bg-blue-300 text-blue-700">사용</Badge>;
}
