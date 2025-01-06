import type { ColumnDef } from "~/features/datatable/types/datatable";
import { ProfileCell } from "~/features/datatable/components/cells/ProfileCell";
import type { SearchField } from "~/features/datatable/types/datatable";
import type { LeaveDocument } from "~/entities/leave/model";

export const searchFields: SearchField[] = [
  {
    id: "applicant",
    type: "text",
    label: "신청자",
    placeholder: "이름을 입력하세요",
    width: "200px",
  },
  {
    id: "scope",
    type: "select",
    label: "결재 구분",
    options: [
      { value: "self", label: "내 승인대기" },
      { value: "all", label: "결재선 전체" },
    ],
    width: "150px",
    defaultValue: "self",
    showAllOption: false,
  },
];

export const documentColumns: ColumnDef<LeaveDocument>[] = [
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
    id: "approver",
    header: "결재자",
    accessorKey: "approvals",
    cell: ({ row }) => {
      const currentApprover = row.approvals.find((a) => a.status === "pending");
      return currentApprover?.name || "-";
    },
  },
  {
    id: "requestDate",
    header: "신청일",
    accessorKey: "submittedAt",
  },
];
