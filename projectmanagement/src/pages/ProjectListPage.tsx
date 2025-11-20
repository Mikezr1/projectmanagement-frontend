import { useQuery } from "@tanstack/react-query";
import type { ProjectSummaryDTO } from "../types/models";
import projectService from "../services/projectService";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, useAuthStore } from "../stores/authStore";

const ProjectListPage = () => {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    const { data: projects, isLoading, isError, error } = useQuery<ProjectSummaryDTO[], Error>({
        queryKey: ["projects", user?.id],
        queryFn: () => projectService.getProjectsByUserId(user!.id),
        enabled: !!user?.id,
    });

    if (isLoading) return <div>Loading projects...</div>;
    if (isError) return <div>Error: {error?.message}</div>;

    return (
        <div className="w-[1200px] h-full flex flex-col">
            {/* Navbar */}
            <div className="bg-black border-2 border-white p-4">
                <h1>Navbar</h1>
            </div>

            <div className="flex bg-black text-white h-[800px]">
                {/* Sidebar */}
                <div className="w-1/3 border-2 border-white border-t-0 p-4 flex flex-col">
                    <button className="border border-white px-4 py-2 mb-2 hover:bg-white hover:text-black">
                        Add project
                    </button>
                    <button className="border border-white px-4 py-2 hover:bg-white hover:text-black">
                        Delete project
                    </button>
                </div>

                {/* Project List */}
                <div className="w-2/3 border-2 border-white border-t-0 border-l-0 p-4">
                    {projects?.map((project) => (
                        <div key={project.id} className="mb-6 border border-white p-4">
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
