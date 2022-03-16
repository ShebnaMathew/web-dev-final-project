import React from "react";

const LikedCommentItem = () => {
    return(
        <div className="pt-2 pb-2 wd-display-flex">
            <div className="wd-display-inline-block">
                <img src="/images/is-this-it.jpg" alt="" className="img-fluid wd-post-image-dims wd-circle-image"/>
            </div>
            <div className="wd-post-data-dims ps-3">
                <div>
                    <a href='/' className="wd-post-href">View Comment</a>
                </div>
                <div>
                    <a href='/' className="wd-post-href">@Poster</a>
                </div>
                <p className="wd-liked-comment">
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
            </div>
        </div>
    );
}
export default LikedCommentItem;