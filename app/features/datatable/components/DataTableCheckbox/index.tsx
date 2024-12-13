interface DataTableCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function DataTableCheckbox({ checked, onChange }: DataTableCheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      className={`
        h-4 w-4 rounded-sm border 
        ${checked ? "bg-primary border-primary" : "border-gray-300"}
      `}
      onClick={() => onChange(!checked)}
    >
      {checked && (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-4 w-4">
          <path d="M20 6L9 17L4 12" />
        </svg>
      )}
    </button>
  );
}
