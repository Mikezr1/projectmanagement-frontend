import { useQuery } from "@tanstack/react-query"
import type { ProjectSummaryDTO } from "../types/models"
import projectService from "../services/projectService"
// import { useNavigate } from "react-router-dom"
import useAuthStore from "../components/useAuthStore"
import { NavLink, useNavigate } from "react-router-dom"

const ProjectListPage = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    
    const { data: projects, isLoading, isError, error } = useQuery<ProjectSummaryDTO[], Error>({
        queryKey: ['projects', user?.id],
        queryFn: projectService.getAllProjects,
        // queryKey: ['projects'],
        // queryFn: projectService.getAllProjects
    })

    if (isLoading) return <div>Loading...</div>

    if (isError) return <div>Error: { error?.message }</div>

    return (
    <div className="w-[1200px] h-full flex flex-col">
        <div className="bg-black border-2 border-white p-4">
            {/* Navbar */}
            <h1>Navbar</h1>
        </div>
        <div className="flex bg-black text-white h-[800px]">
            <div className="w-1/3 border-2 border-white border-t-0 p-4 flex flex-col">
                {/* Sidebar */}
                <p className="mb-4">Sidebar</p>
                <p>Tijdelijke nav</p> {/* zonder userId nog*/}
                <NavLink to="">home</NavLink>
                <NavLink to="">projects</NavLink>
                <NavLink to="">tasks</NavLink>
                <button className="border border-white px-4 py-2 mb-2 hover:bg-white hover:text-black">
                    Add Project
                </button>
                <button className="border border-white px-4 py-2 hover:bg-white hover:text-black">
                    Add Project
                </button>
            </div>
            <div className="w-2/3 border-2 border-white border-t-0 border-l-0 p-4">
                {projects?.map(project => (
                <div key={project.id} className="mb-6 border border-white p-4">
                    <span 
                    className=" hover:underline"
                    //needs task id from usestore
                    //onClick={() => navigate`tasks/${task.id}`)}>
                    onClick={() => navigate(`/projects/${project.id}`)}>
                        <h2 className="text-2xl font-bold mb-3">{project.title}</h2>
                    </span>
                </div>
                ))}
            </div>
        </div>
        <div>
            <button type="button" onClick={() => {}}>Logout</button>
        </div>
    </div>
)
}

export default ProjectListPage;