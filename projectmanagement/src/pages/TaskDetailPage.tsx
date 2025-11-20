import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TaskSummaryDTO, CommentSummaryDTO } from "../types/models";
import taskService from "../services/taskService";
import projectService from "../services/projectService";
import commentService from "../services/commentService";
import GoToProject from "../components/goToProject";
import { useState } from "react";
import AddComment from "../components/AddComment";

const TaskDetailPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>();
    const [newComment, setNewComment] = useState("");

    // --- Fetch task ---
    const { data: task, isLoading, isError, error } = useQuery<TaskSummaryDTO, Error>({
        queryKey: ["task", taskId],
        queryFn: () => taskService.getTask(taskId!),
        enabled: !!taskId,
    });

    // --- Fetch project ---
    const { data: project } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => projectService.getProject(projectId!),
        enabled: !!projectId,
    });

    // --- Fetch statuses ---
    const { data: statuses } = useQuery({
        queryKey: ["statuses"],
        queryFn: taskService.getAllStatuses,
    });

    // --- Mutation to update task status ---
    const updateStatusMutation = useMutation({
        mutationFn: ({ id, newStatus }: { id: number; newStatus: string }) =>
            taskService.updateTask(id, { status: newStatus }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["task", taskId] });
        },
    });

    const handleStatusChange = (taskId: number, newStatus: string) => {
        updateStatusMutation.mutate({ id: taskId, newStatus });
    };

    // --- Mutation to add comment ---
    const addCommentMutation = useMutation({
        mutationFn: (description: string) =>
            commentService.createComment({
                taskId: Number(taskId),
                userId: 1, // Pas dit aan naar ingelogde user
                description,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["task", taskId] }); // refresh task met comments
            setNewComment("");
        },
    });

    // --- Mutation to delete comment ---
    const deleteCommentMutation = useMutation({
        mutationFn: (commentId: number) => commentService.deleteComment(commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["task", taskId] });
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error?.message}</div>;

    return (
        <div className="w-[1200px] h-full flex flex-col">
            <div className="bg-black border-2 border-white p-4">
                <h1>Navbar</h1>
            </div>

            <div className="flex bg-black text-white h-[800px]">
                {/* Sidebar */}
                <div className="w-1/3 border-2 border-white border-t-0 p-4 flex flex-col">
                    <button className="border border-white px-4 py-2 mb-2 hover:bg-white hover:text-black">Edit task</button>
                    <button className="border border-white px-4 py-2 hover:bg-white hover:text-black">Delete task</button>

                    <p className="text-2xl pt-10 mt-6">Role list</p>
                    <div className="flex flex-col gap-2 mt-2">
                        {project?.users?.map((user) => (
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
                        <GoToProject projectId={projectId!} task={task} />

                        <p className="text-2xl pb-4">Task details</p>

                        <section className="flex bg-gray-700 text-white rounded shadow overflow-hidden">
                            <div className="flex-1 flex items-center justify-center border-r border-orange-600 px-4">
                                {task.title}
                            </div>
                            <div className="flex-1 flex items-center justify-center border-r border-orange-600 px-4">
                                {task.user.firstName}
                            </div>
                            <div className="flex-1 flex items-center justify-center border-r border-orange-600 px-4">
                                <select
                                    value={task.status}
                                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                >
                                    {statuses?.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1 flex items-center justify-center px-4">
                                {task.status}
                            </div>
                        </section>

                        <section>
                            <p className="text-2xl py-4">Task description</p>
                            {task.description}
                        </section>

                        {/* Comments */}
                        <section>
                            <p className="text-2xl py-4">Task comments</p>

                            {/* Add comment form */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (!newComment.trim()) return;
                                    addCommentMutation.mutate(newComment);
                                }}
                                className="mb-4"
                            >
                                <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Write a comment..."
                                    className="border p-2 rounded w-full mb-2 text-white"
                                />
                                <button
                                    type="submit"
                                    disabled={addCommentMutation.isLoading}
                                    className="border-2 rounded p-2 hover:bg-white hover:text-black"
                                >
                                     Add Comment
                                </button>
                            </form>


                            {/* Comment list */}
                            {task.comments?.map((comment: CommentSummaryDTO) => (
                                <div key={comment.id} className="p-4 bg-gray-800 rounded shadow mb-2 flex justify-between items-center">
                                    <div>
                                        <div className="font-bold">{comment.user?.firstName ?? "Unknown"}</div>
                                        <div>{comment.description}</div>
                                    </div>
                                    <div>
                                        {/* Delete button only for comment owner */}
                                        {comment.user?.id === 1 && ( // Pas dit aan naar ingelogde user
                                            <button
                                                onClick={() => deleteCommentMutation.mutate(comment.id)}
                                                className="border-2 rounded p-1 hover:bg-white hover:text-black"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailPage;



