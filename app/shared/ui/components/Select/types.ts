export type SelectOption = {
  value: string | number;
  label: string;
};

export interface SelectProps {
  options: readonly SelectOption[] | SelectOption[];
  value?: string | number;
  onChange?: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}
