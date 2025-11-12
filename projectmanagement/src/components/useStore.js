import { create } from 'zustand';

const useStore = create((set) => ({
    user: storedUser,
    setUser: (userData) => {
        set({ user: userData });
        localStorage.setItem('user', JSON.stringify(userData));
    },
    clearUser: () => {
        set({user: null});
        localStorage.removeItem('user');
    },
}));
