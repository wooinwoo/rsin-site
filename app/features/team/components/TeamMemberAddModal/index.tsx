import { useState } from "react";
import { Modal } from "~/shared/ui/components/Modal";
import { Button } from "~/shared/ui/components/Button";
import { Select } from "~/shared/ui/components/Select";
import { Input } from "~/shared/ui/components/Input";
import { DatePicker } from "~/shared/ui/components/DatePicker";
import { Toggle } from "~/shared/ui/components/Toggle";
import { TeamMemberAddModalProps, TeamMemberAddData } from "./types";
import { DEPARTMENT_OPTIONS, POSITION_OPTIONS, MBTI_OPTIONS } from "./constants";

export function TeamMemberAddModal({ isOpen, onClose, onSubmit }: TeamMemberAddModalProps) {
  const [formData, setFormData] = useState<TeamMemberAddData>({
    name: "",
    phone: "",
    email: "",
    department: "",
    position: "",
    joinDate: "",
    isManager: false,
    birthDate: "",
    mbti: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="팀원 추가">
      <form onSubmit={handleSubmit} className="space-y-4">
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
            value={formData.department}
            onChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}
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
            value={formData.joinDate ? new Date(formData.joinDate) : null}
            onChange={(date) =>
              setFormData((prev) => ({
                ...prev,
                joinDate: date instanceof Date ? date.toISOString().split("T")[0] : "",
              }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">중간관리자 여부</label>
          <Toggle
            label=""
            isOn={formData.isManager}
            onToggle={() => setFormData((prev) => ({ ...prev, isManager: !prev.isManager }))}
            activeColor="bg-red-500"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">생년월일</label>
          <DatePicker
            name="birthDate"
            isRange={false}
            value={formData.birthDate ? new Date(formData.birthDate) : null}
            onChange={(date) =>
              setFormData((prev) => ({
                ...prev,
                birthDate: date instanceof Date ? date.toISOString().split("T")[0] : "",
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

        <div className="flex justify-end gap-2 pt-4 border-t border-gray-300">
          <Button type="submit" variant="red">
            추가
          </Button>
        </div>
      </form>
    </Modal>
  );
}
