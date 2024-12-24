export interface ToolbarButton {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger";
  icon?: React.ReactNode;
}

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey: keyof T;
  cell?: (props: { row: T }) => React.ReactNode;
  sortable?: boolean;
}

export interface SearchField {
  id: string;
  type: "text" | "select" | "daterange";
  label: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  width?: string;
  defaultValue?: string;
  showAllOption?: boolean;
  allOptionLabel?: string;
}

export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  enableSelection?: boolean;
  enableSearch?: boolean;
  enablePagination?: boolean;
  onRowSelect?: (selectedRows: TData[]) => void;
  searchFields?: SearchField[];
  onSearch?: (params: Record<string, string>) => void;
  onRowClick?: (row: TData) => void;
  toolbarButtons?: ToolbarButton[];
}
