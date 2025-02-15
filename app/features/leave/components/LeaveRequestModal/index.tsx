import { Modal } from "~/shared/ui/components/Modal";
import { Select } from "~/shared/ui/components/Select";
import { DatePicker } from "~/shared/ui/components/DatePicker";
import { Toggle } from "~/shared/ui/components/Toggle";
import { Button } from "~/shared/ui/components/Button";
import { LeaveRequestModalProps } from "./types";
import { useState, useEffect } from "react";
import { LEAVE_TYPE_OPTIONS } from "~/shared/constants/options";
import { useFetcher } from "@remix-run/react";
import { useToastStore } from "~/shared/store/toast";
import { POSITION_OPTIONS } from "~/shared/constants/options";
import type { LeaveModalResponse } from "~/routes/resources.leave-modal";

export function LeaveRequestModal({ isOpen, onClose, initialData }: LeaveRequestModalProps) {
  const { showToast } = useToastStore();
  const fetcher = useFetcher<LeaveModalResponse>();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [isRangeMode, setIsRangeMode] = useState(false);
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [leaveType, setLeaveType] = useState("annual");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const approvers = initialData?.approverLines ?? [];
  const remainingLeave = initialData?.annual;
  const hasNoLeave = Boolean(
    !remainingLeave || remainingLeave.granted <= remainingLeave.used + remainingLeave.pending
  );

  useEffect(() => {
    if (!isOpen) {
      setDateRange([null, null]);
      setLeaveType("annual");
      fetcher.data = undefined;
      setIsRangeMode(false);
    }
  }, [isOpen]);

  const getWorkDays = (start: Date, end: Date) => {
    let count = 0;
    const current = new Date(start);

    while (current <= end) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
    return count;
  };

  const getProgressWidth = () => {
    if (!remainingLeave?.granted) return "0%";
    const usedPercentage = (remainingLeave.used / remainingLeave.granted) * 100;
    return `${Math.min(usedPercentage, 100)}%`;
  };

  const handleLeaveTypeChange = (value: string) => {
    setLeaveType(value);
    if (value === "annual_am" || value === "annual_pm") {
      setIsRangeMode(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (isRangeMode && (!startDate || !endDate)) {
      showToast("사용일을 선택해주세요.", "error");
      return;
    }
    if (!isRangeMode && !singleDate) {
      showToast("사용일을 선택해주세요.", "error");
      return;
    }

    setIsSubmitting(true);

    // 날짜를 UTC 기준으로 조정
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const data = {
      document: {
        type: "leave" as const,
      },
      documentLeave: {
        type: leaveType,
        startedAt: isRangeMode ? formatDate(startDate!) : formatDate(singleDate!),
        endedAt: isRangeMode ? formatDate(endDate!) : formatDate(singleDate!),
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
      setIsSubmitting(false);
      if (fetcher.data.success) {
        showToast("휴가가 성공적으로 신청되었습니다.", "success");
        onClose();
      } else {
        showToast(fetcher.data.error || "휴가 신청에 실패했습니다.", "error");
      }
    }
  }, [fetcher.state, fetcher.data]);

  const formId = "leave-request-form";

  const footer = (
    <div className="flex justify-end">
      <Button
        type="submit"
        variant="red"
        size="md"
        disabled={isSubmitting || fetcher.state !== "idle" || hasNoLeave}
        form={formId}
      >
        {isSubmitting || fetcher.state !== "idle" ? "처리 중..." : "신청"}
      </Button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="휴가 신청" footer={footer}>
      <fetcher.Form onSubmit={handleSubmit} className="space-y-8" id={formId}>
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
                  <span className="text-gray-500">/ {remainingLeave.granted}일</span>
                </div>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2.5">
                <div
                  className="bg-red-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: getProgressWidth() }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-500 text-right space-x-2">
                <span>사용: {remainingLeave.used}일</span>
                {remainingLeave.pending > 0 && (
                  <span className="text-yellow-600">· 대기: {remainingLeave.pending}일</span>
                )}
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
            onChange={handleLeaveTypeChange}
            disabled={hasNoLeave}
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">
              사용일 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-gray-800">기간</span>
              <Toggle
                label=""
                isOn={isRangeMode}
                onToggle={() => setIsRangeMode(!isRangeMode)}
                activeColor="bg-red-500"
                disabled={leaveType === "annual_am" || leaveType === "annual_pm"}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <DatePicker
              isRange={isRangeMode}
              onChange={
                isRangeMode
                  ? (dates) => setDateRange(dates as [Date | null, Date | null])
                  : (date) => setSingleDate(date as Date)
              }
              value={isRangeMode ? dateRange : singleDate}
              disabled={hasNoLeave}
              minDate={new Date()}
              filterDate={(date) => {
                const day = date.getDay();
                return day !== 0 && day !== 6;
              }}
              excludeWeekends
            />
            <span className="text-sm text-gray-600 whitespace-nowrap">
              <span className="text-red-500 text-lg">
                {isRangeMode
                  ? dateRange[0] && dateRange[1]
                    ? getWorkDays(dateRange[0], dateRange[1])
                    : 0
                  : singleDate
                  ? 1
                  : 0}
              </span>
              일
            </span>
          </div>
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
                    {approvers.length > 1 && (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-red-500 text-white">
                        {index + 1}
                      </div>
                    )}
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">{approver.name}</span>
                      <span className="text-gray-500 ml-1">
                        {
                          POSITION_OPTIONS.find((option) => option.value === approver.position)
                            ?.label
                        }
                      </span>
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
      </fetcher.Form>
    </Modal>
  );
}
