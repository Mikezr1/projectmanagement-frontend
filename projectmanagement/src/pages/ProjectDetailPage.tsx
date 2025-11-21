import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import projectService from "../services/projectService";
import Tasklist from "../components/tasklist";
import { useAuthStore } from "../stores/authStore";
import type { ProjectSummaryDTO } from "../types/models";
import AddMemberModal from "../modals/AddMemberModal";

const ProjectDetailPage = () => {
    const { projectId } = useParams<{projectId: string }>();
    const numericProjectId = Number(projectId);

    const { user } = useAuthStore();

    // Project ophalen
    const { data: project, isLoading, isError, error } = useQuery<ProjectSummaryDTO, Error>({
        queryKey: ["project", numericProjectId],
        queryFn: () => projectService.getProject(numericProjectId),
        enabled: !!user?.id && !!numericProjectId,
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
                <AddMemberModal projectId={numericProjectId} />
                    {/* <button className="border border-white px-4 py-2 mb-2 hover:bg-white hover:text-black">
                        Add member
                    </button> */}
                    <button className="border border-white px-4 py-2 hover:bg-white hover:text-black">
                        Add task
                    </button>

                    <p className="text-2xl pt-10 mt-6">Role list</p>

                    <div className="flex flex-col gap-2 mt-2">
                        {project.users?.map((user) => (
                            <div
                                key={user.id}
                                className="flex gap-2 border p-2 bg-gray-100 text-black rounded"
                            >
                                <p>{user.firstName} {user.lastName}</p>
                                <p className="lowercase">({user.role})</p>
                            </div>
                        ))}
                    </div>

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
                    <Tasklist projectId={numericProjectId} />

                </div>
            </div>
        </div>
    );
};

export default ProjectDetailPage;