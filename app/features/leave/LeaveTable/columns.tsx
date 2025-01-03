import type { ColumnDef } from "~/features/datatable/types/datatable";
import type { EmployeeAnnual } from "~/entities/leave/model";
import { ProfileCell } from "~/features/datatable/components/cells/ProfileCell";
import type { SearchField } from "~/features/datatable/types/datatable";
import { DEPARTMENT_OPTIONS } from "~/shared/constants/options";
import { POSITION_OPTIONS } from "~/shared/constants/options";
import { getFullImageUrl } from "~/shared/utils/imges";
export const annualColumns: ColumnDef<EmployeeAnnual>[] = [
  {
    id: "empNo",
    header: "사번",
    accessorKey: "empNo",
  },
  {
    id: "name",
    header: "이름",
    accessorKey: "name",
    cell: ({ row }) => (
      <ProfileCell profileUrl={getFullImageUrl(row.thumbnailPath)} employeeName={row.name} />
    ),
  },
  {
    id: "department",
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
    id: "tenure",
    header: "근속연수",
    accessorKey: "tenure",
    cell: ({ row }) => <span>{row.tenure}년</span>,
  },
  {
    id: "joinedAt",
    header: "입사일",
    accessorKey: "joinedAt",
  },
  {
    id: "totalLeaves",
    header: "총연차",
    accessorKey: "leave.total",
    cell: ({ row }) => <span className="w-full text-center">{row.leave.total}</span>,
    headerClassName: "text-center",
  },
  {
    id: "usedLeaves",
    header: "사용연차",
    accessorKey: "leave.used",
    cell: ({ row }) => <span className="font-bold w-full text-center">{row.leave.used}</span>,
    headerClassName: "text-center text-gray-800",
  },
  {
    id: "remainingLeaves",
    header: "잔여연차",
    accessorKey: "leave.remain",
    cell: ({ row }) => <span className="font-bold w-full text-center">{row.leave.remain}</span>,
    headerClassName: "text-center text-gray-800",
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
