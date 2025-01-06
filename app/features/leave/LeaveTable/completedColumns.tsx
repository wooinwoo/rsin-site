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
    accessorKey: "approvals.status",
    cell: ({ row }) => (
      <ApprovalStatusBadge status={row.approvals[row.approvals.length - 1].status} />
    ),
  },
  {
    id: "approver",
    header: "결재자",
    accessorKey: "approvals",
    cell: ({ row }) => {
      const lastApprover = row.approvals[row.approvals.length - 1];
      return lastApprover?.name || "-";
    },
  },
  {
    id: "requestDate",
    header: "신청일",
    accessorKey: "submittedAt",
  },
  {
    id: "approvalDate",
    header: "결재일",
    accessorKey: "approvals",
    cell: ({ row }) => {
      const lastApproval = row.approvals[row.approvals.length - 1];
      // return lastApproval?.updatedAt || "-";
      return "-";
    },
  },
];
