export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey: keyof T;
  cell?: (props: { row: T }) => React.ReactNode;
  sortable?: boolean;
}

export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  filterPlaceholder?: string;
  selectable?: boolean;
  onRowSelect?: (selectedRows: TData[]) => void;
}
