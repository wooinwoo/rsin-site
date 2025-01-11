import type { Employee } from "~/entities/employees/model";
import { ProfileCell } from "~/features/datatable/components/cells/ProfileCell";
import { ColumnDef } from "~/features/datatable/types/datatable";
import { POSITION_OPTIONS } from "~/shared/constants/options";
import type { SearchField } from "~/features/datatable/types/datatable";
import { DEPARTMENT_OPTIONS } from "~/shared/constants/options";
export const employeeColumns: ColumnDef<Employee>[] = [
  {
    id: "empNo",
    header: "사번",
    accessorKey: "empNo",
  },
  {
    id: "thumbnailPath",
    header: "이름",
    accessorKey: "name",
    cell: ({ row }) => <ProfileCell profileUrl={row.thumbnailPath} employeeName={row.name} />,
  },
  {
    id: "department.id",
    header: "부서",
    accessorKey: "department.name",
  },
  {
    id: "position",
    header: "직급",
    accessorKey: "position",
    cell: ({ row }) => {
      const position = POSITION_OPTIONS.find((pos) => pos.value === row.position);
      return position?.label || "-";
    },
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

export const searchFields: SearchField[] = [
  {
    id: "employeeName",
    type: "text",
    label: "이름",
    placeholder: "이름을 입력하세요",
    width: "200px",
  },
  {
    id: "departmentId", // API 파라미터명과 일치
    type: "select",
    label: "부서",
    options: DEPARTMENT_OPTIONS,
    width: "150px",
  },
];
