import { useState } from "react";
import { ToolbarButton } from "~/features/datatable/types/datatable";
interface DataTableToolbarProps {
  totalItems: number;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  onSearch?: (params: SearchParams) => void;
  toolbarButtons?: ToolbarButton[];
}
interface SearchParams {
  type: string;
  keyword: string;
}

export function DataTableToolbar({
  totalItems,
  pageSize,
  onPageSizeChange,
  onSearch,
  toolbarButtons,
}: DataTableToolbarProps) {
  const [searchType, setSearchType] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = () => {
    onSearch?.({ type: searchType, keyword: searchKeyword });
  };

  const handleReset = () => {
    setSearchType("all");
    setSearchKeyword("");
    onSearch?.({ type: "all", keyword: "" });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col 2xs:flex-row items-start 2xs:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">총 {totalItems}건</div>
          {/* 툴바 버튼 렌더링 */}
          {toolbarButtons && (
            <div className="flex items-center gap-2">
              {toolbarButtons.map((button, index) => (
                <button
                  key={index}
                  onClick={button.onClick}
                  className={`
                    inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md
                    ${
                      button.variant === "primary"
                        ? "border-[1px] border-blue-500 text-blue-500 bg-white hover:bg-blue-50"
                        : button.variant === "secondary"
                        ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                        : button.variant === "danger" // 새로운 danger variant 추가
                        ? "border-[1px] border-red-500 text-red-500 bg-white hover:bg-red-50"
                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  {button.icon && <span>{button.icon}</span>}
                  {button.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">행 수:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-8 rounded-md border px-2 text-sm bg-white"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
}
