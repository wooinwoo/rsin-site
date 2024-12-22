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
}

export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  enableSelection?: boolean; // selectable을 enableSelection으로 변경
  enableSearch?: boolean; // 검색 기능도 선택적으로 사용할 수 있도록
  enablePagination?: boolean; // 페이지네이션도 선택적으로
  onRowSelect?: (selectedRows: TData[]) => void;
  searchFields?: SearchField[];
  onSearch?: (params: Record<string, string>) => void;
  toolbarButtons?: ToolbarButton[]; // 툴바 버
}
