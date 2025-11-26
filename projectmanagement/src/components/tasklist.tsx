import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import taskService from "../services/taskService";
import projectService from "../services/projectService";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

interface TasklistProps {
    projectId: number;
}

const Tasklist = ({ projectId }: TasklistProps) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { user } = useAuthStore();

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
    // const todoTasks = sortedTasks.filter(task => task.status?.toLowerCase() !== "done");
    // const doneTasks = sortedTasks.filter(task => task.status?.toLowerCase() === "done");

    return (
        <div className="tasklist rounded">
            <table className="bg-gray-700 text-white rounded m-2 p-2">
                <tbody className="">
                    {/* TODO: switch to todoTasks later */}
                    {sortedTasks?.map((task) => (
                        <tr key={task.id} className="border-4 border-black text-white rounded p-2">
                            <td className="hover:underline p-2 border-r border-orange-600" onClick={() => handleToDetail(task.id)}>
                                {task.title}
                            </td>
                            <td className="p-2 border-r border-orange-600">{task.user?.firstName ?? "No user"}</td>
                            <td className="p-2 border-r border-orange-600">{task.user ? `${task.user.firstName} ${task.user.lastName}` : "No user"}</td>

                            <td className="p-2 border-r border-orange-600">
                                <select
                                    value={task.status}
                                    disabled={user?.role === "CUSTOMER"}
                                    className="bg-gray-700 text-white border border-gray-700 rounded px-3 py-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                                <span className="m-2 items-center p-1 justify-center w-8 h-8 rounded border-1 border-white">
                                    {task.status}
                                </span>
                            </td>
                        </tr>    
                    ))}
                </tbody>
            </table>
        </div>
        // <div className="tasklist rounded">
        //     <table className="table-fixed w-full bg-gray-700 text-white rounded m-2 p-2">
        //         <tbody>
        //             {todoTasks?.map((task) => (
        //                 <tr key={task.id} className="border-4 border-black text-white rounded p-2">
        //                     <td className="hover:underline p-2 border-r border-orange-600" onClick={() => handleToDetail(task.id)}>
        //                         {task.title}
        //                     </td>
        //                     {/* <td className="p-2 border-r border-orange-600">{task.user?.firstName ?? "No user"}</td> */}
        //                     <td className="p-2 border-r border-orange-600">{task.user ? `${task.user.firstName} ${task.user.lastName}` : "No user"}</td>
        //                     <td className="p-2 border-r border-orange-600">
        //                         <select
        //                             value={task.status}
        //                             className="bg-gray-700 text-white border border-gray-700 rounded px-3 py-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        //                             disabled={user?.role === "CUSTOMER"}
        //                             onChange={(e) => handleStatusChange(task.id, e.target.value) }
        //                         >
        //                             {statuses?.map((status) => (
        //                                 <option key={status} value={status}>
        //                                     {status}
        //                                 </option>
        //                             ))}
        //                         </select>
        //                     </td>
        //                     <td>
        //                         <span className="m-2 items-center p-1 justify-center w-8 h-8 rounded border-1 border-white">
        //                             {task.status}
        //                         </span>
        //                     </td>
        //                 </tr>    
        //             ))}
        //         </tbody>
        //     </table>

        //     {doneTasks.length > 0 && <div className="w-full h-[2px] bg-gray-500 my-2 mx-2" />}
            
        //     <table className="table-fixed w-full bg-gray-700 text-white rounded m-2 p-2">
        //         <tbody className="">
        //             {doneTasks?.map((task) => (
        //                 <tr key={task.id} className="border-4 border-black text-white rounded p-2">
        //                     <td className="hover:underline p-2 border-r border-orange-600" onClick={() => handleToDetail(task.id)}>
        //                         {task.title}
        //                     </td>
        //                     <td className="p-2 border-r border-orange-600">{task.user?.firstName ?? "No user"}</td>
        //                     <td className="p-2 border-r border-orange-600">
        //                         <select
        //                             value={task.status}
        //                             className="bg-gray-700 text-white border border-gray-700 rounded px-3 py-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        //                             disabled={user?.role === "CUSTOMER"}
        //                             onChange={(e) => handleStatusChange(task.id, e.target.value) }
        //                         >
        //                         {statuses?.map((status) => (
        //                             <option key={status} value={status}>
        //                                 {status}
        //                             </option>
        //                             ))}
        //                         </select>
        //                     </td>
        //                     <td>
        //                         <span className="m-2 items-center p-1 justify-center w-8 h-8 rounded border-1 border-white">
        //                             {task.status}
        //                         </span>
        //                     </td>
        //                 </tr>    
        //             ))}
        //         </tbody>
        //     </table>
        // </div>
    );
};

export default Tasklist;
