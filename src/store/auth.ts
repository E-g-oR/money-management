import { User } from "firebase/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    { name: "money-management-auth" }
  )
);

export const getUser = (store: AuthStore) => store.user,
  getSetUser = (store: AuthStore) => store.setUser;
