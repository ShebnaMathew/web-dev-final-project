import React from "react";
import CommentItem from "../PostItems/ListCommentItem";

const CommentList = (comments = { comments: [] }) => {
    const commentContents = comments.comments;
    return (
        <>
            {
                commentContents !== undefined &&
                commentContents.map(comment => <CommentItem key={comment.id} comment={comment}/>)
            }
        </>
    )
}
export default CommentList;