import { Badge } from "~/shared/ui/components/Badge";

type ApprovalStatus = "pending" | "approved" | "rejected";

interface ApprovalStatusBadgeProps {
  status: ApprovalStatus;
}

export function ApprovalStatusBadge({ status }: ApprovalStatusBadgeProps) {
  if (status === "pending") {
    return <Badge className="bg-teal-300 text-teal-700">대기중</Badge>;
  }

  if (status === "approved") {
    return <Badge className="bg-blue-300 text-blue-700">승인</Badge>;
  }

  return <Badge className="bg-red-300 text-red-700">반려</Badge>;
}
