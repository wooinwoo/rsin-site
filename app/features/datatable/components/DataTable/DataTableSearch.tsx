import { useState } from "react";
import { SearchField } from "../../types/datatable";
import { TuneIcon } from "~/shared/ui/icons/TuneIcon";
import { DatePicker } from "~/shared/ui/components/DatePicker";

interface DataTableSearchProps {
  fields: SearchField[];
  onSearch: (params: Record<string, string>) => void;
}

export function DataTableSearch({ fields, onSearch }: DataTableSearchProps) {
  const [searchParams, setSearchParams] = useState<Record<string, string>>({});
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleValueChange = (fieldId: string, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (start && end) {
      setSearchParams((prev) => ({
        ...prev,
        startDate: start.toISOString().split("T")[0],
        endDate: end.toISOString().split("T")[0],
      }));
    }
  };

  const handleSearch = () => {
    onSearch(searchParams);
  };

  const handleReset = () => {
    const resetParams = Object.fromEntries(fields.map((field) => [field.id, ""]));
    setSearchParams(resetParams);
    setStartDate(null);
    setEndDate(null);
    onSearch(resetParams);
  };

  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-2">
        <TuneIcon className="w-6 h-6" />
        {fields.map((field) => (
          <div
            key={field.id}
            className="flex items-center bg-white rounded-md border pl-3 flex-1 sm:flex-none"
          >
            {field.label && (
              <>
                <label className="text-sm text-gray-600 whitespace-nowrap mr-2">
                  {field.label}
                </label>
                <div className="mx-2 h-4 w-px bg-gray-300" />
              </>
            )}
            {field.type === "select" ? (
              <select
                value={searchParams[field.id] || ""}
                onChange={(e) => handleValueChange(field.id, e.target.value)}
                className="h-9 rounded-md border  px-3 text-sm border-none focus:outline-none flex-1 sm:flex-none"
              >
                <option value="">전체</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === "daterange" ? (
              <DatePicker
                isRange
                onChange={(dates) => handleDateRangeChange(dates as [Date | null, Date | null])}
                className="min-w-[200px] border-none focus:outline-none focus:ring-0"
              />
            ) : (
              <input
                type="text"
                value={searchParams[field.id] || ""}
                onChange={(e) => handleValueChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className="h-9 rounded-md border px-3 text-sm border-none focus:outline-none flex-1 sm:flex-none "
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
            )}
          </div>
        ))}

        <div className="flex gap-2 flex-1 justify-end sm:flex-none">
          <button
            onClick={handleSearch}
            className="whitespace-nowrap h-9 px-4 rounded-md bg-blue-400 text-white text-sm hover:bg-blue-500"
          >
            검색
          </button>
          <button
            onClick={handleReset}
            className="whitespace-nowrap h-9 px-4 rounded-md border bg-white text-sm hover:bg-gray-50"
          >
            초기화
          </button>
        </div>
      </div>
    </div>
  );
}
