import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
}

export function Modal({ children, isOpen, onClose, title }: ModalProps) {
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
      <div className="fixed inset-0 z-[60] bg-black/80 animate-fade-in" onClick={handleClose} />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        className="
          fixed left-1/2 top-1/2 z-[61] 
          w-[calc(100%-2rem)] max-w-lg
          -translate-x-1/2 -translate-y-1/2
          rounded-lg border border-gray-200 
          bg-white
          shadow-lg 
          animate-scale-in
        "
      >
        {/* Header - 패딩 분리 */}
        {title && (
          <div className="flex items-center justify-between px-5 py-4 ">
            <h2 className="text-base font-semibold">{title}</h2>
            <button onClick={handleClose} className="ml-auto rounded-md p-1 hover:bg-gray-100">
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

        {/* Content - 패딩 없음 */}
        <div className="px-6 py-4">{children}</div>
      </div>
    </>,
    document.body
  );
}
