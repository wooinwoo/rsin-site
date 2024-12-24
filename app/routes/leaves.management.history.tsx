import { DataTable } from "~/features/datatable/components/DataTable";
import { ColumnDef, SearchField } from "~/features/datatable/types/datatable";

interface LeaveHistory {
  id: string;
  profileUrl: string;
  employeeName: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: "pending" | "scheduled" | "used"; // 승인대기/사용예정/사용완료
  reason: string;
}

const searchFields: SearchField[] = [
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
    id: "department",
    type: "select",
    label: "부서",
    options: [
      { value: "dev", label: "개발팀" },
      { value: "design", label: "디자인팀" },
      { value: "planning", label: "기획팀" },
      { value: "management", label: "경영지원팀" },
    ],
    width: "150px",
  },
  {
    id: "period",
    type: "daterange",
    label: "기간",
    placeholder: "기간을 선택하세요",
    width: "300px",
  },
];

const columns: ColumnDef<LeaveHistory>[] = [
  {
    id: "profile",
    header: "이름",
    accessorKey: "employeeName",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <img src={row.profileUrl} alt={row.employeeName} className="w-8 h-8 rounded-full" />
        <span>{row.employeeName}</span>
      </div>
    ),
  },
  {
    id: "department",
    header: "부서",
    accessorKey: "department",
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
    header: "사용 여부",
    accessorKey: "status",
    cell: ({ row }) => (
      <span
        className={`
          px-2 py-1 rounded-full text-xs
          ${row.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
          ${row.status === "scheduled" ? "bg-blue-100 text-blue-800" : ""}
          ${row.status === "used" ? "bg-green-100 text-green-800" : ""}
        `}
      >
        {row.status === "pending" && "승인대기"}
        {row.status === "scheduled" && "사용예정"}
        {row.status === "used" && "사용완료"}
      </span>
    ),
  },
  {
    id: "reason",
    header: "사유",
    accessorKey: "reason",
  },
];

export default function LeaveHistoryPage() {
  // 실제로는 API에서 데이터를 가져올 것입니다
  const leaveHistories: LeaveHistory[] = [
    {
      id: "1",
      profileUrl: "https://via.placeholder.com/150",
      employeeName: "홍길동",
      department: "개발팀",
      leaveType: "연차",
      startDate: "2024-03-01",
      endDate: "2024-03-02",
      status: "used",
      reason: "개인 사유",
    },
    {
      id: "2",
      profileUrl: "https://via.placeholder.com/150",
      employeeName: "김철수",
      department: "인사팀",
      leaveType: "반차",
      startDate: "2024-03-05",
      endDate: "2024-03-05",
      status: "scheduled",
      reason: "병원 방문",
    },
  ];

  const handleRowSelect = (selectedHistories: LeaveHistory[]) => {
    console.log("Selected histories:", selectedHistories);
  };

  const handleSearch = (searchValues: any) => {
    console.log("Search values:", searchValues);
  };

  return (
    <DataTable
      data={leaveHistories}
      columns={columns}
      onSearch={handleSearch}
      onRowSelect={handleRowSelect}
      searchFields={searchFields}
      enableSearch
    />
  );
}
