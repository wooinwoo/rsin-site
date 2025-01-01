import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthStore, User } from "./types";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth-storage", // localStorage에 저장될 키 이름
    }
  )
);
