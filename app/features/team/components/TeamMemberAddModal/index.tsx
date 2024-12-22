import { useState } from "react";
import { Modal } from "~/shared/ui/components/Modal";
import { TeamMemberAddModalProps, TeamMemberAddData } from "./types";
import { Button } from "~/shared/ui/components/Button";
const DEPARTMENT_OPTIONS = [
  { value: "개발팀", label: "개발팀" },
  { value: "인사팀", label: "인사팀" },
  { value: "마케팅팀", label: "마케팅팀" },
  { value: "기획팀", label: "기획팀" },
];

const POSITION_OPTIONS = [
  { value: "사원", label: "사원" },
  { value: "대리", label: "대리" },
  { value: "과장", label: "과장" },
  { value: "차장", label: "차장" },
  { value: "부장", label: "부장" },
];

const MBTI_OPTIONS = [
  { value: "ISTJ", label: "ISTJ" },
  { value: "ISFJ", label: "ISFJ" },
  { value: "INFJ", label: "INFJ" },
  { value: "INTJ", label: "INTJ" },
  { value: "ISTP", label: "ISTP" },
  { value: "ISFP", label: "ISFP" },
  { value: "INFP", label: "INFP" },
  { value: "INTP", label: "INTP" },
  { value: "ESTP", label: "ESTP" },
  { value: "ESFP", label: "ESFP" },
  { value: "ENFP", label: "ENFP" },
  { value: "ENTP", label: "ENTP" },
  { value: "ESTJ", label: "ESTJ" },
  { value: "ESFJ", label: "ESFJ" },
  { value: "ENFJ", label: "ENFJ" },
  { value: "ENTJ", label: "ENTJ" },
];
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
        {/* 이름 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">이름</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="입력하세요"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        {/* 휴대폰 번호 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">휴대폰 번호</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            placeholder="국가번호, -없이 숫자만 입력"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        {/* 이메일 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">이메일</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="myemail@rs-team.com"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        {/* 부서 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">부서</label>
          <select
            value={formData.department}
            onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">선택하세요</option>
            {DEPARTMENT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 직급 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">직급</label>
          <select
            value={formData.position}
            onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">선택하세요</option>
            {POSITION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 입사일 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">입사일</label>
          <input
            type="date"
            value={formData.joinDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, joinDate: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        {/* 중간관리자 여부 */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">중간관리자 여부</label>
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, isManager: !prev.isManager }))}
            className={`
              relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
              transition-colors duration-200 ease-in-out focus:outline-none
              ${formData.isManager ? "bg-blue-600" : "bg-gray-200"}
            `}
          >
            <span
              className={`
                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow 
                ring-0 transition duration-200 ease-in-out
                ${formData.isManager ? "translate-x-5" : "translate-x-0"}
              `}
            />
          </button>
        </div>

        {/* 생년월일 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">생년월일</label>
          <input
            type="date"
            value={formData.birthDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, birthDate: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        {/* MBTI */}
        <div>
          <label className="block text-sm font-medium text-gray-700">MBTI</label>
          <select
            value={formData.mbti || ""}
            onChange={(e) => setFormData((prev) => ({ ...prev, mbti: e.target.value || null }))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">선택하세요</option>
            {MBTI_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit" variant="outline">
            퇴사처리
          </Button>
          <Button type="submit" variant="red">
            추가
          </Button>
        </div>
      </form>
    </Modal>
  );
}
