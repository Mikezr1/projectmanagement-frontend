import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import projectService from "../services/projectService";
import Tasklist from "../components/tasklist";
import { useAuthStore } from "../stores/authStore";
import type { ProjectSummaryDTO } from "../types/models";

const ProjectDetailPage = () => {
    const { projectId } = useParams<{projectId: string}>();
    const numericProjectId = Number(projectId);

    const { user } = useAuthStore();

    // Project ophalen
    const { data: project, isLoading, isError, error } = useQuery<ProjectSummaryDTO, Error>({
        queryKey: ["project", projectId],
        queryFn: () => projectService.getProject(projectId),
        enabled: !!user?.id && !!projectId,
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError || !project) return <p>Error: {error?.message}</p>;

    return (
        <div className="w-[1200px] h-full flex flex-col">

            <div className="bg-black border-2 border-white p-4">
                <h1>Navbar</h1>
            </div>

            <div className="flex bg-black text-white h-[800px]">

                {/* Sidebar */}
                <div className="w-1/3 border-2 border-white border-t-0 p-4 flex flex-col">

                    <button className="border border-white px-4 py-2 mb-2 hover:bg-white hover:text-black">
                        Add member
                    </button>
                    <button className="border border-white px-4 py-2 hover:bg-white hover:text-black">
                        Add task
                    </button>

                    <p className="text-2xl pt-10">
                        Role List
                        
                    </p>
                </div>

                {/* Main content */}
                <div className="w-2/3 border-2 border-white border-t-0 border-l-0 p-4">

                    {/* Breadcrumb */}
                    <div className="text-sm mb-4 text-gray-500 flex items-center gap-2">
                        <NavLink to="/projects">Projects</NavLink>
                        <span>{">"}</span>
                        <span className="text-white font-semibold">{project.title}</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                    

                    {/* Task list komt hier nog */}
                    <Tasklist projectId={numericProjectId}/>

                </div>
            </div>
        </div>
    );
};

export default ProjectDetailPage;