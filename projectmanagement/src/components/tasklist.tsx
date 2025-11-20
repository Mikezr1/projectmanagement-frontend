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

    // 1. Tasks ophalen per project
    const { data: tasks, isLoading, isError, error } = useQuery({
        queryKey: ["tasks", projectId],
        queryFn: () => projectService.getTasksByProjectId(projectId),
        enabled: !!projectId,
    });

    // 2. Alle statussen ophalen
    const { data: statuses } = useQuery({
        queryKey: ["statuses"],
        queryFn: taskService.getAllStatuses,
    });

    // 3. Mutation om status te updaten
    const updateStatusMutation = useMutation({
        mutationFn: ({ id, newStatus }: { id: number; newStatus: string }) =>
            taskService.updateTask(id, { status: newStatus }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
        },
    });

    const handleStatusChange = (taskId: number, newStatus: string) => {
        updateStatusMutation.mutate({ id: taskId, newStatus });
    };

    const handleToDetail = (id: number) => {
        navigate(`/projects/${projectId}/tasks/${id}`);
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    const sortedTasks = [...tasks].sort((a, b) => a.id - b.id);

    return (
        <div className="tasklist">
            <table className="border-2 border-white">
                <tbody >
                    {sortedTasks?.map((task) => (
                        <tr key={task.id} className="border-2 p-2 border-white">
                            <th className="border-2 p-2 border-white">
                                <input type="checkbox" />
                            </th>

                            <td className="hover:underline border-2 p-2 " onClick={() => handleToDetail(task.id)}>
                                {task.title}
                            </td>
                            <td className="border-2 p-2 border-white">{task.user?.firstName ?? "No user"}</td>

                            <td className="border-2 p-2 border-white">
                                <select
                                    value={task.status}
                                    onChange={(e) =>
                                        handleStatusChange(task.id, e.target.value)
                                    }
                                >
                                    {statuses?.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </td>

                            <td>
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
