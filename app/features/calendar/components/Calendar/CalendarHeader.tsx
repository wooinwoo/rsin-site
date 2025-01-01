import { formatYearMonth } from "../../utils/dateUtils";
import { ViewMode } from "../../types/calendar";
import { CalendarIcon } from "~/shared/ui/icons/CalendarIcon";
import { ListIcon } from "~/shared/ui/icons";

interface CalendarHeaderProps {
  currentDate: Date;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onTodayClick: () => void;
}

export function CalendarHeader({
  currentDate,
  viewMode,
  onViewModeChange,
  onPrevMonth,
  onNextMonth,
  onTodayClick,
}: CalendarHeaderProps) {
  const yearMonth = formatYearMonth(currentDate);

  return (
    <div className="flex gap-4 my-4  items-center  justify-between">
      <div className="hidden 2xs:block w-16"></div>
      {/* 날짜 네비게이션 */}
      <div className="flex items-center justify-center gap-1">
        <button onClick={onPrevMonth} className="p-1.5 hover:bg-gray-200 rounded-full shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="flex items-center">
          <button
            onClick={onTodayClick}
            className="text-base sm:text-lg font-medium hover:text-blue-600 px-1 whitespace-nowrap"
          >
            {yearMonth}
          </button>
        </div>
        <button onClick={onNextMonth} className="p-1.5 hover:bg-gray-200 rounded-full shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 뷰 모드 토글 */}
      <div className="flex justify-center ">
        <div className="flex items-center gap-1 border rounded-lg p-0.5">
          <button
            onClick={() => onViewModeChange("calendar")}
            className={`p-1.5 rounded ${
              viewMode === "calendar" ? "bg-gray-200" : "hover:bg-gray-50"
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-1.5 rounded ${viewMode === "list" ? "bg-gray-200" : "hover:bg-gray-50"}`}
          >
            <ListIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
