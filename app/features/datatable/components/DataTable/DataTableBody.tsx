import { ColumnDef } from "../../types/datatable";
import { DataTableRow } from "./DataTableRow";

interface DataTableBodyProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  selectable: boolean;
  selectedRows: T[];
  onRowSelect: (rows: T[]) => void;
  pageSize: number;
  currentPage: number;
  totalItems: number;
}

export function DataTableBody<T extends Record<string, any>>({
  data,
  columns,
  selectable,
  selectedRows,
  onRowSelect,
  pageSize,
  currentPage,
  totalItems,
}: DataTableBodyProps<T>) {
  return (
    <tbody>
      {data.map((item, index) => (
        <DataTableRow
          key={index}
          item={item}
          index={index}
          pageSize={pageSize}
          currentPage={currentPage}
          totalItems={totalItems}
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
