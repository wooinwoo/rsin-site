import { MobileCard } from "~/features/datatable/components/MobileCard";
import { OptimizedImage } from "~/shared/ui/components/OptimizedImage";
import { DataTableCheckbox } from "~/features/datatable/components/DataTableCheckbox";
import type { LeaveApprovalCardProps } from "./types";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { LEAVE_TYPE_OPTIONS } from "~/shared/constants/options";
import { getFullImageUrl } from "~/shared/utils/imges";

export function LeaveApprovalCard({
  item,
  onClick,
  onSelect,
  selected = false,
}: LeaveApprovalCardProps) {
  return (
    <MobileCard
      item={item}
      renderHeader={(request) => (
        <div className="relative p-3 bg-white rounded-lg shadow-sm border border-gray-200 w-full max-w-none">
          {/* 체크박스 */}
          {onSelect && (
            <div className="absolute left-3 top-[27%] -translate-y-1/2">
              <DataTableCheckbox checked={selected} onChange={(checked) => onSelect(checked)} />
            </div>
          )}

          {/* 프로필 및 기본 정보 */}
          <div
            className={`flex items-center gap-2.5 mb-2.5 ${onSelect ? "pl-7" : ""}`}
            onClick={() => onClick?.(request)}
          >
            <OptimizedImage
              src={getFullImageUrl(request.requester.thumbnailPath)}
              alt={request.requester.name}
              className="rounded-full ring-1 ring-gray-200"
              width={36}
              height={36}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="font-medium text-gray-900 truncate">{request.requester.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 bg-[#f5f9ff] text-[#5a8dd6] rounded text-xs font-medium whitespace-nowrap">
                  {LEAVE_TYPE_OPTIONS.find((option) => option.value === request.leave.type)?.label}
                </span>
                <span className="text-xs text-gray-600">
                  {format(new Date(request.leave.startedAt), "yyyy.MM.dd(EEE)", { locale: ko })}
                  {request.leave.startedAt !== request.leave.endedAt &&
                    ` ~ ${format(new Date(request.leave.endedAt), "yyyy.MM.dd(EEE)", {
                      locale: ko,
                    })}`}
                </span>
              </div>
            </div>
          </div>

          {/* 결재 정보 */}
          <div className="bg-gray-50 rounded p-2 border border-gray-200">
            <div className="grid grid-cols-2 gap-3">
              {/* 신청일 */}
              <div className="flex items-center gap-1.5 text-xs">
                <svg
                  className="w-3.5 h-3.5 text-gray-400 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <span className="text-gray-500">신청일</span>
                  <div className="font-medium text-gray-900 mt-0.5">
                    {format(new Date(request.submittedAt), "yyyy.MM.dd", { locale: ko })}
                  </div>
                </div>
              </div>

              {/* 결재 현황 */}
              <div className="flex items-center gap-1.5 text-xs">
                <svg
                  className="w-3.5 h-3.5 text-gray-400 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <span className="text-gray-500">결재현황</span>
                  <div className="font-medium text-gray-900 mt-0.5 flex items-center gap-1">
                    <span>
                      {request.approvals.find((a: any) => a.status === "pending")?.name || "-"}
                    </span>
                    {request.approvals.length > 1 && (
                      <span className="text-gray-400 text-[10px]">
                        외 {request.approvals.length - 1}명
                      </span>
                    )}
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        request.approvals.some((a: any) => a.status === "rejected")
                          ? "bg-red-500"
                          : request.approvals.every((a: any) => a.status === "approved")
                          ? "bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
}
