import React from "react";
import './post-items.css';

const ListCommentItem = () => {
    return(
        <div className="pt-2 pb-2 wd-display-flex">
            <div className="wd-display-inline-block">
                <img src="/images/is-this-it.jpg" alt="" className="img-fluid wd-post-image-dims wd-circle-image"/>
            </div>
            <div className="wd-post-data-dims ps-3">
                <div>
                    <a href='/' className="wd-post-href">View Comment</a>
                    <span> on The Strokes</span>
                </div>
                <div>
                    <a href='/' className="wd-post-href">@Poster</a>
                </div>
                <p className="wd-liked-comment mb-0">
                    comment
                    comment
                    comment
                    comment
                    comment
                    comment
                    comment
                    comment
                    comment
                    comment
                    comment
                    comment
                    comment
                </p>
                <div>
                    <i className="fa fa-heart"/>
                    <span> 12</span>
                </div>
            </div>
        </div>
    );
}
export default ListCommentItem;