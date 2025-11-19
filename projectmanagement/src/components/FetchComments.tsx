import { useQuery } from "@tanstack/react-query"
import commentService from "../services/commentService"
import type { CommentSummaryDTO } from "../types/models"


export default function FetchComments() {
    const {data: comments, isLoading, isError, error} = useQuery<CommentSummaryDTO[], Error>({
            queryKey: ['comments'],
            queryFn: commentService.getAllComments
        })
    
        if (isLoading) return <div>Loading</div>
        if (isError) return <div>Error: { error?.message }</div>

        return (
            <>
            {comments?.map(comment=> {
                <div key={comment.id} className="">
                    <div>
                        {/*NAME here */}
                        {comment.user.firstName}
                    </div>
                    <div>
                        {/*DESCRIPTION here */}
                        {comment.description}
                    </div>
                    <div>
                        {/*Button here if owner here */}
                    </div>
                </div>
            })}
            </>
        )
}