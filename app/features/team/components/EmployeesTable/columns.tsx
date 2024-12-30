import { ColumnDef } from "~/features/datatable/types/datatable";
import type { Employee } from "~/entities/employees/model";
import { ProfileCell } from "~/features/datatable/components/cells/ProfileCell";
export const employeeColumns: ColumnDef<Employee>[] = [
  {
    id: "empNo",
    header: "사번",
    accessorKey: "empNo",
  },
  {
    id: "profile",
    header: "이름",
    accessorKey: "name",
    cell: ({ row }) => <ProfileCell profileUrl={row.profileUrl} employeeName={row.name} />,
  },
  {
    id: "position",
    header: "직급",
    accessorKey: "position",
  },
  {
    id: "joinedAt",
    header: "입사일",
    accessorKey: "joinedAt",
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
    id: "birth",
    header: "생년월일",
    accessorKey: "birth",
  },
  {
    id: "mbti",
    header: "MBTI",
    accessorKey: "mbti",
  },
];
