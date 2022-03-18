import React from "react";
import './post-items.css';

const ContentPostItem = () => {
    return (
        <div className="pt-2 pb-2 wd-display-flex">
            <div className="wd-display-inline-block">
                <img src="/images/is-this-it.jpg" alt="" className="img-fluid wd-post-image-dims wd-circle-image"/>
            </div>
            <div className="wd-post-data-dims ps-3">
                <div>
                    <a href='/' className="wd-post-href">View Comment Page</a>
                </div>
                <div>
                    Artist: The Strokes
                </div>
                <div>
                    Album: Is This It
                </div>
                <div>
                    <i className="fa fa-comment"/>
                    <span> 11</span>
                    <i className="fa fa-heart ps-2"/>
                    <span> 12</span>
                </div>
            </div>
        </div>
    )
}

export default ContentPostItem;