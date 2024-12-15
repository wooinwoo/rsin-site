import { ColumnDef } from "../../types/datatable";
import { DataTableCheckbox } from "../DataTableCheckbox";

interface DataTableHeaderProps<T> {
  columns: ColumnDef<T>[];
  selectable?: boolean;
  onSelectAll?: (checked: boolean) => void;
  allSelected?: boolean;
}

export function DataTableHeader<T>({
  columns,
  selectable,
  onSelectAll,
  allSelected = false,
}: DataTableHeaderProps<T>) {
  return (
    <thead>
      <tr className="border-b bg-gray-50">
        {selectable && (
          <th className="w-[40px] p-4">
            <DataTableCheckbox
              checked={allSelected}
              onChange={(checked) => onSelectAll?.(checked)}
            />
          </th>
        )}
        {columns.map((column) => (
          <th
            key={column.id}
            className="whitespace-nowrap p-4 text-left text-sm font-medium text-gray-600"
          >
            {column.header}
            {column.sortable && <button className="ml-2 text-gray-400">{/* 정렬 아이콘 */}</button>}
          </th>
        ))}
      </tr>
    </thead>
  );
}
