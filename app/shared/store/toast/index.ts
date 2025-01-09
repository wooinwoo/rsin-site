import { create } from "zustand";
import { ToastState } from "./types";

export const useToastStore = create<ToastState>((set) => ({
  message: "",
  type: "success",
  isVisible: false,
  showToast: (message, type) => set({ message, type, isVisible: true }),
  hideToast: () => set({ isVisible: false }),
}));
