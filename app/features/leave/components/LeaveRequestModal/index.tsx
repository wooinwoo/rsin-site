import { Modal } from "~/shared/ui/components/Modal";
import { Select } from "~/shared/ui/components/Select";
import { DatePicker } from "~/shared/ui/components/DatePicker";
import { TextArea } from "~/shared/ui/components/TextArea";
import { Button } from "~/shared/ui/components/Button";
import { LeaveRequestModalProps } from "./types";
import { useState, useEffect } from "react";

export function LeaveRequestModal({ isOpen, onClose }: LeaveRequestModalProps) {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    if (!isOpen) {
      setDateRange([null, null]);
    }
  }, [isOpen]);

  const remainingLeave = {
    total: 15, // 총 연차
    used: 5, // 사용한 연차
    remaining: 10, // 남은 연차
  };

  const leaveTypeOptions = [
    { value: "full", label: "연차" },
    { value: "morning", label: "오전 반차" },
    { value: "afternoon", label: "오후 반차" },
  ];
  const approvalLineOptions = [
    { value: "1", label: "1차 결재자" },
    { value: "2", label: "2차 결재자" },
  ];
  const leaveReasonOptions = [
    { value: "personal", label: "개인 사유" },
    { value: "family", label: "가족 행사" },
    { value: "health", label: "병가" },
    { value: "other", label: "기타" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="휴가 신청">
      <form className="space-y-6">
        <div className="p-4 bg-gray-50 border border-gray-300 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">남은 연차</span>
            <div className="text-sm space-x-1">
              <span className="text-lg font-bold text-red-600">{remainingLeave.remaining}</span>
              <span className="text-gray-500">/ {remainingLeave.total}일</span>
            </div>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2.5">
            <div
              className="bg-red-500 h-2.5 rounded-full transition-all duration-300"
              style={{
                width: `${(remainingLeave.used / remainingLeave.total) * 100}%`,
              }}
            />
          </div>
          <div className="mt-2 text-xs text-gray-500 text-right">사용: {remainingLeave.used}일</div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">
            유형 <span className="text-red-500">*</span>
          </label>
          <Select required options={leaveTypeOptions} />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">
            결재라인 <span className="text-red-500">*</span>
          </label>
          <Select required options={approvalLineOptions} />
          <Select required options={approvalLineOptions} />
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
          <Select required options={leaveReasonOptions} />
          <TextArea placeholder="상세 사유를 입력해주세요" required className="h-24" />
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-gray-300">
          <Button type="submit" variant="red">
            신청
          </Button>
        </div>
      </form>
    </Modal>
  );
}
