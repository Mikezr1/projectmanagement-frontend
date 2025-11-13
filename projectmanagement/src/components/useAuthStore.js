import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import userService from '../services/userService';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null })
        try {
          const res = await userService.loginUser({ email, password })
          console.log("yes");
          set({
            user: res.user,
            token: res.token,
            loading: false,
          })
        } catch (err) {
          console.log("no");
          set({ error: err?.response?.data?.message || err.message, loading: false })
        }
      },

      register: async (name, email, password) => {
        set({ loading: true, error: null })
        try {
          const res = await userService.createUser({ name, email, password })
          set({
            user: res.user,
            token: res.token,
            loading: false,
          })
        } catch (err) {
          set({ error: err?.response?.data?.message || err.message, loading: false })
        }
      },

      resetPassword: async (email) => {
        set({ loading: true, error: null })
        try {
          await userService.resetPassword({ email })
          set({ loading: false })
        } catch (err) {
          set({ error: err?.response?.data?.message || err.message, loading: false })
        }
      },

      logout: () => {
        set({ user: null, token: null })
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
)

export default useAuthStore;
