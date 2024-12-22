export interface TeamMemberAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: TeamMemberAddData) => void | Promise<void>;
}

export interface TeamMemberAddData {
  name: string;
  phone: string;
  email: string;
  department: string;
  position: string;
  joinDate: string;
  isManager: boolean;
  birthDate: string;
  mbti: string | null;
}
