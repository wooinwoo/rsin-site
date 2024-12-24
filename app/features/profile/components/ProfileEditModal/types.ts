export interface ProfileEditData {
  name: string;
  departmentId: number;
  position: string;
  joinedAt: string;
  email: string;
  phone: string;
  birth: string;
  mbti: string | null;
  profileImage?: File;
  profileImageUrl?: string;
}

export interface FormField {
  label: string;
  name:
    | "name"
    | "departmentId"
    | "position"
    | "joinedAt"
    | "email"
    | "phone"
    | "birth"
    | "mbti"
    | "profileImage"
    | "profileImageUrl";
  type: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  disabled?: boolean;
}

export interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProfileEditData) => Promise<void>;
  initialData?: ProfileEditData;
}
