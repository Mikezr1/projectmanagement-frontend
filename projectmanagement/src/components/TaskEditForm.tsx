import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskSummaryDTO } from "../types/models";
import taskService from "../services/taskService";
import { updateTaskCache } from "./reactQueryHelpers";

interface TaskEditFormProps {
    task: TaskSummaryDTO;
    statuses: string[];
}

const TaskEditForm = ({ task, statuses }: TaskEditFormProps) => {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description);
    const [editStatus, setEditStatus] = useState(task.status);

   const updateTaskMutation = useMutation({
    mutationFn: ({ id, title, description, status }: { id: number; title: string; description: string; status: string }) =>
        taskService.updateTask(id, { title, description, status }),
    onSuccess: (updatedTask) => {
        queryClient.setQueryData(["task", updatedTask.id], (old: TaskSummaryDTO | undefined) => {
            if (!old) return updatedTask;

            return {
                ...updatedTask,
                status: updatedTask.status ?? old.status,
                comments: old.comments,
            };
        });

        updateTaskCache(queryClient, updatedTask);
        setIsEditing(false);
    },
});



    return (
        <div className="flex flex-col gap-2 text-white rounded shadow">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="p-2 rounded bg-gray-700 text-white"
                        placeholder="Title"
                    />
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="p-2 rounded bg-gray-700 text-white"
                        placeholder="Description"
                    />
                    <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="p-2 rounded bg-gray-700 text-white"
                    >
                        {statuses.map((status) => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                    <div className="flex gap-2 mt-2">
                        <button
                            className="border border-green-500 px-4 py-2 hover:bg-green-500 hover:text-black"
                            onClick={() =>
                                updateTaskMutation.mutate({
                                    id: task.id,
                                    title: editTitle,
                                    description: editDescription,
                                    status: editStatus,
                                })
                            }
                        >
                            Save
                        </button>

                        <button
                            className="border border-gray-500 px-4 py-2 hover:bg-gray-500 hover:text-black"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <button
                    className="border border-white px-4 py-2 mt-2 hover:bg-white hover:text-black"
                    onClick={() => setIsEditing(true)}
                >
                    Edit task
                </button>
            )}
        </div>
    );
};

export default TaskEditForm;
