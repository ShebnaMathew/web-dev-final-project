import React from "react";

const CommentItem = () => {
    return (
        <div className="pt-2 pb-2 wd-display-flex">
            <div className="wd-display-inline-block">
                <img src="/images/is-this-it.jpg" alt="" className="img-fluid wd-post-image-dims wd-circle-image"/>
            </div>
            <div className="wd-post-data-dims ps-3">
                <div>
                    <a href='/' className="wd-post-href">The Strokes</a>
                </div>
                <p>
                    Comment text
                    Comment text
                    Comment text
                    Comment text
                    Comment text
                    Comment text
                    Comment text
                    Comment text
                    Comment text
                    Comment text
                    Comment text
                    Comment text
                    Comment text
                </p>
            </div>
        </div>
    )
}
export default CommentItem;