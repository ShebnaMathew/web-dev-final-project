import React from "react";
import {Link} from "react-router-dom";

const FollowPopupListItem = (setShowFollow, id) => {
    return (
        <div className="wd-follow-popup-entry ps-3">
            <img className="img-fluid wd-full-height wd-circle-image" src="/images/blank-profile-picture.png" alt=""/>
            <Link onClick={() => setShowFollow(false)} to={`/profile/${id}`} className="wd-display-inline-block ps-3">
                @Poster
            </Link>
        </div>
    )
}
export default FollowPopupListItem;