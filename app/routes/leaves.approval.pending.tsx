// app/routes/leaves.approval.tsx
import { DataTable } from "~/features/datatable/components/DataTable";
import { ColumnDef, SearchField } from "~/features/datatable/types/datatable";

interface LeaveRequest {
  id: string;
  employeeName: string;
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
    id: "status",
    type: "select",
    label: "상태",
    options: [
      { value: "pending", label: "대기중" },
      { value: "approved", label: "승인" },
      { value: "rejected", label: "반려" },
    ],
    width: "150px",
  },
];

const columns: ColumnDef<LeaveRequest>[] = [
  {
    id: "employeeName",
    header: "신청자",
    accessorKey: "employeeName",
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

export default function LeaveApprovalPage() {
  const leaveRequests: LeaveRequest[] = [
    {
      id: "1",
      employeeName: "김태완",
      leaveType: "연차",
      startDate: "2024-03-15",
      endDate: "2024-03-15",
      status: "pending",
      requestDate: "2024-03-10",
    },
    {
      id: "2",
      employeeName: "김태완",
      leaveType: "반차",
      startDate: "2024-03-18",
      endDate: "2024-03-18",
      status: "approved",
      requestDate: "2024-03-11",
    },
    {
      id: "3",
      employeeName: "김태완",
      leaveType: "병가",
      startDate: "2024-03-20",
      endDate: "2024-03-22",
      status: "approved",
      requestDate: "2024-03-12",
    },
    {
      id: "4",
      employeeName: "김태완",
      leaveType: "경조사",
      startDate: "2024-03-25",
      endDate: "2024-03-26",
      status: "pending",
      requestDate: "2024-03-13",
    },
    {
      id: "5",
      employeeName: "김태완",
      leaveType: "연차",
      startDate: "2024-04-01",
      endDate: "2024-04-02",
      status: "rejected",
      requestDate: "2024-03-14",
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
      onRowSelect={handleRowSelect}
      searchFields={searchFields}
    />
  );
}
