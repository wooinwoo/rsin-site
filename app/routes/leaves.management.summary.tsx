// app/routes/leaves.approval.tsx
import { DataTable } from "~/features/datatable/components/DataTable";
import { ColumnDef, SearchField } from "~/features/datatable/types/datatable";

interface Employee {
  employeeId: string; // 사번
  name: string; // 이름
  department: string; // 부서
  position: string; // 직급
  yearsOfService: number; // 근속기간
  joinDate: string; // 입사일
  totalLeaves: number; // 가용연차
  usedLeaves: number; // 사용연차
  remainingLeaves: number; // 잔여연차
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

const columns: ColumnDef<Employee>[] = [
  {
    id: "employeeId",
    header: "사번",
    accessorKey: "employeeId",
  },
  {
    id: "name",
    header: "이름",
    accessorKey: "name",
  },
  {
    id: "department",
    header: "부서",
    accessorKey: "department",
  },
  {
    id: "position",
    header: "직급",
    accessorKey: "position",
  },
  {
    id: "yearsOfService",
    header: "근속기간",
    accessorKey: "yearsOfService",
    cell: ({ row }) => <span>{row.yearsOfService}년</span>,
  },
  {
    id: "joinDate",
    header: "입사일",
    accessorKey: "joinDate",
  },
  {
    id: "totalLeaves",
    header: "가용연차",
    accessorKey: "totalLeaves",
  },
  {
    id: "usedLeaves",
    header: "사용연차",
    accessorKey: "usedLeaves",
  },
  {
    id: "remainingLeaves",
    header: "잔여연차",
    accessorKey: "remainingLeaves",
  },
];

export default function LeaveApprovalPage() {
  const employeeData: Employee[] = [
    {
      employeeId: "2024001",
      name: "김영희",
      department: "개발팀",
      position: "선임연구원",
      yearsOfService: 3,
      joinDate: "2021-03-15",
      totalLeaves: 15,
      usedLeaves: 5,
      remainingLeaves: 10,
    },
    {
      employeeId: "2022015",
      name: "이철수",
      department: "인사팀",
      position: "과장",
      yearsOfService: 5,
      joinDate: "2019-08-20",
      totalLeaves: 17,
      usedLeaves: 8,
      remainingLeaves: 9,
    },
    {
      employeeId: "2020103",
      name: "박지민",
      department: "마케팅팀",
      position: "대리",
      yearsOfService: 4,
      joinDate: "2020-01-10",
      totalLeaves: 16,
      usedLeaves: 12,
      remainingLeaves: 4,
    },
    {
      employeeId: "2023042",
      name: "최수진",
      department: "개발팀",
      position: "주임",
      yearsOfService: 2,
      joinDate: "2022-11-01",
      totalLeaves: 14,
      usedLeaves: 3,
      remainingLeaves: 11,
    },
    {
      employeeId: "2019087",
      name: "정민준",
      department: "기획팀",
      position: "차장",
      yearsOfService: 7,
      joinDate: "2017-04-05",
      totalLeaves: 19,
      usedLeaves: 15,
      remainingLeaves: 4,
    },
    {
      employeeId: "2021056",
      name: "강서연",
      department: "디자인팀",
      position: "대리",
      yearsOfService: 3,
      joinDate: "2021-06-15",
      totalLeaves: 15,
      usedLeaves: 7,
      remainingLeaves: 8,
    },
    {
      employeeId: "2018034",
      name: "윤도현",
      department: "영업팀",
      position: "과장",
      yearsOfService: 6,
      joinDate: "2018-09-20",
      totalLeaves: 18,
      usedLeaves: 10,
      remainingLeaves: 8,
    },
    {
      employeeId: "2022098",
      name: "임서영",
      department: "개발팀",
      position: "연구원",
      yearsOfService: 2,
      joinDate: "2022-03-28",
      totalLeaves: 14,
      usedLeaves: 4,
      remainingLeaves: 10,
    },
    {
      employeeId: "2020145",
      name: "한지훈",
      department: "인사팀",
      position: "대리",
      yearsOfService: 4,
      joinDate: "2020-02-15",
      totalLeaves: 16,
      usedLeaves: 9,
      remainingLeaves: 7,
    },
    {
      employeeId: "2017012",
      name: "송미라",
      department: "기획팀",
      position: "부장",
      yearsOfService: 8,
      joinDate: "2016-07-11",
      totalLeaves: 20,
      usedLeaves: 13,
      remainingLeaves: 7,
    },
  ];

  const handleRowSelect = (selectedRequests: Employee[]) => {
    console.log("Selected requests:", selectedRequests);
    // 선택된 항목들에 대한 처리
  };

  return (
    <DataTable
      data={employeeData}
      columns={columns}
      onRowSelect={handleRowSelect}
      searchFields={searchFields}
    />
  );
}
