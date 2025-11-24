import { useState } from "react"
import projectService from "../services/projectService";
import taskService from "../services/taskService";
import { useAuthStore } from "../stores/authStore";
import { useModal } from "../modals/ModalContext";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface AddTaskPageProps {
    projectId: number
}

const AddTaskPage = ({ projectId }: AddTaskPageProps) => {
    const user = useAuthStore((state) => state.user);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { hideModal } = useModal();
    const queryClient = useQueryClient();

    const numericProjectId = projectId;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            await taskService.createTask(
                title,
                description,
                "CREATED",
                user.id,
                numericProjectId);
            queryClient.invalidateQueries({
                queryKey: ["project"],
            });
            hideModal();
            window.location.reload();
        } catch (error: any) {
            alert(error.response?.data || error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title: </label>
                <input
                    type="text"
                    id="title"
                    placeholder="Title of the task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="description">Description: </label>
                <input
                    type="text"
                    id="description"
                    placeholder="Description of the task"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button
                className="px-2 mt-4 border-1 text-white p-2 rounded bg-black hover:bg-white hover:text-black"
                type="submit">
                Add Task
            </button>
        </form>
    )
}

export default AddTaskPage