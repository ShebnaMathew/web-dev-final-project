import React from "react";
import './post-items.css';

const ListCommentItem = (comment) => {
    console.log(comment)
    const commentContent = comment.comment;
    const route = commentContent.type + '/' + commentContent.post_id;
    console.log(commentContent);

    return(
        <div className="pt-2 pb-2 wd-display-flex">
            <div className="wd-display-inline-block">
                <img src={commentContent.image_url} alt="" className="img-fluid wd-post-image-dims wd-circle-image"/>
            </div>
            <div className="wd-post-data-dims ps-3">
                <div>
                    <a href={route} className="wd-post-href">View Comment</a>
                    <span> on {commentContent.post_name}</span>
                </div>
                <p className="mb-0">
                    {commentContent.comment}
                </p>
            </div>
        </div>
    );
}
export default ListCommentItem;