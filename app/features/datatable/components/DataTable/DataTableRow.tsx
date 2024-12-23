import { ColumnDef } from "../../types/datatable";
import { DataTableCheckbox } from "../DataTableCheckbox";

interface DataTableRowProps<T> {
  item: T;
  index: number;
  pageSize: number;
  currentPage: number;
  totalItems: number;
  columns: ColumnDef<T>[];
  selectable: boolean;
  selected: boolean;
  onSelect: (selected: boolean) => void;
  onRowClick?: (row: T) => void;
}

export function DataTableRow<T extends Record<string, any>>({
  item,
  index,
  pageSize,
  currentPage,
  totalItems,
  columns,
  selectable,
  selected,
  onSelect,
  onRowClick,
}: DataTableRowProps<T>) {
  const rowNumber = totalItems - ((currentPage - 1) * pageSize + index);

  return (
    <tr
      className={`
        border-b transition-colors
        ${onRowClick ? "hover:bg-gray-50 cursor-pointer" : ""}
      `}
      onClick={(e) => {
        if (!onRowClick) return;
        if ((e.target as HTMLElement).closest('[role="checkbox"]')) {
          return;
        }
        onRowClick(item);
      }}
    >
      {selectable && (
        <td className="w-[40px] p-4">
          <DataTableCheckbox checked={selected} onChange={onSelect} />
        </td>
      )}
      <td className="w-[60px] p-4 text-sm text-gray-600">{rowNumber}</td>
      {columns.map((column) => (
        <td key={column.id} className="p-4">
          <div className="flex items-center whitespace-nowrap">
            {column.cell ? column.cell({ row: item }) : item[column.accessorKey]}
          </div>
        </td>
      ))}
    </tr>
  );
}
