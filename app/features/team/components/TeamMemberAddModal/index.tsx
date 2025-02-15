import { useState, useEffect } from "react";
import { Modal } from "~/shared/ui/components/Modal";
import { Button } from "~/shared/ui/components/Button";
import { Select } from "~/shared/ui/components/Select";
import { Input } from "~/shared/ui/components/Input";
import { DatePicker } from "~/shared/ui/components/DatePicker";
import { Toggle } from "~/shared/ui/components/Toggle";
import { TeamMemberAddModalProps, TeamMemberAddData } from "./types";
import { DEPARTMENT_OPTIONS, POSITION_OPTIONS, MBTI_OPTIONS } from "~/shared/constants/options";
import { useToastStore } from "~/shared/store/toast";
import { DeleteConfirmModal } from "../DeleteConfirmModal";
export function TeamMemberAddModal({
  isOpen,
  onClose,
  onSubmit,
  mode = "add",
  initialData,
  onResign,
}: TeamMemberAddModalProps) {
  const { showToast } = useToastStore();
  const resetData: TeamMemberAddData = {
    name: "",
    phone: "",
    email: "",
    departmentId: 1,
    position: POSITION_OPTIONS[0].value,
    joinedAt: "",
    birth: "",
    mbti: MBTI_OPTIONS[0].value,
    role: "employee",
    thumbnailPath: "",
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState<TeamMemberAddData>(initialData || resetData);

  useEffect(() => {
    setFormData(initialData || resetData);
  }, [initialData]);

  const formId = "team-member-add-form";
  const footer = (
    <div className="flex justify-end gap-2 ">
      {mode === "edit" && onResign && (
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsDeleteModalOpen(true)}
          size="md"
          form={formId}
        >
          퇴사처리
        </Button>
      )}
      <Button type="submit" variant="red" size="md" form={formId}>
        {mode === "add" ? "추가" : "수정"}
      </Button>
    </div>
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={mode === "add" ? "팀원 추가" : "팀원 정보 수정"}
        footer={footer}
      >
        <form
          className="space-y-4"
          id={formId}
          onSubmit={async (e) => {
            e.preventDefault();

            if (!formData.birth) {
              showToast("생년월일을 입력해주세요.", "error");
              return;
            }
            try {
              await onSubmit(formData);
              showToast(
                mode === "add" ? "팀원이 추가되었습니다." : "팀원 정보가 수정되었습니다.",
                "success"
              );
              onClose();
            } catch (error) {
              showToast(
                mode === "add" ? "팀원 추가에 실패했습니다." : "팀원 정보 수정에 실패했습니다.",
                "error"
              );
            }
          }}
        >
          <div className="space-y-1">
            <label className="block text-sm font-medium">
              이름 <span className="text-red-500">*</span>
            </label>
            <Input
              required
              placeholder="입력하세요"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">
              휴대폰 번호 <span className="text-red-500">*</span>
            </label>
            <Input
              required
              type="tel"
              placeholder="국가번호, -없이 숫자만 입력"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">
              이메일 <span className="text-red-500">*</span>
            </label>
            <Input
              required
              type="email"
              placeholder="myemail@rs-team.com"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">
              부서 <span className="text-red-500">*</span>
            </label>
            <Select
              required
              options={DEPARTMENT_OPTIONS}
              value={formData.departmentId}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, departmentId: Number(value) }))
              }
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">
              직급 <span className="text-red-500">*</span>
            </label>
            <Select
              required
              options={POSITION_OPTIONS}
              value={formData.position}
              onChange={(value) => setFormData((prev) => ({ ...prev, position: value }))}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">
              입사일 <span className="text-red-500">*</span>
            </label>
            <DatePicker
              required
              name="joinDate"
              isRange={false}
              value={formData.joinedAt ? new Date(formData.joinedAt) : null}
              onChange={(date) =>
                setFormData((prev) => ({
                  ...prev,
                  joinedAt: date instanceof Date ? date.toISOString().split("T")[0] : "",
                }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">중간관리자 여부</label>
            <Toggle
              label=""
              isOn={formData.role === "admin"}
              onToggle={() =>
                setFormData((prev) => ({
                  ...prev,
                  role: prev.role === "admin" ? "employee" : "admin",
                }))
              }
              activeColor="bg-red-500"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">생년월일</label>
            <DatePicker
              name="birthDate"
              isRange={false}
              value={formData.birth ? new Date(formData.birth) : null}
              onChange={(date) =>
                setFormData((prev) => ({
                  ...prev,
                  birth: date instanceof Date ? date.toISOString().split("T")[0] : "",
                }))
              }
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">MBTI</label>
            <Select
              options={MBTI_OPTIONS}
              value={formData.mbti || ""}
              onChange={(value) => setFormData((prev) => ({ ...prev, mbti: value }))}
            />
          </div>
        </form>
      </Modal>
      {/* 퇴사 확인 모달 */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={async () => {
          try {
            if (onResign) {
              await onResign();
              showToast("퇴사 처리가 완료되었습니다.", "success");
            }
            setIsDeleteModalOpen(false);
            onClose();
          } catch (error) {
            showToast("퇴사 처리에 실패했습니다.", "error");
          }
        }}
        memberName={initialData?.name || ""}
        memberPosition={initialData?.position || ""}
        memberImage={initialData?.thumbnailPath || ""}
      />
    </>
  );
}
