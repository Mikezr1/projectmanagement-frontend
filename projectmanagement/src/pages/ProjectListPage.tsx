import { useQuery } from "@tanstack/react-query"
import type { ProjectSummaryDTO } from "../types/models"
import projectService from "../services/projectService"
import { useNavigate } from "react-router-dom"

const ProjectListPage = () => {
    const navigate = useNavigate();
    
    const { data: projects, isLoading, isError, error } = useQuery<ProjectSummaryDTO[], Error>({
        queryKey: ['projects'],
        queryFn: projectService.getAllProjects
    })

    if (isLoading) return <div>Loading...</div>

    if (isError) return <div>Error: { error?.message }</div>

    return (
        <div>
            <div>
                {/* Navbar */}
                <h1>b</h1>
            </div>
            <div>
                {/* Sidebar */}
                <h1>a</h1>
            </div>
            <div className="">
                {projects?.map(project => (
                    <div key={project.id}>
                        <span 
                        className=" hover:underline"
                        //needs task id from usestore
                        //onClick={() => navigate(`tasks/${task.id}`)}>
                        onClick={() => navigate(`/projects/${project.id}`)}>
                            <h2>{project.title}</h2>
                        </span>

                        {/* <ul>
                            {project.tasks?.map(task => (
                                <li key={task.id}>{task.title}</li>
                            ))}
                        </ul> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProjectListPage;