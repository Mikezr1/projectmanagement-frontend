import { useNavigate, useParams } from "react-router-dom";
import taskService from "../services/taskService";
import { useQuery } from "@tanstack/react-query";
import type { TaskSummaryDTO } from "../types/models";
import FetchComments from "../components/FetchComments";
import GoToProject from "../components/goToProject";


const TaskDetailPage = () => {
    const navigate = useNavigate();

    const { projectId, taskId } = useParams();

    const handleAddComment = () => {
        {/*add add comment modal logic here */}
        console.log("clicked")
    }

    const {data: task, isLoading, isError, error} = useQuery<TaskSummaryDTO, Error>({
        queryKey: ['task', taskId],
        queryFn: () => taskService.getTask(taskId)
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error: { error?.message }</div>

    return (
        
        <div className="min-h-screen bg-linear-to-b from-black via-gray-600 to-black text-white">
            {/*add navbar here */}
            <div>
                <div>
                    {/*sidebar here */}
                </div>

                <main>
                    <section>
                        <GoToProject projectId={projectId} task={task!} />
                    </section>

                    <section className="flex bg-gray-700 text-white rounded shadow overflow-hidden">
                        <div className="flex-1 flex items-center justify-center border-r border-orange-600 px-4">
                            {task.title}
                            {/*role collapse here */}
                        </div>
                        <div className="flex-1 flex items-center justify-center border-r border-orange-600 px-4">
                            {task.user.role || "N/A"}
                        </div>
                        <div className="flex-1 flex items-center justify-center border-r border-orange-600 px-4">
                            {task.user.firstName}
                        </div>
                        <div className="flex-1 flex items-center justify-center border-r border-orange-600 px-4">
                            {task.status}
                        </div>
                    </section>

                    <section>
                        {task.description}
                    </section>

                    <section>
                        <div>
                            {/*TASK COMMENT */}
                            <button onClick={handleAddComment} type="button" >Add comment</button>
                        </div>
                        <FetchComments />
                    </section>
                </main>
            </div>
        </div>
    );
}

export default TaskDetailPage;