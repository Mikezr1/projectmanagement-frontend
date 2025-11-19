import { createStore } from "@odemian/react-store";
import type { UserSummaryDTO } from "../types/models";

interface AuthState {
    user: UserSummaryDTO | null,
    // token: string | null
}

const initialAuthState: AuthState = {
    user: null,
    // token: null
}

export const [useAuthStore, setAuthStore] = createStore<AuthState>(initialAuthState);

export const login = (user: UserSummaryDTO): void => { setAuthStore({ user }); }
// export const login = (user: UserSummaryDTO, token: string): void => { setAuthStore({ user, token }); }
