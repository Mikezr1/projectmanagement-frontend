import { QueryClient } from "@tanstack/react-query";
import type { TaskSummaryDTO } from "../types/models";


export const updateTaskCache = (queryClient: QueryClient, updateTask: TaskSummaryDTO) => {
    queryClient.setQueryData(["task", String(updateTask.id)], updateTask);

    queryClient.setQueryData(["tasks", String(updateTask.project.id)], (old: TaskSummaryDTO[] | undefined) => {
        if (!old) return old;
        return old.map((task) => (task.id === updateTask.id ? updateTask : task));
    });
};