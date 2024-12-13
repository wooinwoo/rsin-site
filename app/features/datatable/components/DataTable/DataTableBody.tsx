import { ColumnDef } from "../../types/datatable";
import { DataTableRow } from "./DataTableRow";

interface DataTableBodyProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  selectable: boolean;
  selectedRows: T[];
  onRowSelect: (rows: T[]) => void;
}

export function DataTableBody<T extends Record<string, any>>({
  data,
  columns,
  selectable,
  selectedRows,
  onRowSelect,
}: DataTableBodyProps<T>) {
  return (
    <tbody>
      {data.map((item, index) => (
        <DataTableRow
          key={index}
          item={item}
          columns={columns}
          selectable={selectable}
          selected={selectedRows.includes(item)}
          onSelect={(selected) => {
            if (selected) {
              onRowSelect([...selectedRows, item]);
            } else {
              onRowSelect(selectedRows.filter((row) => row !== item));
            }
          }}
        />
      ))}
    </tbody>
  );
}
