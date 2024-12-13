// app/routes/leaves.approval.tsx
import { DataTable } from "~/features/datatable/components/DataTable";
import { ColumnDef } from "~/features/datatable/types/datatable";
import { Widget } from "~/shared/ui/widgets/widget";

interface LeaveRequest {
  id: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
}

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
    <div className="p-6">
      <Widget>
        <DataTable data={leaveRequests} columns={columns} onRowSelect={handleRowSelect} />
      </Widget>
    </div>
  );
}
