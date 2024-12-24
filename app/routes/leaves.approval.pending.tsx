// app/routes/leaves.approval.tsx
import { DataTable } from "~/features/datatable/components/DataTable";
import { ColumnDef, SearchField } from "~/features/datatable/types/datatable";
import { CheckIcon } from "~/shared/ui/icons/CheckIcon";
import { LeaveApprovalModal } from "~/features/leave/components/LeaveApprovalModal";
import { useState } from "react";
interface LeaveRequest {
  id: string;
  employeeName: string;
  profileUrl: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
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
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <img src={row.profileUrl} alt={row.employeeName} className="w-8 h-8 rounded-full" />
        <span>{row.employeeName}</span>
      </div>
    ),
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
    id: "status",
    header: "상태",
    accessorKey: "status",
    cell: ({ row }) => (
      <span
        className={`
        px-2 py-1 rounded-full text-xs
        ${row.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
        ${row.status === "approved" ? "bg-green-100 text-green-800" : ""}
        ${row.status === "rejected" ? "bg-red-100 text-red-800" : ""}
      `}
      >
        {row.status === "pending" && "대기중"}
        {row.status === "approved" && "승인"}
        {row.status === "rejected" && "반려"}
      </span>
    ),
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
    status: "pending",
    requestDate: "2024-03-10",
  },
  {
    id: "2",
    employeeName: "김태완",
    profileUrl: "https://via.placeholder.com/150",
    leaveType: "반차",
    startDate: "2024-03-18",
    endDate: "2024-03-18",
    status: "approved",
    requestDate: "2024-03-11",
  },
  {
    id: "3",
    employeeName: "김태완",
    profileUrl: "https://via.placeholder.com/150",
    leaveType: "병가",
    startDate: "2024-03-20",
    endDate: "2024-03-22",
    status: "approved",
    requestDate: "2024-03-12",
  },
  {
    id: "4",
    employeeName: "김태완",
    profileUrl: "https://via.placeholder.com/150",
    leaveType: "경조사",
    startDate: "2024-03-25",
    endDate: "2024-03-26",
    status: "pending",
    requestDate: "2024-03-13",
  },
  {
    id: "5",
    employeeName: "김태완",
    profileUrl: "https://via.placeholder.com/150",
    leaveType: "연차",
    startDate: "2024-04-01",
    endDate: "2024-04-02",
    status: "rejected",
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
