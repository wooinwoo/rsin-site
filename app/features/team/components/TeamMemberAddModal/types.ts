export interface TeamMemberAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: TeamMemberAddData) => void | Promise<void>;
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
