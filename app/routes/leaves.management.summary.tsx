import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DataTable } from "~/features/datatable/components/DataTable";
import { LeaveEmployeeCard } from "~/features/leave/components/LeaveEmployeeCard";
import { annualColumns, searchFields } from "~/features/leave/LeaveTable/annualColumns";
import type { GetEmployeeAnnualParams } from "~/entities/leave/model";
import { getAnnualStatus } from "~/features/leave/api/leave.server";
import { useSubmit, useSearchParams, redirect } from "@remix-run/react";
// Loader
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  // page와 size가 없으면 기본값으로 리다이렉트
  const page = url.searchParams.get("page");
  const size = url.searchParams.get("size");

  if (!page || !size) {
    const newUrl = new URL(request.url);
    if (!page) newUrl.searchParams.set("page", "1");
    if (!size) newUrl.searchParams.set("size", "25");
    return redirect(newUrl.toString());
  }

  const params: GetEmployeeAnnualParams = {
    size: Number(size),
    page: Number(page),
    departmentId: url.searchParams.get("departmentId")
      ? Number(url.searchParams.get("departmentId"))
      : undefined,
    employeeName: url.searchParams.get("employeeName") || undefined,
  };

  try {
    const data = await getAnnualStatus(request, params);
    return json(data);
  } catch (error) {
    throw json({ message: "연차 현황을 불러오는데 실패했습니다." }, { status: 500 });
  }
}

export default function LeaveManagementSummaryPage() {
  const { totalCount, employees } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const submit = useSubmit();

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 25;

  function handleSearch(values: Record<string, string>) {
    const searchParams = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (value) searchParams.set(key, value.toString());
    });
    submit(searchParams);
  }

  return (
    <DataTable
      data={employees}
      columns={annualColumns}
      enableSearch
      searchFields={searchFields}
      onSearch={(values) => {
        const params = new URLSearchParams();
        params.set("page", "1");
        params.set("size", pageSize.toString());

        Object.entries(values).forEach(([key, value]) => {
          if (value) {
            params.set(key, value);
          }
        });

        // 검색 실행
        submit(params);
      }}
      mobileCard={LeaveEmployeeCard}
      pagination={{
        currentPage,
        pageSize,
        totalItems: totalCount,
        onPageChange: (page, size) => {
          const params = new URLSearchParams(searchParams);
          params.set("page", page.toString());
          params.set("size", size.toString());
          submit(params);
        },
      }}
    />
  );
}
