import axios from "axios";
import { API_BASE_PROJECT } from "../components/constants";

const createProject = async (dto) => {
    const response = await axios.post(`${API_BASE_PROJECT}`, dto);
    return response.data;
}

const getAllProjects = async () => {
    const response = await axios.get(`${API_BASE_PROJECT}`);
    return response.data;
}

const getProject = async (id) => {
    if (!id) {
        throw new console.error("error id doesnt exist");
    }
    const response = await axios.get(`${API_BASE_PROJECT}/${id}`);
    return response.data;
}

const updateProject = async (id, dto) => {
    const response = await axios.put(`${API_BASE_PROJECT}/${id}`, dto);
    return response.data;
}

const deleteProject = async (id) => {
    const response = await axios.delete(`${API_BASE_PROJECT}/${id}`);
    return response.data;
}

export default {
    createProject,
    getAllProjects,
    getProject,
    updateProject,
    deleteProject
}