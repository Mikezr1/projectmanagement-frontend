import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ProjectSummaryDTO } from "../types/models";
import projectService from "../services/projectService";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useState } from "react";
import AddProjectModal from "../modals/AddProjectModal.tsx";

const ProjectListPage = () => {
    const user = useAuthStore((state) => state.user);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const navigate = useNavigate();

    const { data: projects, isLoading, isError, error } = useQuery<ProjectSummaryDTO[], Error>({
        queryKey: ["projects", user?.id],
        queryFn: () => projectService.getProjectsByUserId(user!.id),
        enabled: !!user?.id,
    });

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id: number) => projectService.deleteProject(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["projects"]});
            setSelectedProjectId(null);
        }
    });

    if (isLoading) return <div>Loading projects...</div>;
    if (isError) return <div>Error: {error?.message}</div>;

    return (
        <div className="w-auto h-full flex flex-col">

            {/* Navbar */}
             <div className="bg-blue-950 p-4">
                <div className="bg-black rounded p-4 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <h1 className="text-white text-xl font-bold">Projectmanager Pro</h1>

                        <nav className="flex items-center gap-6">
                            <Link to="/projects" className="text-white hover:text-gray-300 transition-colors">
                                Projects
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="text-white hover:text-gray-300 transition-colors relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                        </button>

                        <span className="text-white">Hi, {user.firstName}</span>
                    </div>
                </div>
            </div>

            <div className="flex bg-black text-white h-[800px]">

                {/* Sidebar */}
                <div className="w-1/3 max-w-[400px] bg-blue-900 rounded p-4 m-4 flex flex-col">
                    <div className="flex flex-col gap-2 mt-2">
                    
                    <AddProjectModal />
                    
                    {/* <button className="border border-white px-4 py-2 mb-2 hover:bg-white hover:text-black">
                <div className="w-1/3 max-w-[400px] bg-blue-900 rounded p-4 m-4 flex flex-col">

                    <button className="border border-white px-4 py-2 mb-2 hover:bg-white hover:text-black">
                        Add project
                    </button> */}

                    <button
                        className="border border-white px-4 py-2 hover:bg-white hover:text-black"
                        onClick={() => {
                            if (!selectedProjectId) {
                                alert("Select a project first.");
                                return;
                            }

                            if (confirm("Are you sure you want to delete this project?")) {
                                deleteMutation.mutate(selectedProjectId);
                            }
                        }}
                    >
                        Delete project
                    </button>
                    </div>
                </div>

                {/* Project List */}
                <div className="w-2/3 max-w-[800px]  border-t-0 border-l-0 p-4">
                    {/* Breadcrumb */}
                    <div className="text-sm mb-4 text-gray-500 flex items-center gap-2">
                        <p>Projects</p>
                        <span>{">"}</span>
                    </div>

                    {projects?.map((project) => (
                        <div key={project.id} className="mb-6 bg-gray-700 text-white rounded p-4 flex items-center gap-3">

                            {/* ✔ checkbox werkt */}
                            <input
                                type="checkbox"
                                checked={selectedProjectId === project.id}
                                onChange={() =>
                                    setSelectedProjectId(
                                        selectedProjectId === project.id ? null : project.id
                                    )
                                }
                            />

                            <span
                                className="hover:underline cursor-pointer"
                                onClick={() => navigate(`/projects/${project.id}`)}
                            >
                                <h2 className="text-2xl font-bold mb-3">{project.title}</h2>
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ProjectListPage;
