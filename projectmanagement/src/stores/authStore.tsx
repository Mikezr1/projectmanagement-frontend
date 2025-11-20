import { createStore } from "@odemian/react-store";
import type { UserSummaryDTO } from "../types/models";

interface AuthState {
    user: UserSummaryDTO | null,
}

const LOCAL_KEY = "authUser";

const savedUser = localStorage.getItem(LOCAL_KEY);

const initialAuthState: AuthState = {
    user: savedUser ? JSON.parse(savedUser) : null,
};

export const [useAuthStore, setAuthStore] = createStore<AuthState>(initialAuthState);

export const login = (user: UserSummaryDTO): void => { 
    localStorage.setItem(LOCAL_KEY, JSON.stringify(user));
    setAuthStore({ user }); 
};

export const logout = (): void => { 
    localStorage.removeItem(LOCAL_KEY);
    setAuthStore({ user:null }); 
};