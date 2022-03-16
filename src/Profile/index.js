import React, {useState} from 'react';
import './profile.css';
import CommentList from "./CommentList";
import LikedList from "./LikedList";
import MusicList from "./MusicList";
import FollowPopUp from "./FollowPopUp/FollowPopUp";

const ProfileScreen = () => {

    const [content, setContent] = useState('comments');
    const [showFollow, setShowFollow] = useState(true);
    const [followTitle, setFollowTitle] = useState("followers")

    const isCurrentUser = true;
    const isMusician = true;
    const isFollowing = false;

    const renderContent = (content) => {
        switch (content) {
            case 'likes':
                return (<LikedList/>);
            case 'music':
                return (<MusicList/>);
            default:
                return (<CommentList/>)
        }
    }

    const renderNav = (currentContent, sectionContent, label) => {
        if (currentContent === sectionContent) {
            return(
                <li className="nav-item wd-nav-item-width">
                    <button onClick={() => setContent(sectionContent)}
                            className="wd-fg-color-white wd-nav-link-button wd-active-link">
                        {label}
                    </button>
                </li>
            );
        } else {
            return(
                <li className="nav-item wd-nav-item-width">
                    <button onClick={() => setContent(sectionContent)}
                            className="wd-fg-color-white wd-nav-link-button">
                        {label}
                    </button>
                </li>
            );
        }
    }

    const setFollowPopupVals = (title) => {
        setShowFollow(true);
        setFollowTitle(title);
    }

    const renderFollow = () => {
        if (showFollow) {
            if (followTitle === "followers") {
                return (
                    <FollowPopUp title="Followers" setShowFollow={setShowFollow}/>
                );
            } else if (followTitle === "following") {
                return (
                    <FollowPopUp title="Following" setShowFollow={setShowFollow}/>
                );
            }
        }
    }

    const renderPrivateInfo = () => {
        if(isCurrentUser) {
            return (
                <>
                    <div className="wd-display-conditional-block pe-3">
                        <i className="far fa-id-card wd-font-size-16"/>
                        <span className="ps-2 wd-font-size-16">Name</span>
                    </div>
                    <div className="wd-display-conditional-block pe-3">
                        <i className="fa fa-birthday-cake wd-font-size-16"/>
                        <span className="ps-2 wd-font-size-16">DOB</span>
                    </div>
                    <div className="wd-display-conditional-block">
                        <i className="fa fa-at wd-font-size-16"/>
                        <span className="ps-2 wd-font-size-16">Email</span>
                    </div>
                </>
            );
        }
    }

    const renderMainInfoButton = () => {
        if (isCurrentUser) {
            return (<button className="btn btn-dark wd-username-button">Edit Profile</button>)
        }
        else if (isFollowing) {
            return (
                <button className="btn btn-dark wd-username-button">Unfollow</button>
            );
        } else {
            return (
                <button className="btn btn-dark wd-username-button">Follow</button>
            );
        }
    }

    return(
        <div>
            {renderFollow()}
            <div className="wd-profile-header-info-dims wd-position-relative wd-display-flex wd-main-outer-padding pt-2">
                <div className=" wd-display-inline-block pe-2">
                    <img className="img-fluid wd-profile-picture-dims wd-circle-image" src="/images/blank-profile-picture.png" alt=""/>
                </div>
                <div className="wd-display-inline-block wd-full-height wd-main-info-dims wd-main-info-padding wd-main-info-position">
                    <div className="wd-position-relative">
                        <div className="wd-display-conditional-block wd-username-field-dims wd-fg-color-white wd-font-size-26 wd-bold-font">Username</div>
                        <div className="wd-display-conditional-block wd-username-button-position">
                            {renderMainInfoButton()}
                        </div>
                    </div>
                    <div>
                        <div className="wd-display-conditional-block wd-follow-value-dims wd-fg-color-white wd-font-size-20 pe-3">
                            <button onClick={() => setFollowPopupVals('followers')} className="wd-follower-button ps-0 pe-0">
                                <span className="wd-bold-font pe-2">38</span>
                                <span>Followers</span>
                            </button>
                        </div>
                        <div className="wd-display-conditional-block wd-follow-value-dims wd-fg-color-white wd-font-size-20">
                            <button onClick={() => setFollowPopupVals('following')} className="wd-follower-button ps-0 pe-0">
                                <span className="wd-bold-font pe-2">38</span>
                                <span>Following</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <span className="wd-fg-color-white wd-font-size-20 wd-hide">Website</span>
                    </div>
                </div>
            </div>
            <div className="wd-fg-color-white wd-bottom-border-grey wd-description-info-padding pt-3 pb-3">
                <div>
                    <div className="wd-display-conditional-block pe-3">
                        <i className="far fa-calendar wd-font-size-16"/>
                        <span className="ps-2 wd-font-size-16">Joined</span>
                    </div>
                    {renderPrivateInfo()}
                </div>
                <div>
                    <div className="wd-bold-font wd-font-size-20">Bio</div>
                    <p className="wd-font-size-18 mb-0">I'm a biography</p>
                </div>
            </div>
            <div className="mt-3">
                <ul className="nav justify-content-center">
                    {renderNav(content, 'comments', 'Comments')}
                    {renderNav(content, 'likes', 'Likes')}
                    {isMusician && renderNav(content, 'music', 'Music')}
                </ul>
            </div>
            <div className="wd-content-section wd-fg-color-white ps-3 pe-3">
                {renderContent(content)}
            </div>
        </div>
    );
}
export default ProfileScreen;