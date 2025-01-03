// app/routes/leaves.approval.tsx
import { DataTable } from "~/features/datatable/components/DataTable";
import { ColumnDef, SearchField } from "~/features/datatable/types/datatable";
import { LEAVE_TYPE_OPTIONS } from "~/shared/constants/options";
import { ApprovalStatusBadge } from "~/features/approval/components/ApprovalStatusBadge";
import { ProfileCell } from "~/features/datatable/components/cells/ProfileCell";
import { LeaveCompletedCard } from "~/features/leave/components/LeaveCompletedCard";
export interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeProfileUrl: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
  approverName: string;
  approverProfileUrl: string;
  requestDate: string;
  processedDate: string | null;
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
    id: "leaveType",
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

const columns: ColumnDef<LeaveRequest>[] = [
  {
    id: "employeeName",
    header: "이름",
    accessorKey: "employeeName",
    cell: ({ row }) => (
      <ProfileCell profileUrl={row.employeeProfileUrl} employeeName={row.employeeName} />
    ),
  },
  {
    id: "leaveType",
    header: "휴가 유형",
    accessorKey: "leaveType",
  },
  {
    id: "period",
    header: "날짜",
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
    cell: ({ row }) => <ApprovalStatusBadge status={row.status} />,
  },
  {
    id: "approver",
    header: "결재자",
    accessorKey: "approverName",
  },
  {
    id: "requestDate",
    header: "신청일",
    accessorKey: "requestDate",
  },
  {
    id: "processedDate",
    header: "결재일",
    accessorKey: "processedDate",
  },
];

export default function LeaveApprovalPage() {
  const leaveRequests: LeaveRequest[] = [
    {
      id: "1",
      employeeName: "김태완",
      employeeProfileUrl: "/images/profiles/profile2.jpg",
      leaveType: "반차",
      startDate: "2024-03-18",
      endDate: "2024-03-18",
      status: "approved",
      approverName: "미부장",
      approverProfileUrl: "/images/profiles/profile3.jpg",
      requestDate: "2024-03-11",
      processedDate: "2024-03-12",
    },
    {
      id: "2",
      employeeName: "김태완",
      employeeProfileUrl: "/images/profiles/profile2.jpg",
      leaveType: "반차",
      startDate: "2024-03-18",
      endDate: "2024-03-18",
      status: "approved",
      approverName: "미부장",
      approverProfileUrl: "/images/profiles/profile3.jpg",
      requestDate: "2024-03-11",
      processedDate: "2024-03-12",
    },
    {
      id: "3",
      employeeName: "김태완",
      employeeProfileUrl: "/images/profiles/profile4.jpg",
      leaveType: "병가",
      startDate: "2024-03-20",
      endDate: "2024-03-22",
      status: "rejected",
      approverName: "태완핑",
      approverProfileUrl: "/images/profiles/profile5.jpg",
      requestDate: "2024-03-12",
      processedDate: "2024-03-13",
    },
  ];
  const handleRowSelect = (selectedRequests: LeaveRequest[]) => {
    console.log("Selected requests:", selectedRequests);
    // 선택된 항목들에 대한 처리
  };

  return (
    <DataTable
      data={leaveRequests}
      columns={columns}
      onSearch={() => {}}
      mobileCard={LeaveCompletedCard}
      onRowSelect={handleRowSelect}
      searchFields={searchFields}
      enableSearch
    />
  );
}
