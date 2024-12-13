// app/features/datatable/components/DataTable/DataTableToolbar.tsx
interface DataTableToolbarProps {
  totalItems: number;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

export function DataTableToolbar({
  totalItems,
  pageSize,
  onPageSizeChange,
}: DataTableToolbarProps) {
  return (
    <div className="flex flex-col 2xs:flex-row items-start 2xs:items-center justify-between gap-4 py-4">
      <div className="text-sm text-gray-500">총 {totalItems}건</div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">페이지당 행:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="h-8 rounded-md border px-2 text-sm"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
}
