import { useQuery } from "@tanstack/react-query"
import commentService from "../services/commentService"
import type { CommentSummaryDTO } from "../types/models"


export default function FetchComments() {
    const {data: comments, isLoading, isError, error} = useQuery<CommentSummaryDTO[], Error>({
            queryKey: ['comments'],
            queryFn: commentService.getAllComments
        })
        console.log(comments);
        if (isLoading) return <div>Loading</div>
        if (isError) return <div>Error: { error?.message }</div>

        return (
            <div className="flex flex-col gap-4">
            {comments?.map(comment => (
                <div key={comment.id} className="p-4 bg-grey-800 rounded shadow">
                    <div>
                        {comment.user ? `${comment.user.firstName} ${comment.user.lastName}` : "Unknown"}
                    </div>
                    <div>
                        {comment.description || "No Description"}
                    </div>
                    <div>
                        {/*Button here if owner here */}
                    </div>
                </div>
            ))}
            </div>
        )
}