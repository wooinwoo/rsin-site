import { ChevronLeftIcon, ChevronRightIcon } from "~/shared/ui/icons";
interface DataTableFooterProps {
  selectedCount: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  enableSelection: boolean;
}

export function DataTableFooter({
  selectedCount,
  totalCount,
  currentPage,
  totalPages,
  onPageChange,
  enableSelection,
}: DataTableFooterProps) {
  return (
    <div
      className={`flex flex-col 2xs:flex-row items-start 2xs:items-center ${
        enableSelection ? "justify-between" : "justify-end"
      } gap-4 py-4`}
    >
      {enableSelection && (
        <div className="text-sm text-gray-600">
          {selectedCount} of {totalCount} row(s) selected.
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-9 w-9 rounded-md border border-gray-300 flex items-center justify-center text-sm disabled:opacity-50 hover:bg-gray-50"
          aria-label="Previous page"
        >
          <ChevronLeftIcon />
        </button>

        <div className="hidden sm:flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`
                h-9 min-w-[36px] rounded-md px-3 text-sm
                ${page === currentPage ? "bg-gray-800 text-white" : "border hover:bg-gray-50"}
              `}
            >
              {page}
            </button>
          ))}
        </div>

        <div className="sm:hidden flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {currentPage} / {totalPages}
          </span>
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-9 w-9 rounded-md border flex items-center justify-center text-sm disabled:opacity-50 hover:bg-gray-50"
          aria-label="Next page"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
