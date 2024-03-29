import React from "react";
import {Link} from "react-router-dom";

const FollowPopupListItem = ({setShowFollow, name, profilePicture, id}) => {
    return (
        <div className="wd-follow-popup-entry ps-3">
            <img className="img-fluid wd-full-height wd-circle-image" src={profilePicture ? profilePicture : "/images/blank-profile-picture.png"} alt=""/>
            <Link onClick={() => setShowFollow(false)} to={id ? `/profile/${id}` : '/profile' } className="wd-display-inline-block ps-3">
                @{name}
            </Link>
        </div>
    )
}
export default FollowPopupListItem;