import { useSearchParams } from "@remix-run/react";
import { useState } from "react";
import { SearchField } from "../../types/datatable";
import { DatePicker } from "~/shared/ui/components/DatePicker";
import { Button } from "~/shared/ui/components/Button";

interface DataTableSearchProps {
  fields: SearchField[];
  onSearch: (params: Record<string, string>) => void;
}

export function DataTableSearch({ fields, onSearch }: DataTableSearchProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValues, setSearchValues] = useState<Record<string, string>>(() => {
    const values: Record<string, string> = {};
    fields.forEach((field) => {
      const value = searchParams.get(field.id);
      if (value) values[field.id] = value;
    });
    return values;
  });

  const handleValueChange = (fieldId: string, value: string) => {
    setSearchValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleDateRangeChange = (dates: [Date | null, Date | null] | null) => {
    if (!dates) {
      setSearchValues((prev) => {
        const newValues = { ...prev };
        delete newValues.startDate;
        delete newValues.endDate;
        return newValues;
      });
      return;
    }

    const [start, end] = dates;
    setSearchValues((prev) => ({
      ...prev,
      ...(start ? { startDate: start.toISOString().split("T")[0] } : {}),
      ...(end ? { endDate: end.toISOString().split("T")[0] } : {}),
    }));
  };

  const handleSearch = () => {
    const newParams = new URLSearchParams();
    Object.entries(searchValues).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
    });
    setSearchParams(newParams);
    onSearch(searchValues);
  };

  const handleReset = () => {
    setSearchValues({});
    setSearchParams(new URLSearchParams());
    onSearch({});
  };

  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-2">
        {fields.map((field) => (
          <div key={field.id} className="flex items-center bg-white rounded-md border pl-3">
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
                value={searchValues[field.id] || ""}
                onChange={(e) => handleValueChange(field.id, e.target.value)}
                className="h-9 rounded-md px-3 text-sm border-none focus:outline-none"
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
                value={
                  searchValues.startDate || searchValues.endDate
                    ? [
                        searchValues.startDate ? new Date(searchValues.startDate) : null,
                        searchValues.endDate ? new Date(searchValues.endDate) : null,
                      ]
                    : null
                }
                className="min-w-[200px] border-none focus:outline-none"
              />
            ) : (
              <input
                type="text"
                value={searchValues[field.id] || ""}
                onChange={(e) => handleValueChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className="h-9 rounded-md px-3 text-sm border-none focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            )}
          </div>
        ))}
        <div className="flex gap-2 ml-auto">
          <Button variant="primary" onClick={handleSearch}>
            검색
          </Button>
          <Button variant="white" onClick={handleReset}>
            초기화
          </Button>
        </div>
      </div>
    </div>
  );
}
