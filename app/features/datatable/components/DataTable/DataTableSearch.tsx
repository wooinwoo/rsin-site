import { useSearchParams } from "@remix-run/react";
import { useState } from "react";
import { SearchField } from "../../types/datatable";
import { DatePicker } from "~/shared/ui/components/DatePicker";
import { Button } from "~/shared/ui/components/Button";
import { useEffect } from "react";
import { SearchIcon, ResetIcon } from "~/shared/ui/icons";
interface DataTableSearchProps {
  fields: SearchField[];
  onSearch: (params: Record<string, string>) => void;
}

export function DataTableSearch({ fields, onSearch }: DataTableSearchProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValues, setSearchValues] = useState<Record<string, string>>(() => {
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

    newParams.set("page", "1");
    newParams.set("size", "25");

    Object.entries(searchValues).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      }
    });

    onSearch(searchValues);
  };
  const handleReset = () => {
    const defaultValues: Record<string, string> = {};
    const newParams = new URLSearchParams();

    fields.forEach((field) => {
      if (field.defaultValue) {
        defaultValues[field.id] = field.defaultValue;
        newParams.set(field.id, field.defaultValue);
      }
    });

    setSearchValues(defaultValues);
    setSearchParams(newParams, { replace: true });
    onSearch(defaultValues);
  };

  const renderField = (field: SearchField) => {
    if (field.type === "select") {
      return (
        <select
          value={searchValues[field.id] || field.defaultValue || ""}
          onChange={(e) => handleValueChange(field.id, e.target.value)}
          className="w-full h-9 rounded-md px-3 text-sm border-none focus:outline-none bg-white"
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
      );
    }

    if (field.type === "daterange") {
      return (
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
          className="w-full border-none focus:outline-none bg-white"
        />
      );
    }

    return (
      <input
        type="text"
        value={searchValues[field.id] || ""}
        onChange={(e) => handleValueChange(field.id, e.target.value)}
        placeholder={field.placeholder}
        className="w-full h-9 rounded-md px-3 text-sm border-none focus:outline-none bg-white"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
    );
  };

  return (
    <div className="mb-4">
      {/* PC 레이아웃 */}
      <div className="hidden lg:flex lg:flex-wrap lg:items-center lg:gap-2">
        {fields.map((field) => (
          <div
            key={field.id}
            className="flex items-center bg-white rounded-md border border-gray-300 pl-3"
          >
            {field.label && (
              <>
                <label className="text-sm text-gray-600 whitespace-nowrap mr-2">
                  {field.label}
                </label>
                <div className="mx-2 h-4 w-px bg-gray-300" />
              </>
            )}
            {renderField(field)}
          </div>
        ))}

        <div className="flex justify-center gap-2">
          <Button variant="white" onClick={handleReset} className="flex items-center" size="md">
            <ResetIcon className="w-4 h-4 mr-2" />
            초기화
          </Button>
          <Button variant="primary" onClick={handleSearch} className="flex items-center" size="md">
            <SearchIcon className="w-4 h-4 mr-2" />
            검색
          </Button>
        </div>
      </div>

      {/* 태블릿/모바일 레이아웃 */}
      <div className="lg:hidden">
        <div className="border border-gray-300  rounded-lg p-4 flex flex-col gap-4 bg-white">
          <div className="grid grid-cols-1 gap-2">
            {fields.map((field) => (
              <div key={field.id} className="flex items-center gap-4">
                {field.label && (
                  <label className="text-sm text-gray-700 font-normal w-20 shrink-0">
                    {field.label}
                  </label>
                )}
                <div className="bg-white rounded-md border border-gray-300 flex-1">
                  {renderField(field)}
                </div>
              </div>
            ))}
          </div>
          <div className=" border-t border-gray-300" />
          <div className="flex justify-center gap-2">
            <div className="flex justify-center gap-2">
              <Button variant="white" onClick={handleReset} className="flex items-center" size="lg">
                <ResetIcon className="w-4 h-4 mr-2" />
                초기화
              </Button>
              <Button
                variant="primary"
                onClick={handleSearch}
                className="flex items-center"
                size="lg"
              >
                <SearchIcon className="w-4 h-4 mr-2" />
                검색
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
