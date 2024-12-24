import { useSearchParams } from "@remix-run/react";
import { useState } from "react";
import { SearchField } from "../../types/datatable";
import { DatePicker } from "~/shared/ui/components/DatePicker";
import { Button } from "~/shared/ui/components/Button";
import { useEffect } from "react";

interface DataTableSearchProps {
  fields: SearchField[];
  onSearch: (params: Record<string, string>) => void;
}

export function DataTableSearch({ fields, onSearch }: DataTableSearchProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValues, setSearchValues] = useState<Record<string, string>>(() => {
    // 초기값 설정: URL 파라미터가 있으면 사용, 없으면 defaultValue 사용
    const initialValues: Record<string, string> = {};
    fields.forEach((field) => {
      const urlValue = searchParams.get(field.id);
      if (urlValue) {
        initialValues[field.id] = urlValue;
      } else if (field.defaultValue) {
        initialValues[field.id] = field.defaultValue;
      }
    });
    return initialValues;
  });

  // 컴포넌트 마운트 시 defaultValue가 있는 필드들의 값을 URL에 반영
  useEffect(() => {
    const hasAnySearchParam = fields.some((field) => searchParams.has(field.id));
    if (!hasAnySearchParam) {
      const newParams = new URLSearchParams();
      fields.forEach((field) => {
        if (field.defaultValue) {
          newParams.set(field.id, field.defaultValue);
        }
      });
      setSearchParams(newParams);
      onSearch(Object.fromEntries(newParams));
    }
  }, []);

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
    // 초기화 시 defaultValue가 있는 필드들의 값을 설정
    const defaultValues: Record<string, string> = {};
    const newParams = new URLSearchParams();

    fields.forEach((field) => {
      if (field.defaultValue) {
        defaultValues[field.id] = field.defaultValue;
        newParams.set(field.id, field.defaultValue);
      }
    });

    setSearchValues(defaultValues);
    setSearchParams(newParams);
    onSearch(defaultValues);
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
                value={searchValues[field.id] || field.defaultValue || ""}
                onChange={(e) => handleValueChange(field.id, e.target.value)}
                className="h-9 rounded-md px-3 text-sm border-none focus:outline-none"
              >
                {field.showAllOption !== false && (
                  <option value="">{field.allOptionLabel || "전체"}</option>
                )}
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
