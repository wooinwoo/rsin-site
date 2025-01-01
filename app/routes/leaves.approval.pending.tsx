// app/routes/leaves.approval.tsx
import { DataTable } from "~/features/datatable/components/DataTable";
import { ColumnDef, SearchField } from "~/features/datatable/types/datatable";
import { CheckIcon } from "~/shared/ui/icons/CheckIcon";
import { LeaveApprovalModal } from "~/features/leave/components/LeaveApprovalModal";
import { useState } from "react";
import { ApprovalStatusBadge } from "~/features/approval/components/ApprovalStatusBadge";
import { ProfileCell } from "~/features/datatable/components/cells/ProfileCell";
import { LeaveApprovalCard } from "~/features/leave/components/LeaveApprovalCard";

export interface LeaveRequest {
  id: string;
  employeeName: string;
  profileUrl: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  approver: string;
  requestDate: string;
}

const searchFields: SearchField[] = [
  {
    id: "employeeName",
    type: "text",
    label: "신청자",
    placeholder: "이름을 입력하세요",
    width: "200px",
  },
  {
    id: "approvalType",
    type: "select",
    label: "결재 구분",
    options: [
      { value: "myPending", label: "내 승인대기" },
      { value: "allApproval", label: "결재선 전체" },
    ],
    width: "150px",
    defaultValue: "myPending",
    showAllOption: false,
  },
];

const columns: ColumnDef<LeaveRequest>[] = [
  {
    id: "employeeName",
    header: "신청자",
    accessorKey: "employeeName",
    cell: ({ row }) => <ProfileCell profileUrl={row.profileUrl} employeeName={row.employeeName} />,
  },
  {
    id: "leaveType",
    header: "휴가 종류",
    accessorKey: "leaveType",
  },
  {
    id: "period",
    header: "기간",
    accessorKey: "startDate",
    cell: ({ row }) => (
      <span>
        {row.startDate} ~ {row.endDate}
      </span>
    ),
  },
  {
    id: "approver",
    header: "결재자",
    accessorKey: "approver",
  },
  {
    id: "requestDate",
    header: "신청일",
    accessorKey: "requestDate",
  },
];
const leaveRequests: LeaveRequest[] = [
  {
    id: "1",
    employeeName: "김태완",
    profileUrl: "https://via.placeholder.com/150",
    leaveType: "연차",
    startDate: "2024-03-15",
    endDate: "2024-03-15",
    approver: "김태완",
    requestDate: "2024-03-10",
  },
  {
    id: "2",
    employeeName: "김태완",
    profileUrl: "https://via.placeholder.com/150",
    leaveType: "반차",
    startDate: "2024-03-18",
    endDate: "2024-03-18",
    approver: "김태완",
    requestDate: "2024-03-11",
  },
  {
    id: "3",
    employeeName: "김태완",
    profileUrl: "https://via.placeholder.com/150",
    leaveType: "병가",
    startDate: "2024-03-20",
    endDate: "2024-03-22",
    approver: "김태완",
    requestDate: "2024-03-12",
  },
  {
    id: "4",
    employeeName: "김태완",
    profileUrl: "https://via.placeholder.com/150",
    leaveType: "경조사",
    startDate: "2024-03-25",
    endDate: "2024-03-26",
    approver: "김태완",
    requestDate: "2024-03-13",
  },
  {
    id: "5",
    employeeName: "김태완",
    profileUrl: "https://via.placeholder.com/150",
    leaveType: "연차",
    startDate: "2024-04-01",
    endDate: "2024-04-02",
    approver: "김태완",
    requestDate: "2024-03-14",
  },
];

export default function LeaveApprovalPage() {
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowSelect = (selectedRequests: LeaveRequest[]) => {
    console.log("Selected requests:", selectedRequests);
    // 선택된 항목들에 대한 처리
  };

  return (
    <>
      <LeaveApprovalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApprove={() => {
          // 승인 처리
          setIsModalOpen(false);
        }}
        onReject={() => {
          // 반려 처리
          setIsModalOpen(false);
        }}
      />
      <DataTable
        data={leaveRequests}
        columns={columns}
        mobileCard={LeaveApprovalCard}
        onRowSelect={handleRowSelect}
        searchFields={searchFields}
        onSearch={() => {}}
        onRowClick={(row) => {
          setSelectedLeave(row);
          setIsModalOpen(true);
        }} // 행 클릭 핸들러 추가
        enableSearch
        enableSelection
        toolbarButtons={[
          {
            label: "일괄승인",
            onClick: () => {},
            variant: "danger",
            icon: <CheckIcon />,
          },
        ]}
      />
    </>
  );
}
