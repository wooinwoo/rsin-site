import type { ColumnDef } from "~/features/datatable/types/datatable";
import { ProfileCell } from "~/features/datatable/components/cells/ProfileCell";
import type { SearchField } from "~/features/datatable/types/datatable";
import type { LeaveDocument } from "~/entities/leave/model";
import { ApprovalStatusBadge } from "~/features/approval/components/ApprovalStatusBadge";
import { LEAVE_TYPE_OPTIONS } from "~/shared/constants/options";

export const searchFields: SearchField[] = [
  {
    id: "applicant",
    type: "text",
    label: "신청자",
    placeholder: "이름을 입력하세요",
    width: "200px",
  },
  {
    id: "type",
    type: "select",
    label: "휴가 종류",
    options: LEAVE_TYPE_OPTIONS,
    width: "150px",
  },
  {
    id: "processDate",
    type: "daterange",
    label: "처리일자",
    width: "300px",
  },
];

export const completedColumns: ColumnDef<LeaveDocument>[] = [
  {
    id: "employeeName",
    header: "신청자",
    accessorKey: "requester.name",
    cell: ({ row }) => (
      <ProfileCell profileUrl={row.requester.thumbnailPath} employeeName={row.requester.name} />
    ),
  },
  {
    id: "leaveType",
    header: "휴가 종류",
    accessorKey: "leave.type",
    cell: ({ row }) => (
      <span>{LEAVE_TYPE_OPTIONS.find((option) => option.value === row.leave.type)?.label}</span>
    ),
  },
  {
    id: "period",
    header: "날짜",
    accessorKey: "leave.startedAt",
    cell: ({ row }) => (
      <span>
        {row.leave.startedAt} ~ {row.leave.endedAt}
      </span>
    ),
  },
  {
    id: "status",
    header: "상태",
    accessorKey: "status",
    cell: ({ row }) => {
      return <ApprovalStatusBadge status={row.status || "pending"} />;
    },
  },
  {
    id: "approver",
    header: "결재자",
    accessorKey: "approvals",
    cell: ({ row }) => {
      const approvals = row.approvals || [];
      if (!approvals.length) return "-";
      const lastApprover = approvals[approvals.length - 1];
      return lastApprover?.name || "-";
    },
  },
  {
    id: "requestDate",
    header: "신청일",
    accessorKey: "submittedAt",
    cell: ({ row }) => row.submittedAt || "-",
  },
  {
    id: "approvalDate",
    header: "결재일",
    accessorKey: "approvals",
    cell: ({ row }) => {
      const approvals = row.approvals || [];
      if (!approvals.length) return "-";
      const lastApproval = approvals[approvals.length - 1];
      return lastApproval?.processedAt || "-";
    },
  },
];
