import type { ColumnDef } from "~/features/datatable/types/datatable";
import { ProfileCell } from "~/features/datatable/components/cells/ProfileCell";
import type { SearchField } from "~/features/datatable/types/datatable";
import type { LeaveDocument } from "~/entities/leave/model";
import { LEAVE_TYPE_OPTIONS } from "~/shared/constants/options";
import { useAuthStore } from "~/shared/store/auth";
import { POSITION_OPTIONS } from "~/shared/constants/options";

export const getSearchFields = (userRole?: string): SearchField[] => {
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
    type: "select",
    label: "결재 구분",
    options: [
      { value: "self", label: "내 승인대기" },
      { value: "all", label: "결재선 전체" },
    ],
    width: "150px",
    defaultValue: "self",
    showAllOption: false,
  };

  return userRole === "admin" ? [...baseSearchFields, adminSearchField] : baseSearchFields;
};

export const pendingColumns: ColumnDef<LeaveDocument>[] = [
  {
    id: "applicant",
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
    cell: ({ row }) => {
      const startDate = row.leave.startedAt;
      const endDate = row.leave.endedAt;

      return <span>{startDate === endDate ? startDate : `${startDate} ~ ${endDate}`}</span>;
    },
  },
  {
    id: "approver",
    header: "결재현황",
    accessorKey: "approvals",
    cell: ({ row }) => {
      const approvals = row.approvals;
      const requester = row.requester;
      const user = useAuthStore((state) => state.user);

      if (!approvals?.length) return "-";

      // 현재 결재 차례 찾기
      const currentApprovalIndex = approvals.findIndex((a) => a.status === "pending");
      const isMyRequest = requester.id === user?.sub;

      return (
        <div className="flex items-center gap-0.5">
          {/* 내가 보낸 요청이면 표시 */}
          {isMyRequest && <span className="text-xs text-gray-500 mr-1">내 요청 →</span>}

          {approvals.map((approval, index) => (
            <div key={`${approval.name}-${index}`} className="flex items-center">
              {/* 결재자 정보 */}
              <div
                className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full 
                          border-[1.5px] ${
                            index === currentApprovalIndex
                              ? "border-blue-400 bg-blue-50"
                              : "border-gray-300 bg-gray-50"
                          }`}
              >
                <span className="text-sm font-medium text-gray-900">{approval.name}</span>
                <span className="text-xs text-gray-500">
                  {POSITION_OPTIONS.find((option) => option.value === approval.position)?.label}
                </span>
                {/* 상태 표시 */}
                {approval.status === "pending" ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                ) : approval.status === "approved" ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                )}
                {/* 현재 결재 차례 표시 */}
                {index === currentApprovalIndex && (
                  <span className="text-[10px] text-blue-500 ml-0.5">결재중</span>
                )}
              </div>

              {/* 화살표 (마지막 아이템 제외) */}
              {index < approvals.length - 1 && (
                <svg
                  className={`w-3.5 h-3.5 mx-0.5 ${
                    index < currentApprovalIndex ? "text-blue-400" : "text-gray-400"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    id: "requestDate",
    header: "신청일",
    accessorKey: "submittedAt",
  },
];
