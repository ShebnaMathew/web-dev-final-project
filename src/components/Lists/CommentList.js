import React from "react";
import CommentItem from "../PostItems/ListCommentItem";
import './list.css';

const CommentList = (comments = { comments: [] }) => {
    const commentContents = comments.comments;
    return (
        <>
            {
                (commentContents !== undefined && commentContents.length > 0) &&
                commentContents.map(comment => <CommentItem key={comment.id} comment={comment}/>)
            }
            {
                (commentContents !== undefined && commentContents.length === 0) &&
                <div className="wd-empty-list">No comments... yet!!</div>
            }
        </>
    )
}
export default CommentList;