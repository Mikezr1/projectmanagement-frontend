import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import taskService from "../services/taskService";

interface TasklistProps {
    projectId: number;
}

const Tasklist = () => {

    const queryClient = useQueryClient();

    // 1. Tasks ophalen
    const { data: tasks, isLoading, isError, error } = useQuery({
        queryKey: ["tasks"],
        queryFn: taskService.getAllTasks,
    });

    // 2. Statussen ophalen
    const { data: statuses } = useQuery({
        queryKey: ["statuses"],
        queryFn: taskService.getAllStatuses,
    });

    // 3. Mutation om status up te daten naar backend
    const updateStatusMutation = useMutation({
        mutationFn: ({ id, newStatus }) =>
            taskService.updateTask(id, { status: newStatus }),

        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]); // ververs lijst
        },
    });

    // 4. Handler
    const handleStatusChange = (taskId: number, newStatus: string) => {
        updateStatusMutation.mutate({ id: taskId, newStatus });
    };

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

                            <td className="border-2 px-2 border-white">{task.title}</td>
                            <td className="border-2 px-2 border-white">{task.user?.firstName ?? "No user"}</td>

                            <td className="border-2 px-2 border-white">
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
