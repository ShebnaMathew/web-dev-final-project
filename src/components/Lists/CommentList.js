import React from "react";
import CommentItem from "../PostItems/ListCommentItem";
import './list.css';

const CommentList = ({comments = []}) => {
    return (
        <>
            {
                comments.map(comment => <CommentItem key={comment._id} comment={comment}/>)
            }
        </>
    )
}
export default CommentList;