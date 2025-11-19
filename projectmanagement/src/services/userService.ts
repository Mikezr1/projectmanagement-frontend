import axios from "axios";
import { API_BASE_USER } from "../components/constants";
import type { UserLoginResponseDTO } from "../types/models";

interface UserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  companyName: string;
}

// axios instance
const axiosClient = axios.create({
  baseURL: API_BASE_USER,
});

const createUser = async (dto: UserRegistrationData) => {
  const response = await axiosClient.post("/", dto);
  return response.data;
};

const getUserById = async (id: string | number) => {
  if (!id) throw new Error("User ID is required");
  const response = await axiosClient.get(`/${id}`);
  return response.data;
};

const getAllUsers = async () => {
  const response = await axiosClient.get("/");
  return response.data;
};

const getUserTypes = async () => {
  const response = await axiosClient.get("/types");
  return response.data;
};

const updateUser = async (id: number, dto: UserRegistrationData) => {
  const response = await axiosClient.put(`/${id}`, dto);
  return response.data;
};

const deleteUser = async (id: number) => {
  const response = await axiosClient.delete(`/${id}`);
  return response.data;
};

const loginUser = async (email: string, password: string) => {
  const response = await axiosClient.post<UserLoginResponseDTO>("/login", {
    email: email.trim().toLowerCase(),
    password: password.trim(), // never lowercase passwords!
  });
  return response.data;
};

const resetPassword = async (
  email: string,
  newPassword: string,
  confirmPassword: string
) => {
  const response = await axiosClient.post("/forgot-password", {
    email,
    newPassword,
    confirmPassword,
  });
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
  getUserTypes,
};