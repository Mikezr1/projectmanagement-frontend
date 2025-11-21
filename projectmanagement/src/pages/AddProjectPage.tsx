import { useState } from "react"
import projectService from "../services/projectService";
import { useAuthStore } from "../stores/authStore";
import { useModal } from "../modals/ModalContext";
import { useQueryClient } from "@tanstack/react-query";

const AddProjectPage = () => {
    const user = useAuthStore((state) => state.user);
    const [title, setTitle] = useState("");
    const { hideModal } = useModal();
    const queryClient = useQueryClient();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            await projectService.createProject(title, user.id);
            queryClient.invalidateQueries({
                queryKey: ["projects", user.id],
            });
            hideModal();
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
                    placeholder="Title of your new project"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
        </form>
    )
}

export default AddProjectPage