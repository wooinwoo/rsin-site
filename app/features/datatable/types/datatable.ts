export interface ToolbarButton {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger";
  icon?: React.ReactNode;
}

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey: string;
  cell?: ({ row }: { row: T }) => React.ReactNode;
  sortable?: boolean;
  headerClassName?: string;
}

export interface SearchField {
  id: string;
  type: "text" | "select" | "daterange";
  label: string;
  placeholder?: string;
  options?: {
    value: number | string;
    label: string;
  }[];
  required?: boolean;
  width?: string;
  defaultValue?: string;
  showAllOption?: boolean;
  allOptionLabel?: string;
}

export interface ServerPaginationOptions {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number, size: number) => void;
}
export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  mobileCard?: React.ComponentType<{
    item: TData;
    onClick?: (row: TData) => void;
    onSelect?: (checked: boolean) => void;
    selected?: boolean;
  }>;
  enableSelection?: boolean;
  enableSearch?: boolean;
  pagination?: ServerPaginationOptions; // 변경
  onRowSelect?: (selectedRows: TData[]) => void;
  selectedRows?: TData[];
  onSelectedRowsChange?: (selectedRows: TData[]) => void;
  searchFields?: SearchField[];
  onSearch?: (params: Record<string, string>) => void;
  onRowClick?: (row: TData) => void;
  toolbarButtons?: ToolbarButton[];
}
