import { LeaveCompletedCardProps } from "./types";
import { DataTableCheckbox } from "~/features/datatable/components/DataTableCheckbox";
import { OptimizedImage } from "~/shared/ui/components/OptimizedImage";
import { MobileCard } from "~/features/datatable/components/MobileCard";
import { ApprovalStatusBadge } from "~/features/approval/components/ApprovalStatusBadge";

export function LeaveCompletedCard({ item }: LeaveCompletedCardProps) {
  return (
    <MobileCard
      item={item}
      renderHeader={(request) => (
        <div className="relative p-3 bg-white rounded-lg shadow-sm border border-gray-200">
          {/* 신청자 정보 */}
          <div className="flex items-center gap-2.5 mb-2.5">
            <OptimizedImage
              src={request.employeeProfileUrl}
              alt={request.employeeName}
              className="rounded-full ring-1 ring-gray-200"
              width={36}
              height={36}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="font-medium text-gray-900 truncate">{request.employeeName}</span>
                <ApprovalStatusBadge status={request.status} />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 bg-[#f5f9ff] text-[#5a8dd6] rounded text-xs font-medium">
                  {request.leaveType}
                </span>
                <span className="text-xs text-gray-600">
                  {request.startDate}
                  {request.startDate !== request.endDate && ` ~ ${request.endDate}`}
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <div>
                  <span className="text-gray-500">결재자</span>
                  <div className="font-medium text-gray-900 mt-0.5">{request.approverName}</div>
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <div>
                  <span className="text-gray-500">처리일</span>
                  <div className="font-medium text-gray-900 mt-0.5">{request.processedDate}</div>
                </div>
              </div>
              <div className="col-span-2 flex items-center gap-1.5">
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
                  <div className="font-medium text-gray-900 mt-0.5">{request.requestDate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
}
