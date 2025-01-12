import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData, useSearchParams, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useAuthStore } from "~/shared/store/auth";
import type { LeaveDocument, GetLeaveDetailResponse } from "~/entities/leave/model";
import { DataTable } from "~/features/datatable/components/DataTable";
import { getLeaveDetail, getLeavesPending } from "~/features/leave/api/leave.server";
import { LeaveApprovalCard } from "~/features/leave/components/LeaveApprovalCard";
import { LeaveApprovalModal } from "~/features/leave/components/LeaveApprovalModal";
import { pendingColumns, searchFields } from "~/features/leave/LeaveTable/pendingColumns";
import { useToastStore } from "~/shared/store/toast";
import { CheckIcon } from "~/shared/ui/icons/CheckIcon";
import { getUserInfo } from "~/cookies.server";
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

interface BulkApprovalResponse {
  success: boolean;
  error?: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const user = await getUserInfo(request);
  const isAdmin = user?.role === "admin";
  const documentId = url.searchParams.get("documentId");
  const page = url.searchParams.get("page");
  const size = url.searchParams.get("size");
  const scope = url.searchParams.get("scope");
  const startDate = url.searchParams.get("startDate");
  const endDate = url.searchParams.get("endDate");
  const applicant = url.searchParams.get("applicant");
  if (documentId) {
    const detail = await getLeaveDetail(request, Number(documentId));
    return json({ type: "detail", detail });
  }

  if (!page || !size || (isAdmin && !scope)) {
    const newUrl = new URL(request.url);
    if (!page) newUrl.searchParams.set("page", "1");
    if (!size) newUrl.searchParams.set("size", "25");
    if (!scope && isAdmin) newUrl.searchParams.set("scope", "self");
    return redirect(newUrl.toString());
  }
  const params = new URLSearchParams();
  params.append("size", size);
  params.append("page", page);
  if (isAdmin && scope) params.append("scope", scope);
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);
  if (applicant) params.append("applicant", applicant);
  try {
    const data = await getLeavesPending(request, params);
    return json({ type: "list", totalCount: data.totalCount, documents: data.documents });
  } catch (error) {
    throw json({ message: "휴가 신청 목록을 불러오는데 실패했습니다." }, { status: 500 });
  }
}

export default function LeaveApprovalPage() {
  const loaderData = useLoaderData<LoaderData>(); // 테이블 목록 데이터
  const [searchParams] = useSearchParams();
  const user = useAuthStore((state) => state.user);
  const showToast = useToastStore((state) => state.showToast);
  const submit = useSubmit();

  const detailFetcher = useFetcher<LoaderData>(); // 상세정보 조회용
  const approvalFetcher = useFetcher<BulkApprovalResponse>(); // 승인/반려 처리용

  const [selectedLeave, setSelectedLeave] = useState<LeaveDocument | null>(null);
  const [selectedRows, setSelectedRows] = useState<LeaveDocument[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 25;

  const handleRowClick = (row: LeaveDocument) => {
    setSelectedLeave(row);
    detailFetcher.load(`/leaves/approval/pending?documentId=${row.id}`);
    setIsModalOpen(true);
  };

  const handleBulkApprove = () => {
    if (selectedRows.length === 0) {
      showToast("선택된 항목이 없습니다.", "error");
      return;
    }

    const approvalIds = selectedRows
      .map((row) => {
        const myApproval = row.approvals.find((approval) => approval.approverId === user?.sub);

        return myApproval?.id;
      })
      .filter((id): id is number => id !== undefined);

    if (approvalIds.length === 0) {
      showToast("승인 가능한 항목이 없습니다.", "error");
      return;
    }

    approvalFetcher.submit(
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

  // fetcher 상태 처리 추가
  useEffect(() => {
    if (approvalFetcher.state === "idle" && approvalFetcher.data) {
      if (!approvalFetcher.data.success || approvalFetcher.data.error) {
        showToast(approvalFetcher.data.error || "처리 중 오류가 발생했습니다.", "error");
      } else {
        showToast("선택한 휴가가 모두 승인되었습니다.", "success");
        setSelectedRows([]);
      }
    }
  }, [approvalFetcher.state, approvalFetcher.data]);

  const leaveDetail =
    detailFetcher.data?.type === "detail" ? detailFetcher.data.detail[0] : undefined;
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
        isLoading={detailFetcher.state === "loading"}
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
        enableSelection={user?.role === "admin"}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        toolbarButtons={
          user?.role === "admin"
            ? [
                {
                  label: `일괄승인 ${selectedRows.length > 0 ? `(${selectedRows.length})` : "(0)"}`,
                  onClick: handleBulkApprove,
                  variant: "danger",
                  icon: <CheckIcon />,
                },
              ]
            : []
        }
      />
    </>
  );
}
