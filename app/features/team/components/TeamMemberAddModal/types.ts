export interface TeamMemberAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TeamMemberAddData) => Promise<void>;
  mode?: "add" | "edit"; // 모달 모드
  initialData?: TeamMemberAddData; // 수정 시 초기 데이터
  onResign?: () => Promise<void>; // 퇴사 처리 핸들러
}

export interface TeamMemberAddData {
  name: string; // required
  phone: string; // required
  email: string; // required
  department: string; // required
  position: string; // required
  joinDate: string; // required
  isManager: boolean;
  birthDate: string;
  mbti: string | null;
}

export interface FormField {
  label: string;
  name: keyof TeamMemberAddData;
  type: "text" | "email" | "tel" | "date" | "select" | "toggle";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}
