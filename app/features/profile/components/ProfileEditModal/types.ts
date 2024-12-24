export interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProfileEditData) => Promise<void>;
  initialData?: ProfileEditData;
}

export interface ProfileEditData {
  name: string;
  departmentId: number;
  position: string;
  joinedAt: string;
  email: string;
  phone: string;
  birth: string;
  mbti: string | null;
}

export interface FormField {
  label: string;
  name: keyof ProfileEditData;
  type: "text" | "email" | "tel" | "date" | "select";
  required?: boolean;
  placeholder?: string;
  options?: readonly { readonly value: string | number; readonly label: string }[];
}
