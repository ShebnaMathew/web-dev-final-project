import React from "react";
import './post-items.css';

const ListCommentItem = (comment) => {
    const commentContent = comment.comment;
    return(
        <div className="pt-2 pb-2 wd-display-flex">
            <div className="wd-display-inline-block">
                <img src={commentContent.image} alt="" className="img-fluid wd-post-image-dims wd-circle-image"/>
            </div>
            <div className="wd-post-data-dims ps-3">
                <div>
                    <a href='/' className="wd-post-href">View Comment</a>
                    <span> on {commentContent.itemName}</span>
                </div>
                <div>
                    <a href='/' className="wd-post-href">@{commentContent.username}</a>
                </div>
                <p className="wd-liked-comment mb-0">
                    {commentContent.comment}
                </p>
                <div>
                    <i className="fa fa-heart"/>
                    <span className="ms-1">{commentContent.likes}</span>
                </div>
            </div>
        </div>
    );
}
export default ListCommentItem;