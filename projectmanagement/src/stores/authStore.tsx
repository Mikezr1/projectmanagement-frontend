import { createStore } from "@odemian/react-store";
import type { UserSummaryDTO } from "../types/models";

interface AuthState {
    user: UserSummaryDTO | null
}

const initialAuthState: AuthState = {
    user: null
}

export const [useAuthStore, setAuthStore] = createStore<AuthState>(initialAuthState);

export const login = (user: UserSummaryDTO): void => { setAuthStore({ user }); }

export const logout = () => setAuthStore(initialAuthState);