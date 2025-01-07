import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSearchParams, useSubmit } from "@remix-run/react";
import type { GetLeavesParams } from "~/entities/leave/model";
import { DataTable } from "~/features/datatable/components/DataTable";
import { getLeaves } from "~/features/leave/api/leave.server";
import { LeaveCompletedCard } from "~/features/leave/components/LeaveCompletedCard";
import { completedColumns, searchFields } from "~/features/leave/LeaveTable/completedColumns";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const size = url.searchParams.get("size");
  const scope = url.searchParams.get("scope");
  const type = url.searchParams.get("type");
  const applicant = url.searchParams.get("applicant");
  const startDate = url.searchParams.get("startDate");
  const endDate = url.searchParams.get("endDate");

  if (!page || !size || !scope || !type) {
    const newUrl = new URL(request.url);
    if (!page) newUrl.searchParams.set("page", "1");
    if (!size) newUrl.searchParams.set("size", "25");
    if (!scope) newUrl.searchParams.set("scope", "all");
    if (!type) newUrl.searchParams.set("type", "annual");
    newUrl.searchParams.append("approvalStatus", "approved");
    newUrl.searchParams.append("approvalStatus", "rejected");
    return redirect(newUrl.toString());
  }

  const params: GetLeavesParams = {
    size: Number(size),
    page: Number(page),
    scope: scope as "self" | "all",
    type: type as "annual" | "annual_am" | "annual_pm",
    ...(applicant ? { applicant } : {}),
    ...(startDate ? { startDate } : {}),
    ...(endDate ? { endDate } : {}),
  };

  try {
    const data = await getLeaves(request, params);
    console.log("##########");
    console.log(data.documents[0].approvals);
    return json(data);
  } catch (error) {
    throw json({ message: "휴가 신청 목록을 불러오는데 실패했습니다." }, { status: 500 });
  }
}

export default function LeaveApprovalCompletedPage() {
  const { documents, totalCount } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const submit = useSubmit();

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 25;

  return (
    <DataTable
      data={documents}
      columns={completedColumns}
      mobileCard={LeaveCompletedCard}
      searchFields={searchFields}
      onSearch={(values) => {
        const params = new URLSearchParams(searchParams);
        Object.entries(values).forEach(([key, value]) => {
          if (value) {
            params.set(key, value);
          } else {
            params.delete(key);
          }
        });
        params.set("page", "1");
        submit(params);
      }}
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
      enableSearch
    />
  );
}
