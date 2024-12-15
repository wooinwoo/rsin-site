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
}

const searchFields: SearchField[] = [
  {
    id: "employeeName",
    type: "input",
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
];

export default function LeaveApprovalPage() {
  // 실제로는 API에서 데이터를 가져올 것입니다
  const leaveRequests: LeaveRequest[] = [
    {
      id: "1",
      employeeName: "홍길동",
      leaveType: "연차",
      startDate: "2024-03-01",
      endDate: "2024-03-02",
      status: "pending",
    },
    {
      id: "2",
      employeeName: "김철수",
      leaveType: "반차",
      startDate: "2024-03-05",
      endDate: "2024-03-05",
      status: "approved",
    },
  ];

  const handleRowSelect = (selectedRequests: LeaveRequest[]) => {
    console.log("Selected requests:", selectedRequests);
    // 선택된 항목들에 대한 처리
  };

  return (
    <div className="container mx-auto">
      <DataTable
        data={leaveRequests}
        columns={columns}
        onRowSelect={handleRowSelect}
        searchFields={searchFields}
      />
    </div>
  );
}
