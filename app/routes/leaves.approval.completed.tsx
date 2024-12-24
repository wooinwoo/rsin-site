// app/routes/leaves.approval.tsx
import { DataTable } from "~/features/datatable/components/DataTable";
import { ColumnDef, SearchField } from "~/features/datatable/types/datatable";

interface LeaveRequest {
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
    options: [
      { value: "annual", label: "연차" },
      { value: "half", label: "반차" },
      { value: "sick", label: "병가" },
    ],
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
      <div className="flex items-center gap-2">
        <img src={row.employeeProfileUrl} alt={row.employeeName} className="w-8 h-8 rounded-full" />
        <span>{row.employeeName}</span>
      </div>
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
    id: "approver",
    header: "처리자",
    accessorKey: "approverName",
    cell: ({ row }) =>
      row.approverName ? (
        <div className="flex items-center gap-2">
          <img
            src={row.approverProfileUrl}
            alt={row.approverName}
            className="w-8 h-8 rounded-full"
          />
          <span>{row.approverName}</span>
        </div>
      ) : null,
  },
  {
    id: "requestDate",
    header: "신청일",
    accessorKey: "requestDate",
  },
  {
    id: "processedDate",
    header: "처리일",
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
      onRowSelect={handleRowSelect}
      searchFields={searchFields}
      enableSearch
    />
  );
}
