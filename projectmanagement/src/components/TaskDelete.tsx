import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskSummaryDTO } from "../types/models";
import taskService from "../services/taskService";
import { useNavigate } from "react-router-dom";

interface TaskDeleteProps {
    task: TaskSummaryDTO;
}

const TaskDelete = ({ task }: TaskDeleteProps) => {
    const queryClient = useQueryClient();
    const [isDeleting, setIsDeleting] = useState(false);

    const navigate = useNavigate();


    const deleteTaskMutation = useMutation({
        mutationFn: (id: number) => taskService.deleteTask(id),
        onSuccess: () => {
            // Cache voor deze specifieke task verversen
            queryClient.invalidateQueries({ queryKey: ["task", task.id] });
            // Cache voor alle tasks van het project verversen
            queryClient.invalidateQueries({ queryKey: ["tasks", task.project.id] });
            setIsDeleting(false);
            navigate(`/projects/${task.project.id}`);
        },
    });

    return (
        <div className="flex flex-col gap-2 text-white rounded shadow">
            {isDeleting ? (
                <>
                    <p>Are you sure you want to delete this task?</p>
                    <div className="flex gap-2">
                        <button
                            className="border border-red-500 px-4 py-2 hover:bg-red-500 hover:text-black"
                            onClick={() => deleteTaskMutation.mutate(task.id)}
                        >
                            Delete
                        </button>
                        <button
                            className="border border-gray-500 px-4 py-2 hover:bg-gray-500 hover:text-black"
                            onClick={() => setIsDeleting(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <button
                    className="border border-white px-4 py-2 mt-2 hover:bg-white hover:text-black"
                    onClick={() => setIsDeleting(true)}
                >
                    Delete task
                </button>
            )}
        </div>
    );
};

export default TaskDelete;
