import { create } from 'zustand';


const storedUser: User | null = JSON.parse(localStorage.getItem('user') || 'null');

const useStore = create<StoreState>((set) => ({
    id: null,
    user: storedUser,
    setUser: (userData: User) => {
        set({ user: userData });
        localStorage.setItem('user', JSON.stringify(userData));
    },
    clearUser: () => {
        set({ user: null });
        localStorage.removeItem('user');
    },
}));

export default useStore;