import { Modal } from "~/shared/ui/components/Modal";
import { Select } from "~/shared/ui/components/Select";
import { DatePicker } from "~/shared/ui/components/DatePicker";
import { TextArea } from "~/shared/ui/components/TextArea";
import { Button } from "~/shared/ui/components/Button";
import { LeaveRequestModalProps } from "./types";
import { useState } from "react";

export function LeaveRequestModal({ isOpen, onClose }: LeaveRequestModalProps) {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

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
            사용시작일 <span className="text-red-500">*</span>
          </label>
          <DatePicker
            isRange={true}
            onChange={(dates) => setDateRange(dates as [Date | null, Date | null])}
          />
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
