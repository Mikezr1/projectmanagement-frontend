import axios from "axios";
import { API_BASE_COMMENT } from "../components/constants";

interface CommentCreateDTO{
    taskId: number;
    userId: number;
    content: string;
}

interface CommentUpdateDTO{
    content: string;
}

const createComment = async (dto: CommentCreateDTO) => {
    const response = await axios.post(`${API_BASE_COMMENT}`, dto);
    return response.data;
}

const getCommentById = async (id: number) => {
    const response = await axios.get(`${API_BASE_COMMENT}/${id}`);
    return response.data;
}

const getAllComments = async () => {
    const response = await axios.get(`${API_BASE_COMMENT}`);
    return response.data;
}

const getCommentsByTask = async (id: number ) => {
    const response = await axios.get(`${API_BASE_COMMENT}/task/${id}`);
    return response.data;
}

const updateComment = async (id: number, dto: CommentUpdateDTO) => {
    const response = await axios.put(`${API_BASE_COMMENT}/${id}`, dto);
    return response.data;
}

const deleteComment = async (id) => {
    const response = await axios.delete(`${API_BASE_COMMENT}/${id}`);
    return response.data;
}

export default {
    createComment,
    getCommentById,
    getAllComments,
    getCommentsByTask,
    updateComment,
    deleteComment
}