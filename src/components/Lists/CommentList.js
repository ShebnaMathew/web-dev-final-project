import React from "react";
import CommentItem from "../PostItems/ListCommentItem";
import './list.css';

const CommentList = ({comments = []}) => {
    console.log("printing comments")
    console.log(comments)
    return (
        <>
            {
                comments.map(comment => <CommentItem key={comment.id} comment={comment}/>)
            }
        </>
    )
}
export default CommentList;