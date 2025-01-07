import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData, useSearchParams, useSubmit } from "@remix-run/react";
import { useState } from "react";
import type {
  GetLeavesParams,
  LeaveDocument,
  GetLeaveDetailResponse,
} from "~/entities/leave/model";
import { DataTable } from "~/features/datatable/components/DataTable";
import { getLeaveDetail, getLeaves } from "~/features/leave/api/leave.server";
import { LeaveApprovalCard } from "~/features/leave/components/LeaveApprovalCard";
import { LeaveApprovalModal } from "~/features/leave/components/LeaveApprovalModal";
import { pendingColumns, searchFields } from "~/features/leave/LeaveTable/pendingColumns";
import { CheckIcon } from "~/shared/ui/icons/CheckIcon";
type LoaderData =
  | {
      type: "list";
      totalCount: number;
      documents: LeaveDocument[];
    }
  | {
      type: "detail";
      detail: GetLeaveDetailResponse;
    };
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const documentId = url.searchParams.get("documentId");
  const page = url.searchParams.get("page");
  const size = url.searchParams.get("size");
  const scope = url.searchParams.get("scope");
  const type = url.searchParams.get("type");

  if (documentId) {
    // 상세 정보 조회
    const detail = await getLeaveDetail(request, Number(documentId));
    return json({ type: "detail", detail });
  }

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
    return json({ type: "list", totalCount: data.totalCount, documents: data.documents });
  } catch (error) {
    throw json({ message: "휴가 신청 목록을 불러오는데 실패했습니다." }, { status: 500 });
  }
}

export default function LeaveApprovalPage() {
  const loaderData = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const submit = useSubmit();
  const [selectedLeave, setSelectedLeave] = useState<LeaveDocument | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 25;
  const fetcher = useFetcher<LoaderData>();

  const handleRowClick = (row: LeaveDocument) => {
    setSelectedLeave(row);
    // 상세 정보 조회
    fetcher.load(`/leaves/approval/pending?documentId=${row.id}`);
    setIsModalOpen(true);
  };

  const leaveDetail = fetcher.data?.type === "detail" ? fetcher.data.detail[0] : undefined;

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
        leaveDetail={leaveDetail}
        isLoading={fetcher.state === "loading"}
        selectedLeave={selectedLeave}
      />
      <DataTable
        data={loaderData.type === "list" ? loaderData.documents : []}
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
          totalItems: loaderData.type === "list" ? loaderData.totalCount : 0,
          onPageChange: (page, size) => {
            const params = new URLSearchParams(searchParams);
            params.set("page", page.toString());
            params.set("size", size.toString());
            submit(params);
          },
        }}
        onRowClick={(row) => {
          handleRowClick(row);
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
