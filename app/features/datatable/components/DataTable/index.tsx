// app/features/datatable/components/DataTable/index.tsx
import { useState } from "react";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableBody } from "./DataTableBody";
import { DataTableFooter } from "./DataTableFooter";
import { DataTableToolbar } from "./DataTableToolbar";
import { DataTableProps } from "../../types/datatable";

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  filterPlaceholder = "Filter...",
  selectable = true,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const allSelected = filteredData.length > 0 && selectedRows.length === filteredData.length;
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="w-full space-y-4">
      <DataTableToolbar
        totalItems={filteredData.length}
        pageSize={pageSize}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setCurrentPage(1);
        }}
      />

      <div className="relative rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <DataTableHeader
              columns={columns}
              selectable={selectable}
              allSelected={allSelected}
              onSelectAll={(checked) => {
                const newSelectedRows = checked ? filteredData : [];
                setSelectedRows(newSelectedRows);
                onRowSelect?.(newSelectedRows);
              }}
            />
            <DataTableBody
              data={paginatedData}
              columns={columns}
              selectable={selectable}
              selectedRows={selectedRows}
              onRowSelect={(rows) => {
                setSelectedRows(rows);
                onRowSelect?.(rows);
              }}
            />
          </table>
        </div>
      </div>

      <DataTableFooter
        selectedCount={selectedRows.length}
        totalCount={filteredData.length}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
