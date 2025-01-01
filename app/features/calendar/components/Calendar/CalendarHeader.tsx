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
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="w-32" />
      <div className="flex items-center gap-2">
        <button onClick={onPrevMonth} className="p-2 hover:bg-gray-200 rounded-full">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button onClick={onTodayClick} className="text-xl font-semibold hover:text-blue-600">
          {formatYearMonth(currentDate)}
        </button>
        <button onClick={onNextMonth} className="p-2 hover:bg-gray-200 rounded-full">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="w-32 flex justify-end">
        <div className="flex items-center gap-1 border rounded-lg p-1">
          <button
            onClick={() => onViewModeChange("calendar")}
            className={`p-2 rounded ${
              viewMode === "calendar" ? "bg-gray-200" : "hover:bg-gray-50"
            }`}
          >
            <CalendarIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-2 rounded ${viewMode === "list" ? "bg-gray-200" : "hover:bg-gray-50"}`}
          >
            <ListIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
