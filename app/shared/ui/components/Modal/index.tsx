import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "default" | "small";
  isOverlay?: boolean;
}

export function Modal({
  children,
  isOpen,
  onClose,
  title,
  size = "default",
  footer,
  isOverlay = false,
}: ModalProps) {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 
          ${isOverlay ? "z-[9999]" : "z-[9993]"} 
          bg-black/50 
          animate-fade-in
        `}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        className={`
          rs-modal-wrapper
          fixed left-1/2 top-1/2 
          ${isOverlay ? "z-[9999]" : "z-[9994]"}
          w-[calc(100%-2rem)] 
          min-w-[320px] 
          ${size === "default" ? "max-w-md" : "max-w-sm"}
          -translate-x-1/2 -translate-y-1/2
          rounded-lg border border-gray-200 
          bg-white
          shadow-lg 
          animate-scale-in
          max-h-[calc(100%-2rem)]
          flex flex-col
        `}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
            <h2 className="text-base font-semibold">{title}</h2>
            <button
              onClick={handleClose}
              className="ml-auto rounded-md p-1 hover:bg-gray-100"
              data-modal-close
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-4 flex-1 overflow-y-auto">{children}</div>
        {/* Footer - 고정 */}
        {footer && <div className="px-6 py-4 border-t border-gray-200 bg-white">{footer}</div>}
      </div>
    </>,
    document.body
  );
}
