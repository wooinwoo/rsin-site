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
      <div className="fixed inset-0 z-50 bg-black/80 animate-fade-in" onClick={handleClose} />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        className="
    fixed left-1/2 top-1/2 z-50 
    w-[calc(100%-2rem)] max-w-lg  /* 좌우 여백 추가 */
    -translate-x-1/2 -translate-y-1/2
    rounded-lg border border-gray-200 
    bg-white p-6 
    shadow-lg 
    animate-scale-in
  "
      >
        <div className="flex items-center justify-between mb-4">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
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

        <div>{children}</div>
      </div>
    </>,
    document.body
  );
}
