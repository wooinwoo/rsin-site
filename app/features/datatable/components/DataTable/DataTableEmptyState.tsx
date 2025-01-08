const EmptyStateContent = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <svg
      className="h-12 w-12 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
    <h3 className="mt-2 text-sm font-medium text-gray-900">데이터가 없습니다</h3>
    <p className="mt-1 text-sm text-gray-500">검색 결과가 없거나 표시할 데이터가 없습니다.</p>
  </div>
);

export const DataTableEmptyState = ({
  enableSelection,
  columns,
  isMobile = false,
}: {
  enableSelection: boolean;
  columns: any[];
  isMobile?: boolean;
}) =>
  isMobile ? (
    <div className="py-12 px-4">
      <EmptyStateContent />
    </div>
  ) : (
    <tr>
      <td colSpan={enableSelection ? columns.length + 2 : columns.length + 1} className="h-32">
        <EmptyStateContent />
      </td>
    </tr>
  );
