export type ToastType = "success" | "error";

export interface ToastState {
  message: string;
  type: ToastType;
  isVisible: boolean;
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
}
