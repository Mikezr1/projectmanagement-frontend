import axios from "axios";
import { API_BASE_USER } from "../components/constants";

const createUser = async (dto) => {
    const response = await axios.post(`${API_BASE_USER}`, dto);
    return response.data;
};

const getUserById = async (id) => {
    if (!id) {
        throw new console.error("error id doesnt exist");
    }
    const response = await axios.get(`${API_BASE_USER}/${id}`);
    return response.data;
};

const getAllUsers = async () => {
    const response = await axios.get(`${API_BASE_USER}`);
    return response.data;
};

const updateUser = async (id, dto) => {
    const response = await axios.put(`${API_BASE_USER}/${id}`, dto);
    return response.data;
};

const deleteUser = async (id) => {
    const response = await axios.delete(`${API_BASE_USER}/${id}`);
    return response.data;
};

const loginUser = async (dto) => {
    const response = await axios.post(`${API_BASE_USER}/login`, dto);
    return response.data;
};

const resetPassword = async (dto) => {
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
}