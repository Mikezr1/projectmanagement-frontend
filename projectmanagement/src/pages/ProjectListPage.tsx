import { useQuery } from "@tanstack/react-query"
import type { ProjectSummaryDTO } from "../types/models"
import projectService from "../services/projectService"
import { useNavigate } from "react-router-dom"

const ProjectList = () => {
    const navigate = useNavigate();
    
    const { data: projects, isLoading, isError, error } = useQuery<ProjectSummaryDTO[], Error>({
        queryKey: ['projects'],
        queryFn: projectService.getAllProjects,
    })

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>Error: { error.message }</div>

    return (
        <div>
            <div>
                {/* Navbar */}
            </div>
            <div>
                {/* Sidebar */}
            </div>
            <div>
                {projects?.map(project => (
                    <div key={project.id}>
                        <b><h2>{project.title}</h2></b>
                        <ul>
                            {project.tasks.map(task => (
                                <li key={task.id}>{task.title}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProjectList