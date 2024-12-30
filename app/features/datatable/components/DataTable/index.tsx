import { useState, useEffect } from "react";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableBody } from "./DataTableBody";
import { DataTableFooter } from "./DataTableFooter";
import { DataTableToolbar } from "./DataTableToolbar";
import { DataTableProps } from "../../types/datatable";
import { Widget } from "~/shared/ui/widgets/widget";
import { DataTableSearch } from "./DataTableSearch";

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  searchFields,
  onSearch,
  enableSelection = false,
  enableSearch = false,
  enablePagination = true,
  onRowSelect,
  toolbarButtons,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const allSelected =
    enableSelection && filteredData.length > 0 && selectedRows.length === filteredData.length;
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = enablePagination
    ? filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : filteredData;

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <>
      {enableSearch && searchFields && (
        <DataTableSearch fields={searchFields} onSearch={onSearch!} />
      )}
      <Widget>
        <div className="w-full space-y-4">
          {enablePagination && (
            <DataTableToolbar
              totalItems={filteredData.length}
              pageSize={pageSize}
              onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setCurrentPage(1);
              }}
              toolbarButtons={toolbarButtons}
            />
          )}

          <div className="relative rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full table-auto caption-bottom text-sm">
                <DataTableHeader
                  columns={columns}
                  selectable={enableSelection}
                  allSelected={allSelected}
                  onSelectAll={
                    enableSelection
                      ? (checked) => {
                          const newSelectedRows = checked ? filteredData : [];
                          setSelectedRows(newSelectedRows);
                          onRowSelect?.(newSelectedRows);
                        }
                      : undefined
                  }
                />
                <DataTableBody
                  data={paginatedData}
                  columns={columns}
                  selectable={enableSelection}
                  selectedRows={selectedRows}
                  pageSize={pageSize}
                  onRowClick={onRowClick}
                  currentPage={currentPage}
                  totalItems={filteredData.length}
                  onRowSelect={(rows) => {
                    setSelectedRows(rows);
                    onRowSelect?.(rows);
                  }}
                />
              </table>
            </div>
          </div>

          {enablePagination && (
            <DataTableFooter
              selectedCount={selectedRows.length}
              totalCount={filteredData.length}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              enableSelection={enableSelection}
            />
          )}
        </div>
      </Widget>
    </>
  );
}
