import { useNavigate, useParams } from "react-router-dom";
import taskService from "../services/taskService";
import { useQuery } from "@tanstack/react-query";
import type { TaskSummaryDTO } from "../types/models";
import FetchComments from "../components/FetchComments";


const TaskDetailPage = () => {
    const navigate = useNavigate();

    const { taskId } = useParams();

    const {data: task, isLoading, isError, error} = useQuery<TaskSummaryDTO, Error>({
        queryKey: ['task', taskId],
        queryFn: () => taskService.getTask(taskId)
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error: { error?.message }</div>

    return (
        <>
            <div>{task.id}</div>
            <div>
                <FetchComments />
            </div>
        </>
    );
}

export default TaskDetailPage;