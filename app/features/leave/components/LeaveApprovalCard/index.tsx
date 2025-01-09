import { MobileCard } from "~/features/datatable/components/MobileCard";
import { OptimizedImage } from "~/shared/ui/components/OptimizedImage";
import { DataTableCheckbox } from "~/features/datatable/components/DataTableCheckbox";
import type { LeaveApprovalCardProps } from "./types";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { LEAVE_TYPE_OPTIONS } from "~/shared/constants/options";

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
        <div className="relative p-3 bg-white rounded-lg shadow-sm border border-gray-200">
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
              src={request.requester.thumbnailPath || "/images/profile.jpg"}
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
          <div className="bg-gray-50 rounded p-2 border border-gray-200 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-gray-400"
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
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <div>
                  <span className="text-gray-500">결재자</span>
                  <div className="font-medium text-gray-900 mt-0.5">
                    {request.approvals.find((a: any) => a.status === "pending")?.name || "-"}
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
