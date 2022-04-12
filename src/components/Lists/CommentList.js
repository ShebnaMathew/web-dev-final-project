import React from "react";
import CommentItem from "../PostItems/ListCommentItem";
import './list.css';

const CommentList = (comments = { comments: [] }) => {
    const commentContents = comments.comments;
    console.log(commentContents)
    return (
        <>
            {
                (commentContents !== undefined && commentContents.length > 0) &&
                commentContents.map(comment => <CommentItem key={comment.id} comment={comment}/>)
            }
            {
                (commentContents !== undefined && commentContents.length === 0) &&
                <div className="wd-empty-list">
                    <div className="wd-empty-list-content-pos">
                        <i className="fa fa-2x fa-dizzy"/>
                        <div>There's nothing here...</div>
                    </div>
                </div>
            }
        </>
    )
}
export default CommentList;