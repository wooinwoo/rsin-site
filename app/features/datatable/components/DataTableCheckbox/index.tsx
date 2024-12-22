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
        h-5 w-5 rounded border-2 transition-all duration-200 flex items-center justify-center
        ${
          checked
            ? "bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600"
            : "border-gray-400 hover:border-blue-500 bg-white"
        }
      `}
      onClick={() => onChange(!checked)}
    >
      {checked && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M20 6L9 17L4 12" />
        </svg>
      )}
    </button>
  );
}
