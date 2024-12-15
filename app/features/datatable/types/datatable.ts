export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey: keyof T;
  cell?: (props: { row: T }) => React.ReactNode;
  sortable?: boolean;
}

export interface SearchField {
  id: string;
  type: "select" | "input";
  label: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  width?: string;
}

export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  selectable?: boolean;
  onRowSelect?: (selectedRows: TData[]) => void;
  searchFields?: SearchField[];
  onSearch?: (params: Record<string, string>) => void;
}
