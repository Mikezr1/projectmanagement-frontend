import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import taskService from "../services/taskService";
import projectService from "../services/projectService";
import { useNavigate } from "react-router-dom";

interface TasklistProps {
    projectId: number;
}

const Tasklist = ({ projectId }: TasklistProps) => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // 1. Tasks ophalen
    const { data: tasks, isLoading, isError, error } = useQuery({
        queryKey: ["tasks", projectId],
        queryFn: () => projectService.getTasksByProjectId(projectId),
        enabled: !!projectId,
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, newStatus }: { id: number; newStatus: string}) =>
            taskService.updateTask(id, { status: newStatus }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks", projectId]});
        },
    });

    const handleStatusChange = (taskId: number, newStatus: string) => {
        updateStatusMutation.mutate({ id: taskId, newStatus });
    };

    const handleToDetail = (id:number) => {
        navigate(`/projects/${projectId}/tasks/${id}`)
    }

    // 5. Pas hier return gebruiken!
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    // 6. regel om de sortering te regelen
    const sortedTasks = [...tasks].sort((a, b) => a.id - b.id);


    return (
        <div className="tasklist">
            <table className="border-2 border-white">
                <tbody>
                    {sortedTasks?.map((task) => (
                        <tr className="border-2 px-2 border-white" key={task.id}>
                            <th className="border-2 px-2 border-white">
                                <input type="checkbox" />
                            </th>

                            <td className="border-2 px-2 border-white hover:underline" onClick={() => handleToDetail(task.id)}>{task.title}</td>
                            <td className="border-2 px-2 border-white">{task.user?.firstName ?? "No user"}</td>

                            <td className="border-2 px-2 border-white">
                                <select
                                    value={task.status}
                                    onChange={(e) =>
                                        handleStatusChange(task.id, e.target.value)
                                    }
                                >
                                    <option value={task.status}>{task.status}</option>
                                </select>
                            </td>

                            <td className="p-1">
                                <span className="m-2 items-center p-1 justify-center w-8 h-8 rounded border-2 border-white">
                                    {task.status}
                                </span>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tasklist;
