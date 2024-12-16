import { Toggle } from "~/shared/ui/components/Toggle";
import type { CalendarFilters } from "../../types/filters";

interface CalendarFiltersProps {
  filters: CalendarFilters;
  onFilterChange: (filterName: keyof CalendarFilters) => void;
}

export function CalendarFilters({ filters, onFilterChange }: CalendarFiltersProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Toggle
        label="사용"
        isOn={filters.showUsed}
        onToggle={() => onFilterChange("showUsed")}
        activeColor="bg-blue-500"
      />
      <Toggle
        label="사용예정"
        isOn={filters.showScheduled}
        onToggle={() => onFilterChange("showScheduled")}
        activeColor="bg-teal-500"
      />
      <Toggle
        label="승인대기"
        isOn={filters.showPending}
        onToggle={() => onFilterChange("showPending")}
        activeColor="bg-red-500"
      />
    </div>
  );
}
