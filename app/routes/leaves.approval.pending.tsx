import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSearchParams, useSubmit } from "@remix-run/react";
import { useState } from "react";
import type { GetLeavesParams, LeaveDocument } from "~/entities/leave/model";
import { DataTable } from "~/features/datatable/components/DataTable";
import { getLeaves } from "~/features/leave/api/leave.server";
import { LeaveApprovalCard } from "~/features/leave/components/LeaveApprovalCard";
import { LeaveApprovalModal } from "~/features/leave/components/LeaveApprovalModal";
import { pendingColumns, searchFields } from "~/features/leave/LeaveTable/pendingColumns";
import { CheckIcon } from "~/shared/ui/icons/CheckIcon";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const size = url.searchParams.get("size");
  const scope = url.searchParams.get("scope");
  const type = url.searchParams.get("type");

  if (!page || !size || !scope || !type) {
    const newUrl = new URL(request.url);
    if (!page) newUrl.searchParams.set("page", "1");
    if (!size) newUrl.searchParams.set("size", "25");
    if (!scope) newUrl.searchParams.set("scope", "self");
    if (!type) newUrl.searchParams.set("type", "annual");
    newUrl.searchParams.set("approvalStatus", "pending");
    return redirect(newUrl.toString());
  }

  const params: GetLeavesParams = {
    size: Number(size),
    page: Number(page),
    scope: scope as "self" | "all",
    type: type as "annual" | "annual_am" | "annual_pm",
  };

  try {
    const data = await getLeaves(request, params);
    console.log("data", data.documents);
    return json(data);
  } catch (error) {
    throw json({ message: "휴가 신청 목록을 불러오는데 실패했습니다." }, { status: 500 });
  }
}

export default function LeaveApprovalPage() {
  const { totalCount, documents } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const submit = useSubmit();
  const [selectedLeave, setSelectedLeave] = useState<LeaveDocument | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 25;

  return (
    <>
      <LeaveApprovalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApprove={() => {
          setIsModalOpen(false);
        }}
        onReject={() => {
          setIsModalOpen(false);
        }}
      />
      <DataTable
        data={documents}
        columns={pendingColumns}
        mobileCard={LeaveApprovalCard}
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
          params.set("page", "1"); // 검색 시 첫 페이지로
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
        onRowClick={(row) => {
          setSelectedLeave(row);
          setIsModalOpen(true);
        }}
        enableSearch
        enableSelection
        toolbarButtons={[
          {
            label: "일괄승인",
            onClick: () => {},
            variant: "danger",
            icon: <CheckIcon />,
          },
        ]}
      />
    </>
  );
}
