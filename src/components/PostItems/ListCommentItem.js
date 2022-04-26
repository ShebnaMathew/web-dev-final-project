import React from "react";
import './post-items.css';
import {useNavigate} from "react-router-dom";

const ListCommentItem = (comment) => {

    const navigate = useNavigate();

    const commentContent = comment.comment;

    return(
        <div className="pt-2 pb-2 wd-display-flex">
            <div className="wd-display-inline-block">
                <img src={commentContent.image_url} alt="" className="img-fluid wd-post-image-dims wd-circle-image"/>
            </div>
            <div className="wd-post-data-dims ps-3">
                <div>
                    <span className="wd-post-href wd-cursor-pointer" onClick={() => {
                        navigate("/" + commentContent.type + "/" + commentContent.post_id);
                    }}>View Comment</span>
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