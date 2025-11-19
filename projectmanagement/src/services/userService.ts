import axios from "axios";
import { API_BASE_USER } from "../components/constants";
//import type { UserLoginRequestDTO } from "../types/models";
import type { UserLoginResponseDTO } from "../types/models";
// import { types } from "util";

interface UserRegistrationData{
    firstname: string;
    lastName: string;
    email: string;
    role: string;
    password: string;
    companyName: string;
}
const axiosClient = axios.create({
    baseURL: API_BASE_USER
});

const createUser = async (dto: UserRegistrationData) => {
    const response = await axios.post(`${API_BASE_USER}`, dto);
    return response.data;
};

const getUserById = async (id: string | number) => {
    if (!id) {
        throw new Error("error id doesnt exist");
    }
    const response = await axios.get(`${API_BASE_USER}/${id}`);
    return response.data;
};

const getAllUsers = async () => {
    const response = await axios.get(`${API_BASE_USER}`);
    return response.data;
};

const getUserTypes = async () => {
    const response = await axios.get(`${API_BASE_USER}/types`);
    return response.data;
};

const updateUser = async (id: number, dto: UserRegistrationData) => {
    const response = await axios.put(`${API_BASE_USER}/${id}`, dto);
    return response.data;
};

const deleteUser = async (id: number) => {
    const response = await axios.delete(`${API_BASE_USER}/${id}`);
    return response.data;
};

const loginUser = async (email: string, password: string) => {
    const response = await axiosClient.post<UserLoginResponseDTO>("/login", {
        email: email.trim().toLowerCase(),
        password: password.trim().toLowerCase()
    });
    return response.data;
};


const resetPassword = async (dto: UserRegistrationData) => {
    const response = await axios.post(`${API_BASE_USER}/reset-password`, dto);
    return response.data;
};

export default {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
    loginUser,
    resetPassword,
    getUserTypes
}