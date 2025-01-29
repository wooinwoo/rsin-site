import { Toggle } from "~/shared/ui/components/Toggle";
import type { CalendarFilters } from "../../types/filters";

interface CalendarFiltersProps {
  filters: CalendarFilters;
  onFilterChange: (filterName: keyof CalendarFilters) => void;
}

export function CalendarFilters({ filters, onFilterChange }: CalendarFiltersProps) {
  return (
    <div className="mt-2 xl:mt-3">
      <div className="p-2 xl:p-4 space-y-3 xl:space-y-6">
        <div>
          <div className="hidden xl:block text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
            보기
          </div>

          <div className="space-y-0.5 xl:space-y-1">
            <button
              onClick={() => onFilterChange("showLeave")}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                filters.showLeave ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-sm border ${
                  filters.showLeave ? "bg-gray-900 border-gray-900" : "border-gray-300"
                }`}
              >
                {filters.showLeave && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 12 12">
                    <path
                      fill="currentColor"
                      d="M9.707 3.293a1 1 0 0 0-1.414 0L5 6.586 3.707 5.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 0-1.414z"
                    />
                  </svg>
                )}
              </div>
              연차
            </button>

            <button
              onClick={() => onFilterChange("showBirthday")}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                filters.showBirthday ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-sm border ${
                  filters.showBirthday ? "bg-gray-900 border-gray-900" : "border-gray-300"
                }`}
              >
                {filters.showBirthday && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 12 12">
                    <path
                      fill="currentColor"
                      d="M9.707 3.293a1 1 0 0 0-1.414 0L5 6.586 3.707 5.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 0-1.414z"
                    />
                  </svg>
                )}
              </div>
              생일
            </button>

            <button
              onClick={() => onFilterChange("showHoliday")}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                filters.showHoliday ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-sm border ${
                  filters.showHoliday ? "bg-gray-900 border-gray-900" : "border-gray-300"
                }`}
              >
                {filters.showHoliday && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 12 12">
                    <path
                      fill="currentColor"
                      d="M9.707 3.293a1 1 0 0 0-1.414 0L5 6.586 3.707 5.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 0-1.414z"
                    />
                  </svg>
                )}
              </div>
              공휴일
            </button>
          </div>
        </div>

        {/* 연차 상태 범례 - xl 이상에서만 표시 */}
        <div className="hidden xl:block">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
            연차 상태
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              <span className="text-sm text-gray-600">사용</span>
            </div>
            <div className="flex items-center gap-2 px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
              <span className="text-sm text-gray-600">사용예정</span>
            </div>
            <div className="flex items-center gap-2 px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="text-sm text-gray-600">승인대기</span>
            </div>
          </div>
        </div>

        {/* 모바일용 간단한 연차 상태 범례 */}
        <div className="xl:hidden flex gap-2 min-[350px]:gap-3 text-[10px] min-[350px]:text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-1.5 min-[350px]:w-2 h-1.5 min-[350px]:h-2 rounded-full bg-blue-400" />
            <span>사용</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 min-[350px]:w-2 h-1.5 min-[350px]:h-2 rounded-full bg-teal-400" />
            <span className="whitespace-nowrap">예정</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 min-[350px]:w-2 h-1.5 min-[350px]:h-2 rounded-full bg-red-400" />
            <span>대기</span>
          </div>
        </div>
      </div>
    </div>
  );
}
