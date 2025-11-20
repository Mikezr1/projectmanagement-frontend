import { useNavigate, useParams } from "react-router-dom";
import taskService from "../services/taskService";
import { useQuery } from "@tanstack/react-query";
import type { TaskSummaryDTO } from "../types/models";
import FetchComments from "../components/FetchComments";
import GoToProject from "../components/goToProject";
import projectService from "../services/projectService";


const TaskDetailPage = () => {
    const navigate = useNavigate();

    const { projectId, taskId } = useParams();

    const handleAddComment = () => {
        {/*add add comment modal logic here */ }
        console.log("clicked")
    }

    const { data: task, isLoading, isError, error } = useQuery<TaskSummaryDTO, Error>({
        queryKey: ['task', taskId],
        queryFn: () => taskService.getTask(taskId)
    })

    const { data: project } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => projectService.getProject(projectId),
    });

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error: {error?.message}</div>

    return (

        <div className="w-[1200px] h-full flex flex-col">

            <div className="bg-black border-2 border-white p-4">
                <h1>Navbar</h1>
            </div>

            <div className="flex bg-black text-white h-[800px]">

                {/* Sidebar */}
                <div className="w-1/3 border-2 border-white border-t-0 p-4 flex flex-col">

                    <button className="border border-white px-4 py-2 mb-2 hover:bg-white hover:text-black">
                        Edit task
                    </button>
                    <button className="border border-white px-4 py-2 hover:bg-white hover:text-black">
                        Delete task
                    </button>

                    <p className="text-2xl pt-10 mt-6">Role list</p>
                    <div className="flex flex-col gap-2 mt-2">
                        {project.users?.map((user) => (
                            <div key={user.id} className="flex gap-2 border p-2 bg-gray-100 text-black rounded">
                                <p>{user.firstName} {user.lastName}</p>
                                <p className="lowercase">({user.role})</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main content */}
                <div className="w-2/3 border-2 border-white border-t-0 border-l-0 p-4">
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
        </div>
    );
}

export default TaskDetailPage;