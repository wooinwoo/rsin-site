import { useState } from "react";
import { DataTable } from "~/features/datatable/components/DataTable";
import { ColumnDef } from "~/features/datatable/types/datatable";
import { PlusIcon } from "~/shared/ui/icons/PlusIcon";
import { TeamMemberAddModal } from "~/features/team/components/TeamMemberAddModal";
interface TeamMember {
  id: string;
  profileUrl: string;
  department: string;
  employeeId: string;
  name: string;
  position: string;
  joinDate: string;
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

const teamMembers: TeamMember[] = [
  {
    id: "1",
    profileUrl: "/images/profiles/profile1.jpg",
    department: "개발팀",
    employeeId: "2024001",
    name: "김영희",
    position: "대리",
    joinDate: "2021-03-15",
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
    email: "jung.mj@company.com",
    phone: "010-5678-9012",
    birthDate: "1988-02-14",
    mbti: null,
  },
];

export default function TeamManagementListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowSelect = (selectedMembers: TeamMember[]) => {
    console.log("Selected members:", selectedMembers);
  };

  return (
    <>
      <TeamMemberAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (data) => {
          try {
            // API 호출 등 처리
            // await addTeamMember(data);
            setIsModalOpen(false);
          } catch (error) {
            console.error(error);
          }
        }}
      />
      <DataTable
        data={teamMembers}
        columns={columns}
        onRowSelect={handleRowSelect}
        enableSearch
        toolbarButtons={[
          {
            label: "팀원추가",
            onClick: () => setIsModalOpen(true),
            variant: "primary",
            icon: <PlusIcon />,
          },
        ]}
      />
    </>
  );
}
