import { useState } from "react";
import { Modal } from "~/shared/ui/components/Modal";
import { Button } from "~/shared/ui/components/Button";
import { Input } from "~/shared/ui/components/Input";
import { DatePicker } from "~/shared/ui/components/DatePicker";
import { TextArea } from "~/shared/ui/components/TextArea";
import { OptimizedImage } from "~/shared/ui/components/OptimizedImage";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  memberName: string;
  memberPosition: string;
  memberImage: string;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  memberName,
  memberPosition,
  memberImage,
}: DeleteConfirmModalProps) {
  const [resignDate, setResignDate] = useState<Date | null>(null);
  const [resignReason, setResignReason] = useState("");
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const handleDateChange = (date: Date | [Date | null, Date | null] | null) => {
    if (date && !Array.isArray(date)) {
      setResignDate(date);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="삭제(퇴사처리)하시겠습니까?"
      size="small"
      isOverlay={true}
    >
      <div className="space-y-6">
        {/* 설명 텍스트 */}

        {/* 멤버 정보 */}
        <div className="flex items-center gap-4 bg-neutral-50 p-4 rounded-lg">
          <div className="relative">
            <OptimizedImage
              src={memberImage}
              alt={memberName}
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <p className="font-medium">{memberName}</p>
            <p className="text-sm text-neutral-400">{memberPosition}</p>
          </div>
        </div>

        {/* 퇴사일 선택 */}
        <div className="space-y-1">
          <label className="block text-sm font-medium">
            퇴사일 <span className="text-red-500">*</span>
          </label>
          <DatePicker
            required
            name="resignDate"
            isRange={false}
            value={resignDate}
            onChange={handleDateChange}
          />
        </div>

        {/* 퇴사 사유 */}
        <div className="space-y-1">
          <label className="block text-sm font-medium">퇴사 사유</label>
          <TextArea placeholder="상세 사유를 입력해주세요" required className="h-24" />
          <div className="text-right text-sm text-neutral-400">{resignReason.length}/100</div>
        </div>

        {/* DELETE 입력 확인 */}
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="DELETE를 입력하세요"
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
          />
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <svg className="w-5 h-5" /* 정보 아이콘 SVG */ />
            <span>'DELETE'을 입력하면 [삭제] 버튼이 활성화됩니다.</span>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button variant="red" disabled={deleteConfirmText !== "DELETE"} onClick={onConfirm}>
            삭제
          </Button>
        </div>
      </div>
    </Modal>
  );
}
