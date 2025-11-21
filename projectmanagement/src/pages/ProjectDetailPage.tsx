import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import projectService from "../services/projectService";
import Tasklist from "../components/tasklist";
import { useAuthStore } from "../stores/authStore";
import type { ProjectSummaryDTO } from "../types/models";
import AddMemberModal from "../modals/AddMemberModal";
import AddTaskModal from "../modals/AddTaskModal";

const ProjectDetailPage = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const numericProjectId = Number(projectId);

    const { user } = useAuthStore();
    const navigate = useNavigate();


    // Project ophalen
    const { data: project, isLoading, isError, error } = useQuery<ProjectSummaryDTO, Error>({
        queryKey: ["project", numericProjectId],
        queryFn: () => projectService.getProject(numericProjectId),
        enabled: !!user?.id && !!numericProjectId,
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError || !project) return <p>Error: {error?.message}</p>;

    return (
        <div className="w-auto h-full flex flex-col">

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
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            type="button"
                            onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/");                
                            }}
                        >
                            Logout
                        </button>

                    </div>
                </div>
            </div>

            <div className="flex bg-black text-white h-[800px]">

                {/* Sidebar */}
                <div className="w-1/3 max-w-[400px] bg-blue-900 rounded p-4 m-4 flex flex-col">
                    <div className="flex flex-col gap-2 mt-2">
                        <AddMemberModal projectId={numericProjectId} />
                        <AddTaskModal projectId={numericProjectId} />
                    </div>
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
                <div className="w-2/3 max-w-[800px]  border-t-0 border-l-0 p-4">

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