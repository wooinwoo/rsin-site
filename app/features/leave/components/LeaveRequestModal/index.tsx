import { Modal } from "~/shared/ui/components/Modal";
import { Select } from "~/shared/ui/components/Select";
import { DatePicker } from "~/shared/ui/components/DatePicker";
import { TextArea } from "~/shared/ui/components/TextArea";
import { Button } from "~/shared/ui/components/Button";
import { LeaveRequestModalProps } from "./types";
import { useState, useEffect } from "react";
import { LEAVE_TYPE_OPTIONS } from "~/shared/constants/options";
import { useFetcher } from "@remix-run/react";

export function LeaveRequestModal({ isOpen, onClose, initialData }: LeaveRequestModalProps) {
  const fetcher = useFetcher();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [leaveType, setLeaveType] = useState("full");
  const [reason, setReason] = useState("personal");
  const [detailReason, setDetailReason] = useState("");

  // initialData에서 직접 데이터 사용
  const remainingLeave = initialData?.annual?.[0];
  const approvers = initialData?.approverLines ?? [];

  const getProgressWidth = () => {
    if (!remainingLeave?.total) return "0%";
    return `${Math.min((remainingLeave.used / remainingLeave.total) * 100, 100)}%`;
  };

  useEffect(() => {
    if (!isOpen) {
      setDateRange([null, null]);
      setLeaveType("annual");
      setReason("personal");
      setDetailReason("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) return;

    const data = {
      document: {
        type: "leave" as const,
      },
      documentLeave: {
        type: leaveType,
        startedAt: startDate.toISOString().split("T")[0],
        endedAt: endDate.toISOString().split("T")[0],
        reason: reason === "other" ? detailReason : reason,
      },
    };

    fetcher.submit(
      { json: JSON.stringify(data) },
      {
        method: "post",
        action: "/resources/leave-modal",
      }
    );
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      onClose();
    }
  }, [fetcher.state, fetcher.data]);
  const leaveReasonOptions = [
    { value: "personal", label: "개인 사유" },
    { value: "family", label: "가족 행사" },
    { value: "health", label: "병가" },
    { value: "other", label: "기타" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="휴가 신청">
      <fetcher.Form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 bg-gray-50 border border-gray-300 rounded-lg">
          {!remainingLeave ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-red-500 border-t-transparent" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">남은 연차</span>
                <div className="text-sm space-x-1">
                  <span className="text-lg font-bold text-red-600">{remainingLeave.remain}</span>
                  <span className="text-gray-500">/ {remainingLeave.total}일</span>
                </div>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2.5">
                <div
                  className="bg-red-500 h-2.5 rounded-full transition-all duration-300"
                  style={{
                    width: getProgressWidth(),
                  }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-500 text-right">
                사용: {remainingLeave.used}일
              </div>
            </>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">
            유형 <span className="text-red-500">*</span>
          </label>
          <Select
            required
            options={LEAVE_TYPE_OPTIONS}
            value={leaveType}
            onChange={(value) => setLeaveType(value)}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">결재라인</label>
          {approvers.length > 0 ? (
            <div className="space-y-2">
              {approvers.map((approver, index) => (
                <div
                  key={approver.id}
                  className="rounded-lg p-3 flex items-center justify-between border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-red-500 text-white">
                      {index + 1}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">{approver.name}</span>
                      <span className="text-gray-500 ml-1">{approver.position}</span>
                      <span className="text-gray-400 mx-1">·</span>
                      <span className="text-gray-500">{approver.department.name}</span>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-gray-500">결재자</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500 p-3 border border-gray-200 rounded-lg">
              결재자 정보를 불러오는 중...
            </div>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">
            사용일 <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <DatePicker
              isRange={true}
              onChange={(dates) => setDateRange(dates as [Date | null, Date | null])}
              className=""
            />
            {dateRange[0] && dateRange[1] ? (
              <span className="text-sm text-gray-600 whitespace-nowrap">
                <span className="text-red-500 text-lg">
                  {Math.ceil(
                    (dateRange[1].getTime() - dateRange[0].getTime()) / (1000 * 60 * 60 * 24) + 1
                  )}
                </span>
                일
              </span>
            ) : (
              <span className="text-sm text-gray-600 whitespace-nowrap">
                <span className="text-red-500 text-lg">0</span>일
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            사유 <span className="text-red-500">*</span>
          </label>
          <Select
            required
            options={leaveReasonOptions}
            value={reason}
            onChange={(value) => {
              setReason(value);
              if (value !== "other") {
                setDetailReason("");
              }
            }}
          />
          <TextArea
            placeholder="상세 사유를 입력해주세요"
            required
            className="h-24"
            value={detailReason}
            onChange={(value) => setDetailReason(value)}
            disabled={reason !== "other"}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-gray-300">
          <Button type="submit" variant="red" size="md" disabled={fetcher.state !== "idle"}>
            {fetcher.state !== "idle" ? "처리 중..." : "신청"}
          </Button>
        </div>
      </fetcher.Form>
    </Modal>
  );
}
