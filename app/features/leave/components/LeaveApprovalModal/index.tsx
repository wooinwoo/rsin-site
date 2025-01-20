import { useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import type { LeaveDocument, LeaveDetail } from "~/entities/leave/model";
import { useAuthStore } from "~/shared/store/auth";
import { Modal } from "~/shared/ui/components/Modal";
import { Button } from "~/shared/ui/components/Button";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
  DEPARTMENT_OPTIONS,
  POSITION_OPTIONS,
  LEAVE_TYPE_OPTIONS,
} from "~/shared/constants/options";
import { useToastStore } from "~/shared/store/toast";
import type { LeaveApprovalResponse } from "./types";

export interface LeaveApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  leaveDetail?: LeaveDetail;
  selectedLeave?: LeaveDocument | null;
  isLoading?: boolean;
}

export function LeaveApprovalModal({
  isOpen,
  onClose,
  onApprove,
  onReject,
  leaveDetail,
  selectedLeave,
  isLoading,
}: LeaveApprovalModalProps) {
  const fetcher = useFetcher<LeaveApprovalResponse>();
  const { showToast } = useToastStore();
  const isProcessing = fetcher.state !== "idle";
  const user = useAuthStore((state) => state.user);

  const isPendingApprover = selectedLeave?.approvals.some(
    (approval) => approval.approverId === user?.sub && approval.status === "pending"
  );

  useEffect(() => {
    if (!isOpen) {
      fetcher.data = undefined;
    }
  }, [isOpen]);

  const handleApprove = () => {
    if (!leaveDetail || !selectedLeave?.id) {
      showToast("처리할 휴가 정보가 없습니다.", "error");
      return;
    }

    // 내 승인 ID 찾기
    const myApproval = selectedLeave.approvals.find(
      (approval) => approval.approverId === user?.sub && approval.status === "pending"
    );
    if (!myApproval?.id) {
      showToast("승인 권한이 없습니다.", "error");
      return;
    }
    fetcher.submit(
      {
        status: "approve",
        approvalId: String(myApproval.id),
      },
      {
        method: "post",
        action: "/resources/leave-approval",
      }
    );
  };

  const handleReject = () => {
    if (!leaveDetail || !selectedLeave?.id) {
      showToast("처리할 휴가 정보가 없습니다.", "error");
      return;
    }

    // 내 승인 ID 찾기
    const myApproval = selectedLeave.approvals.find(
      (approval) => approval.approverId === user?.sub && approval.status === "pending"
    );

    if (!myApproval?.id) {
      showToast("승인 권한이 없습니다.", "error");
      return;
    }

    fetcher.submit(
      {
        status: "reject",
        approvalId: String(myApproval.id),
      },
      {
        method: "post",
        action: "/resources/leave-approval",
      }
    );
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (!fetcher.data.success || fetcher.data.error) {
        showToast(fetcher.data.error || "처리 중 오류가 발생했습니다.", "error");
      } else {
        const action = fetcher.data.status === "approve" ? "승인" : "반려";
        showToast(`휴가가 ${action}되었습니다.`, "success");
        onClose();
      }
    }
  }, [fetcher.state, fetcher.data, onClose, showToast]);

  if (isLoading || fetcher.state === "submitting") {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="휴가 승인">
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-500 border-t-transparent" />
        </div>
      </Modal>
    );
  }

  if (!leaveDetail) {
    return null;
  }
  const footer = user?.role === "admin" && isPendingApprover && (
    <div className="flex justify-end gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={handleReject}
        size="md"
        disabled={isProcessing}
      >
        {isProcessing ? "처리 중..." : "반려"}
      </Button>
      <Button type="button" variant="red" onClick={handleApprove} size="md" disabled={isProcessing}>
        {isProcessing ? "처리 중..." : "승인"}
      </Button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="휴가 승인" footer={footer}>
      {/* 신청자 정보 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">신청자</span>
          <div className="text-sm text-gray-600">
            {format(new Date(leaveDetail.submittedAt), "yyyy.MM.dd(EEE) HH:mm", { locale: ko })}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
            {leaveDetail.requester.thumbnailPath && (
              <img
                src={leaveDetail.requester.thumbnailPath}
                alt={leaveDetail.requester.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <div className="">{leaveDetail.requester.name}</div>
            <div className="text-sm text-gray-600">
              {
                DEPARTMENT_OPTIONS.find(
                  (option) => option.value === leaveDetail.requester.departmentId
                )?.label
              }
            </div>
          </div>
        </div>
      </div>
      {/* 승인 단계 */}
      <div className="mb-6">
        <div className="mb-3 text-sm font-medium">승인단계</div>
        <div className="space-y-2 mb-6">
          {leaveDetail.approvals.map((approval, index) => {
            const prevAllApproved = leaveDetail.approvals
              .slice(0, index)
              .every((a) => a.status === "approved");
            const isMyTurn = prevAllApproved && approval.status === "pending";

            const colorStyle = isMyTurn
              ? "border-blue-200 bg-blue-50 text-blue-500"
              : "border-gray-100 bg-gray-50 text-gray-400";

            const circleStyle = isMyTurn ? "bg-blue-500" : "bg-gray-300";

            return (
              <div
                key={index}
                className={`rounded-lg p-4 flex items-center justify-between border ${colorStyle}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm text-white ${circleStyle}`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    {approval.name}{" "}
                    {POSITION_OPTIONS.find((option) => option.value === approval.position)?.label}
                  </div>
                </div>
                <div className="text-sm">
                  {approval.status === "approved" ? "승인됨" : isMyTurn ? "승인대기" : "대기중"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* 상세 내용 */}
      <div className="mb-6">
        <div className="mb-3 text-sm font-medium">상세내용</div>
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="mb-2">
                {LEAVE_TYPE_OPTIONS.find((option) => option.value === leaveDetail.type)?.label}
              </div>
              <div className="text-sm text-gray-600">
                {format(new Date(leaveDetail.startedAt), "yyyy.MM.dd(EEE)", { locale: ko })}
                {leaveDetail.startedAt !== leaveDetail.endedAt &&
                  ` - ${format(new Date(leaveDetail.endedAt), "yyyy.MM.dd(EEE)", { locale: ko })}`}
              </div>
            </div>
            <div className="text-sm flex items-center gap-1">
              <span className="text-red-500 text-xl">
                {Math.ceil(
                  (new Date(leaveDetail.endedAt).getTime() -
                    new Date(leaveDetail.startedAt).getTime()) /
                    (1000 * 60 * 60 * 24) +
                    1
                )}
              </span>
              일
            </div>
          </div>
          <div className="pt-4 border-t">
            <div className="text-sm text-gray-600 whitespace-pre-wrap">{leaveDetail.reason}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
