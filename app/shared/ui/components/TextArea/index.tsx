interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
}

export function TextArea({ value, onChange, className = "", ...props }: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={`
        w-full rounded-md border border-gray-300 p-2 text-sm bg-white
        focus:border-blue-500 focus:ring-1 focus:ring-blue-500
        disabled:bg-gray-100
        ${className}
      `}
      {...props}
    />
  );
}
