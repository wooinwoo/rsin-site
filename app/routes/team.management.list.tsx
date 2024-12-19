import { DataTable } from "~/features/datatable/components/DataTable";
import { ColumnDef, SearchField } from "~/features/datatable/types/datatable";

interface TeamMember {
  id: string;
  profileUrl: string;
  department: string;
  employeeId: string;
  name: string;
  position: string;
  joinDate: string;
  resignDate: string | null;
  email: string;
  phone: string;
  birthDate: string;
  mbti: string | null;
}

const columns: ColumnDef<TeamMember>[] = [
  {
    id: "department",
    header: "부서",
    accessorKey: "department",
  },
  {
    id: "employeeId",
    header: "사번",
    accessorKey: "employeeId",
  },
  {
    id: "profile",
    header: "이름",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <img src={row.profileUrl} alt={row.name} className="w-8 h-8 rounded-full" />
        <span>{row.name}</span>
      </div>
    ),
  },
  {
    id: "position",
    header: "직급",
    accessorKey: "position",
  },
  {
    id: "joinDate",
    header: "입사일",
    accessorKey: "joinDate",
  },
  {
    id: "resignDate",
    header: "퇴사일",
    accessorKey: "resignDate",
  },
  {
    id: "email",
    header: "이메일",
    accessorKey: "email",
  },
  {
    id: "phone",
    header: "연락처",
    accessorKey: "phone",
  },
  {
    id: "birthDate",
    header: "생년월일",
    accessorKey: "birthDate",
  },
  {
    id: "mbti",
    header: "MBTI",
    accessorKey: "mbti",
  },
];

const searchFields: SearchField[] = [
  {
    id: "department",
    type: "select",
    label: "부서",
    options: [
      { value: "개발팀", label: "개발팀" },
      { value: "인사팀", label: "인사팀" },
      { value: "마케팅팀", label: "마케팅팀" },
      { value: "기획팀", label: "기획팀" },
      { value: "디자인팀", label: "디자인팀" },
      { value: "영업팀", label: "영업팀" },
    ],
  },
  {
    id: "employeeId",
    type: "text",
    label: "사번",
    placeholder: "사번을 입력하세요",
  },
  {
    id: "name",
    type: "text",
    label: "이름",
    placeholder: "이름을 입력하세요",
  },
  {
    id: "position",
    type: "select",
    label: "직급",
    options: [
      { value: "사원", label: "사원" },
      { value: "주임", label: "주임" },
      { value: "대리", label: "대리" },
      { value: "과장", label: "과장" },
      { value: "차장", label: "차장" },
      { value: "부장", label: "부장" },
    ],
  },
];

const teamMembers: TeamMember[] = [
  {
    id: "1",
    profileUrl: "/images/profiles/profile1.jpg",
    department: "개발팀",
    employeeId: "2024001",
    name: "김영희",
    position: "대리",
    joinDate: "2021-03-15",
    resignDate: null,
    email: "kim.yh@company.com",
    phone: "010-1234-5678",
    birthDate: "1995-05-15",
    mbti: "ENFJ",
  },
  {
    id: "2",
    profileUrl: "/images/profiles/profile2.jpg",
    department: "인사팀",
    employeeId: "2022015",
    name: "이철수",
    position: "과장",
    joinDate: "2019-08-20",
    resignDate: null,
    email: "lee.cs@company.com",
    phone: "010-2345-6789",
    birthDate: "1990-11-23",
    mbti: "ISTJ",
  },
  {
    id: "3",
    profileUrl: "/images/profiles/profile3.jpg",
    department: "마케팅팀",
    employeeId: "2020103",
    name: "박지민",
    position: "대리",
    joinDate: "2020-01-10",
    resignDate: "2024-02-29",
    email: "park.jm@company.com",
    phone: "010-3456-7890",
    birthDate: "1993-08-07",
    mbti: "ENTP",
  },
  {
    id: "4",
    profileUrl: "/images/profiles/profile4.jpg",
    department: "개발팀",
    employeeId: "2023042",
    name: "최수진",
    position: "사원",
    joinDate: "2023-03-02",
    resignDate: null,
    email: "choi.sj@company.com",
    phone: "010-4567-8901",
    birthDate: "1997-12-30",
    mbti: "INTP",
  },
  {
    id: "5",
    profileUrl: "/images/profiles/profile5.jpg",
    department: "기획팀",
    employeeId: "2019087",
    name: "정민준",
    position: "차장",
    joinDate: "2019-04-05",
    resignDate: null,
    email: "jung.mj@company.com",
    phone: "010-5678-9012",
    birthDate: "1988-02-14",
    mbti: null,
  },
];

export default function TeamManagementListPage() {
  const handleRowSelect = (selectedMembers: TeamMember[]) => {
    console.log("Selected members:", selectedMembers);
  };

  return (
    <DataTable
      data={teamMembers}
      columns={columns}
      onRowSelect={handleRowSelect}
      searchFields={searchFields}
    />
  );
}
