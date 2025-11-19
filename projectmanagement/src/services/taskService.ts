import axios from "axios";
import { API_BASE_TASK } from "../components/constants";

const createTask = async (dto) => {
    const response = await axios.post(`${API_BASE_TASK}`, dto);
    return response.data;
}

const getTask = async (id) => {
    if (!id) {
        throw new console.error("error id doesnt exist");
    }
    const response = await axios.get(`${API_BASE_TASK}/${id}`);
    return response.data;
}

const getAllTasks = async () => {
    const response = await axios.get(`${API_BASE_TASK}`);
    return response.data;
}

const updateTask = async (id, dto) => {
    const response = await axios.put(`${API_BASE_TASK}/${id}`, dto);
    return response.data;
}

const deleteTask = async (id) => {
    const response = await axios.delete(`${API_BASE_TASK}/${id}`);
    return response.data;
}

const getAllStatuses = async () => {
  const response = await axios.get(`${API_BASE_TASK}/statuses`);
  return response.data;
};

export default {
    createTask,
    getTask,
    getAllTasks,
    updateTask,
    deleteTask,
    getAllStatuses
}