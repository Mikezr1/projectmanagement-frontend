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
                        <div>
                            <div>
                                {/*task name here */}
                                {/*role collapse here */}
                            </div>
                            <div>
                                {/*task owner? here */}
                            </div>
                            <div>
                                {/*status here */}
                                {/*button here here */}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <div>{/* TASK DESCRIPTION TITLE */}</div>
                        <div>{/*description here */}</div>
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