import { DataTable } from "~/features/datatable/components/DataTable";
import { ColumnDef, SearchField } from "~/features/datatable/types/datatable";
import { DEPARTMENT_OPTIONS, LEAVE_TYPE_OPTIONS } from "~/shared/constants/options";
import { LeaveStatusBadge } from "~/features/leave/components/LeaveStatusBadge";
import { ProfileCell } from "~/features/datatable/components/cells/ProfileCell";
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
    options: LEAVE_TYPE_OPTIONS,
    width: "150px",
  },
  {
    id: "department",
    type: "select",
    label: "부서",
    options: DEPARTMENT_OPTIONS,
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
    cell: ({ row }) => <ProfileCell profileUrl={row.profileUrl} employeeName={row.employeeName} />,
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
    cell: ({ row }) => <LeaveStatusBadge status={row.status} />,
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
