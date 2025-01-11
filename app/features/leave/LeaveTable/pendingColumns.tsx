import type { ColumnDef } from "~/features/datatable/types/datatable";
import { ProfileCell } from "~/features/datatable/components/cells/ProfileCell";
import type { SearchField } from "~/features/datatable/types/datatable";
import type { LeaveDocument } from "~/entities/leave/model";
import { LEAVE_TYPE_OPTIONS } from "~/shared/constants/options";
import { useAuthStore } from "~/shared/store/auth";
const baseSearchFields: SearchField[] = [
  {
    id: "applicant",
    type: "text",
    label: "신청자",
    placeholder: "이름을 입력하세요",
    width: "200px",
  },
];

const adminSearchField: SearchField = {
  id: "scope",
  type: "select", // 명시적으로 "select" 타입 지정
  label: "결재 구분",
  options: [
    { value: "self", label: "내 승인대기" },
    { value: "all", label: "결재선 전체" },
  ],
  width: "150px",
  defaultValue: useAuthStore.getState().user?.role === "admin" ? "self" : "all",
  showAllOption: false,
} as const; // 타입 추론을 위한 const assertion

export const searchFields: SearchField[] = [
  ...baseSearchFields,
  ...(useAuthStore.getState().user?.role === "admin" ? [adminSearchField] : []),
];

export const pendingColumns: ColumnDef<LeaveDocument>[] = [
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
    id: "approver",
    header: "결재자",
    accessorKey: "approvals",
    cell: ({ row }) => {
      const currentApprover = row.approvals?.find((a) => a.status === "pending");
      return currentApprover?.name || "-";
    },
  },
  {
    id: "requestDate",
    header: "신청일",
    accessorKey: "submittedAt",
  },
];
