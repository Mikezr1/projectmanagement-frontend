import axios from "axios";
import { API_BASE_PROJECT } from "../components/constants.ts";
import type { ProjectSummaryDTO } from "../types/models";


const axiosClient = axios.create({
    baseURL: API_BASE_PROJECT
});
 
const createProject = async (dto) => {
    const response = await axios.post(`${API_BASE_PROJECT}`, dto);
    return response.data;
}
 
const getAllProjects = async () => {
    const response = await axios.get(`${API_BASE_PROJECT}`);
    return response.data;
}

const getProjectsByUserId = async (userId: number) => {
    const response = await axiosClient.get<ProjectSummaryDTO[]>(`/by-user?userId=${userId}`);
    return response.data;
};

const getTasksByProjectId = async (id) => {
    const response = await axios.get(`${API_BASE_PROJECT}/${id}/tasks`);
    return response.data;
}

const getProject = async (id) => {
    if (!id) {
        throw new Error("error id doesn't exist");
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
    getProjectsByUserId,
    getTasksByProjectId,
    getProject,
    updateProject,
    deleteProject
}
 