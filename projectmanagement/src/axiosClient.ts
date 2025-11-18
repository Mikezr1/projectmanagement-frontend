import axios from "axios";
import { setAuthStore, useAuthStore } from "./stores/authStore";
import { API_BASE_USER } from "./components/constants";
import { getAuthToken } from "./authToken";

const axiosClient = axios.create({
    baseURL: API_BASE_USER
});

axiosClient.interceptors.request.use((config) => {
    const token = getAuthToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

export default axiosClient;