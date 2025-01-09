import { useEffect } from "react";
import { XCircleIcon, CheckCircleIcon } from "~/shared/ui/icons";
import { useToastStore } from "~/shared/store/toast";

export function GlobalToast() {
  const { message, type, isVisible, hideToast } = useToastStore();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(hideToast, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, hideToast]);

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed bottom-4 left-1/2 -translate-x-1/2 z-[9994]
        flex items-center gap-3 px-4 py-3 
        rounded-lg shadow-lg
        animate-toast-in
        ${type === "success" ? "bg-blue-500" : "bg-red-500"}
        text-white
      `}
    >
      {type === "success" ? (
        <CheckCircleIcon className="w-5 h-5" />
      ) : (
        <XCircleIcon className="w-5 h-5" />
      )}
      <span>{message}</span>
    </div>
  );
}
