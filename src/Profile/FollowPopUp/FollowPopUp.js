import React from "react";
import FollowPopupListItem from "./FollowPopUpListItem";
import './popup.css';

const FollowPopUp = ({
    setShowFollow = () => console.log("setShowFollow is undefined"),
    title = "Followers"
}) => {
    return (
        <div className="wd-follow-popup">
            <div className="wd-follow-popup-window">
                <div className="wd-popup-entry-header wd-position-relative ps-3">
                    <button onClick={() => setShowFollow(false)} className="wd-follow-popup-remove-button">
                        <i className="fa fa-remove fa-2x wd-popup-entry-header-icon-pos"/>
                    </button>
                    <div className="wd-popup-entry-header-title-pos">{title}</div>
                </div>
                <div className="mb-0 wd-popup-user-list">
                    <FollowPopupListItem/>
                    <FollowPopupListItem/>
                    <FollowPopupListItem/>
                    <FollowPopupListItem/>
                    <FollowPopupListItem/>
                    <FollowPopupListItem/>
                    <FollowPopupListItem/>
                    <FollowPopupListItem/>
                    <FollowPopupListItem/>
                    <FollowPopupListItem/>
                    <FollowPopupListItem/>
                    <FollowPopupListItem/>
                    <FollowPopupListItem/>
                    <FollowPopupListItem/>
                    <FollowPopupListItem/>
                    <FollowPopupListItem/>
                </div>
            </div>
        </div>
    )
}
export default FollowPopUp;