import { ColumnDef } from "../../types/datatable";
import { DataTableCheckbox } from "../DataTableCheckbox";

interface DataTableRowProps<T> {
  item: T;
  columns: ColumnDef<T>[];
  selectable: boolean;
  selected: boolean;
  onSelect: (selected: boolean) => void;
}

export function DataTableRow<T extends Record<string, any>>({
  item,
  columns,
  selectable,
  selected,
  onSelect,
}: DataTableRowProps<T>) {
  return (
    <tr className="border-b transition-colors hover:bg-gray-50">
      {selectable && (
        <td className="w-[40px] p-4">
          <DataTableCheckbox checked={selected} onChange={onSelect} />
        </td>
      )}
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
