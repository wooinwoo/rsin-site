import { formatYearMonth } from "../../utils/dateUtils";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function CalendarHeader({ currentDate, onPrevMonth, onNextMonth }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-center mb-4">
      <button onClick={onPrevMonth} className="p-2 hover:bg-gray-100 rounded-full">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
            className="text-gray-500"
          />
        </svg>
      </button>
      <h2 className="text-xl font-semibold">{formatYearMonth(currentDate)}</h2>
      <button onClick={onNextMonth} className="p-2 hover:bg-gray-100 rounded-full">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
            className="text-gray-500"
          />
        </svg>
      </button>
    </div>
  );
}
