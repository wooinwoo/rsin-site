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
    approvalStatus: "pending",
  };

  try {
    const data = await getLeaves(request, params);
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
  const [selectedRows, setSelectedRows] = useState<LeaveDocument[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 25;
  const fetcher = useFetcher<LoaderData>();

  const handleRowClick = (row: LeaveDocument) => {
    setSelectedLeave(row);
    fetcher.load(`/leaves/approval/pending?documentId=${row.id}`);
    setIsModalOpen(true);
  };

  const handleBulkApprove = () => {
    if (selectedRows.length === 0) {
      alert("선택된 항목이 없습니다.");
      return;
    }

    // 선택된 문서의 ID를 사용
    const approvalIds = selectedRows
      .map((row) => row.id) // document의 id를 사용
      .filter((id): id is number => id !== undefined);

    if (approvalIds.length === 0) {
      alert("승인 가능한 항목이 없습니다.");
      return;
    }

    fetcher.submit(
      {
        status: "approved",
        approvalIds: JSON.stringify(approvalIds),
      },
      {
        method: "post",
        action: "/resources/leave-approval",
      }
    );
  };

  const leaveDetail = fetcher.data?.type === "detail" ? fetcher.data.detail[0] : undefined;

  return (
    <>
      <LeaveApprovalModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedLeave(null);
        }}
        onApprove={() => {
          setIsModalOpen(false);
          setSelectedLeave(null);
        }}
        onReject={() => {
          setIsModalOpen(false);
          setSelectedLeave(null);
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
          params.set("page", "1");
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
        onRowClick={handleRowClick}
        enableSearch
        enableSelection
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        toolbarButtons={[
          {
            label: `일괄승인 ${selectedRows.length > 0 ? `(${selectedRows.length})` : ""}`,
            onClick: handleBulkApprove,
            variant: "danger",
            icon: <CheckIcon />,
          },
        ]}
      />
    </>
  );
}
