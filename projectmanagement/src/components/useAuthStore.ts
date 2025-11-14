/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import userService from '../services/userService';

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
<<<<<<< HEAD
    (set, get) => ({
=======
    (set) => ({
>>>>>>> main
      // --- state ---
      user: null,
      token: null,
      loading: false,
      error: null,

      // --- actions ---
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await userService.loginUser({ email, password });
          set({ user: res.user, token: res.token, loading: false });
        } catch (err: any) {
          set({ error: err?.response?.data?.message || err.message, loading: false });
        }
      },

      register: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await userService.createUser({ name, email, password });
          set({ user: res.user, token: res.token, loading: false });
        } catch (err: any) {
          set({ error: err?.response?.data?.message || err.message, loading: false });
        }
      },

      resetPassword: async (email) => {
        set({ loading: true, error: null });
        try {
          await userService.resetPassword({ email });
          set({ loading: false });
        } catch (err: any) {
          set({ error: err?.response?.data?.message || err.message, loading: false });
        }
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),

    // --- persist options ---
    {
      name: 'auth-storage',
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);

export default useAuthStore;
