import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthStore, User } from "./types";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user }),
      clearUser: () => set({ user: null }),
      updateUser: (additionalInfo: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...additionalInfo } : null,
        })),
    }),
    {
      name: "auth-storage", // localStorage
    }
  )
);
