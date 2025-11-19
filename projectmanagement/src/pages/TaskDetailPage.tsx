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
            {/*add navbar here */}
            <div>
                <div>
                    {/*sidebar here */}
                </div>

                <div>
                    <div>
                        <h1>{/*file path name here */}</h1>
                            <h1>{task.project.title}</h1>
                                <h1>-</h1>
                            <h1>{task.title}</h1>
                        <div>
                            <div>
                                {/*task name here */}
                                {task.title}
                                {/*role collapse here */}
                            </div>
                            <div>
                                {/*task owner? here */}
                                {task.user.firstName}
                            </div>
                            <div>
                                {/*status here */}
                                {task.status}
                                {/*button here here */}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <div>{/* TASK DESCRIPTION TITLE */}</div>
                        <div>{/*description here */}</div>
                        {task.description}
                    </div>
                </div>

                <div>
                    <div>
                        {/*TASK COMMENT */}
                        {/*add comment button here */}
                    </div>
                    <FetchComments />
                </div>
            </div>
        </>
    );
}

export default TaskDetailPage;