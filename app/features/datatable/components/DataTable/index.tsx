import { useState } from "react";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableBody } from "./DataTableBody";
import { DataTableFooter } from "./DataTableFooter";
import { DataTableToolbar } from "./DataTableToolbar";
import { DataTableProps } from "../../types/datatable";
import { Widget } from "~/shared/ui/widgets/widget";
import { DataTableSearch } from "./DataTableSearch";
import { DataTableEmptyState } from "./DataTableEmptyState";
export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  mobileCard: MobileCardComponent,
  onRowClick,
  searchFields,
  onSearch,
  enableSelection = false,
  enableSearch = false,
  selectedRows = [],
  onSelectedRowsChange,
  pagination,
  onRowSelect,
  toolbarButtons,
}: DataTableProps<T>) {
  const allSelected = enableSelection && data.length > 0 && selectedRows.length === data.length;

  return (
    <>
      {enableSearch && searchFields && (
        <DataTableSearch fields={searchFields} onSearch={onSearch!} />
      )}
      <Widget>
        <div className="w-full space-y-4">
          {pagination && (
            <DataTableToolbar
              totalItems={pagination.totalItems}
              pageSize={pagination.pageSize}
              onPageSizeChange={(newSize) => {
                pagination.onPageChange(1, newSize);
              }}
              toolbarButtons={toolbarButtons}
            />
          )}

          {MobileCardComponent && (
            <div className="block sm:hidden">
              <div className="divide-y divide-gray-200">
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <MobileCardComponent
                      key={index}
                      item={item}
                      onClick={onRowClick}
                      {...(enableSelection
                        ? {
                            selected: selectedRows.some((row) => row.id === item.id),
                            onSelect: (selected) => {
                              const newSelectedRows = selected
                                ? [...selectedRows, item]
                                : selectedRows.filter((row) => row.id !== item.id);

                              onSelectedRowsChange?.(newSelectedRows);
                              onRowSelect?.(newSelectedRows);
                            },
                          }
                        : {})}
                    />
                  ))
                ) : (
                  <DataTableEmptyState
                    enableSelection={enableSelection}
                    columns={columns}
                    isMobile={true}
                  />
                )}
              </div>
            </div>
          )}

          <div className="hidden sm:block">
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
                            const newSelectedRows = checked ? data : [];
                            onSelectedRowsChange?.(newSelectedRows);
                            onRowSelect?.(newSelectedRows);
                          }
                        : undefined
                    }
                  />
                  {data.length > 0 ? (
                    <DataTableBody
                      data={data}
                      columns={columns}
                      selectable={enableSelection}
                      selectedRows={selectedRows}
                      onRowSelect={(rows) => {
                        onSelectedRowsChange?.(rows);
                        onRowSelect?.(rows);
                      }}
                      onRowClick={onRowClick}
                      currentPage={pagination?.currentPage || 1}
                      pageSize={pagination?.pageSize || data.length}
                      totalItems={pagination?.totalItems || data.length}
                    />
                  ) : (
                    <DataTableEmptyState enableSelection={enableSelection} columns={columns} />
                  )}
                </table>
              </div>
            </div>
          </div>

          {pagination && (
            <DataTableFooter
              selectedCount={selectedRows.length}
              totalCount={pagination.totalItems}
              currentPage={pagination.currentPage}
              totalPages={Math.ceil(pagination.totalItems / pagination.pageSize)}
              onPageChange={(page) => pagination.onPageChange(page, pagination.pageSize)}
              enableSelection={enableSelection}
            />
          )}
        </div>
      </Widget>
    </>
  );
}
