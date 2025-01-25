import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData, useSearchParams, useSubmit } from "@remix-run/react";
import { useState } from "react";
import { DataTable } from "~/features/datatable/components/DataTable";
import { getLeaveDetail, getLeavesDone } from "~/features/leave/api/leave.server";
import { LeaveCompletedCard } from "~/features/leave/components/LeaveCompletedCard";
import { LeaveApprovalModal } from "~/features/leave/components/LeaveApprovalModal";
import { completedColumns, searchFields } from "~/features/leave/LeaveTable/completedColumns";
import type { LeaveDocument, GetLeaveDetailResponse } from "~/entities/leave/model";

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

  if (documentId) {
    const detail = await getLeaveDetail(request, Number(documentId));
    return json({ type: "detail", detail });
  }

  const page = url.searchParams.get("page") || "1";
  const size = url.searchParams.get("size") || "25";
  const type = url.searchParams.get("type");
  const applicant = url.searchParams.get("applicant");
  const startDate = url.searchParams.get("startDate");
  const endDate = url.searchParams.get("endDate");

  if (!page || !size) {
    const newUrl = new URL(request.url);
    if (!page) newUrl.searchParams.set("page", "1");
    if (!size) newUrl.searchParams.set("size", "25");
    return redirect(newUrl.toString());
  }

  const params = new URLSearchParams();
  params.append("size", size);
  params.append("page", page);
  if (type) params.append("type", type);
  if (applicant) params.append("applicant", applicant);
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  try {
    const data = await getLeavesDone(request, params);
    return json({ type: "list", totalCount: data.totalCount, documents: data.documents });
  } catch (error) {
    throw json({ message: "휴가 신청 목록을 불러오는데 실패했습니다." }, { status: 500 });
  }
}

export default function LeaveApprovalCompletedPage() {
  const loaderData = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const submit = useSubmit();
  const detailFetcher = useFetcher<LoaderData>();

  const [selectedLeave, setSelectedLeave] = useState<LeaveDocument | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 25;

  const handleRowClick = (row: LeaveDocument) => {
    setSelectedLeave(row);
    detailFetcher.load(`/leaves/approval/completed?documentId=${row.id}`);
    setIsModalOpen(true);
  };

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
        leaveDetail={leaveDetail}
        isLoading={detailFetcher.state === "loading"}
        selectedLeave={selectedLeave}
        readOnly
      />
      <DataTable
        data={loaderData.type === "list" ? loaderData.documents : []}
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
      />
    </>
  );
}
