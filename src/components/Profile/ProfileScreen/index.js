import React, {useEffect, useState} from 'react';
import CommentList from "../../Lists/CommentList";
import LikedList from "../../Lists/LikedList";
import MusicList from "../../Lists/MusicList";
import PopUp from "../../PopUp/PopUp";
import {useDispatch, useSelector} from "react-redux";
import FollowPopUpList from "../../PopUp/FollowPopUp";
import './profile.css';
import '../profile-main.css';
import {Link, useParams} from "react-router-dom";
import {getCurrentProfile} from "../../../actions/profile-actions";

const ProfileScreen = () => {

    // get data from api
    const dispatch = useDispatch();

    // fetch from session
    const { _id } = useParams();
    useEffect(() => getCurrentProfile(dispatch, _id), [_id]);

    // if _id is undefined, is root profile
    let isCurrentUser = false;
    if (_id === undefined) {
        isCurrentUser = true;
    }

    // get data from local reducers
    let profileData = useSelector((state) => state.currentProfile);

    const isFollowing = false;

    const [content, setContent] = useState('comments');
    const [showFollow, setShowFollow] = useState(false);
    const [followTitle, setFollowTitle] = useState("followers")

    const renderContent = (content) => {
        switch (content) {
            case 'likes':
                return (<LikedList likes={profileData.likes}/>);
            case 'music':
                return (<MusicList music={profileData.music}/>);
            default:
                return (<CommentList comments={profileData.comments}/>)
        }
    }

    const renderNav = (currentContent, sectionContent, label) => {
        if (currentContent === sectionContent) {
            return(
                <li className="nav-item wd-nav-item-padding">
                    <button onClick={() => setContent(sectionContent)}
                            className="wd-fg-color-white wd-nav-link-button wd-active-link">
                        {label}
                    </button>
                </li>
            );
        } else {
            return(
                <li className="nav-item wd-nav-item-padding">
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
                    <PopUp title="Followers" setShow={setShowFollow} Content={FollowPopUpList} contentParams={{setShowFollow: setShowFollow}}/>
                );
            } else if (followTitle === "following") {
                return (
                    <PopUp title="Following" setShow={setShowFollow} Content={FollowPopUpList} contentParams={{setShowFollow: setShowFollow}}/>
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
                        <span className="ps-2 wd-font-size-16">{profileData.name}</span>
                    </div>
                    <div className="wd-display-conditional-block pe-3">
                        <i className="fa fa-birthday-cake wd-font-size-16"/>
                        <span className="ps-2 wd-font-size-16">Born {formatDOB(profileData.dob)}</span>
                    </div>
                    <div className="wd-display-conditional-block">
                        <i className="fa fa-at wd-font-size-16"/>
                        <span className="ps-2 wd-font-size-16">{profileData.email}</span>
                    </div>
                </>
            );
        }
    }

    const renderMainInfoButton = () => {
        if (isCurrentUser) {
            return (<Link to="/editProfile" className="btn btn-dark wd-username-button">Edit Profile</Link>)
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

    const determineMonth = (month) => {
        const numericMonth = parseInt(month);
        switch (numericMonth) {
            case 1:
                return "January";
            case 2:
                return "February";
            case 3:
                return "March";
            case 4:
                return "April";
            case 5:
                return "May";
            case 6:
                return "June";
            case 7:
                return "July";
            case 8:
                return "August";
            case 9:
                return "September";
            case 10:
                return "October";
            case 11:
                return "November";
            case 12:
                return "December";
            default:
                return "";
        }
    }

    const formatDOB = (date) => {
        if (date === undefined) {
            return '';
        }
        const dateVals = date.split("-");
        const month = determineMonth(dateVals[1]);
        return `${month} ${dateVals[2]}, ${dateVals[0]}`
    }

    const formatJoinedDate = (date) => {
        if (date === undefined) {
            return '';
        }
        const dateVals = date.split("-");
        const month = determineMonth(dateVals[1]);
        return `${month} ${dateVals[0]}`
    }

    return(
        <div>
            {renderFollow()}
            <div className="wd-profile-header-info-dims wd-position-relative wd-display-flex wd-main-outer-padding pt-2">
                <div className=" wd-display-inline-block pe-2">
                    <img className="img-fluid wd-profile-picture-dims wd-circle-image" src={profileData.profilePicture} alt=""/>
                </div>
                <div className="wd-display-inline-block wd-full-height wd-main-info-dims wd-main-info-padding wd-main-info-position">
                    <div className="wd-position-relative">
                        <div className="wd-display-conditional-block wd-username-field-dims wd-fg-color-white wd-font-size-26 wd-bold-font">{profileData.username}</div>
                        <div className="wd-display-conditional-block wd-username-button-position">
                            {renderMainInfoButton()}
                        </div>
                    </div>
                    <div>
                        <div className="wd-display-conditional-block wd-follow-value-dims wd-fg-color-white wd-font-size-20 pe-3">
                            <button onClick={() => setFollowPopupVals('followers')} className="wd-follower-button ps-0 pe-0">
                                <span className="wd-bold-font pe-2">{profileData.followerCount}</span>
                                <span>Followers</span>
                            </button>
                        </div>
                        <div className="wd-display-conditional-block wd-follow-value-dims wd-fg-color-white wd-font-size-20">
                            <button onClick={() => setFollowPopupVals('following')} className="wd-follower-button ps-0 pe-0">
                                <span className="wd-bold-font pe-2">{profileData.followingCount}</span>
                                <span>Following</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <span className="wd-fg-color-white wd-font-size-20 wd-hide">{profileData.website}</span>
                    </div>
                </div>
            </div>
            <div className="wd-fg-color-white wd-bottom-border-grey wd-description-info-padding pt-3 pb-3">
                <div>
                    <div className="wd-display-conditional-block pe-3">
                        <i className="far fa-calendar wd-font-size-16"/>
                        <span className="ps-2 wd-font-size-16">Joined {formatJoinedDate(profileData.joined)}</span>
                    </div>
                    {renderPrivateInfo()}
                </div>
                <div>
                    <div className="wd-bold-font wd-font-size-20">Bio</div>
                    <p className="wd-font-size-18 mb-0">{profileData.bio}</p>
                </div>
            </div>
            <div className="mt-3">
                <ul className="nav justify-content-center">
                    {renderNav(content, 'comments', 'Comments')}
                    {renderNav(content, 'likes', 'Likes')}
                    {profileData.isArtist && renderNav(content, 'music', 'Music')}
                </ul>
            </div>
            <div className="wd-content-section wd-fg-color-white ps-3 pe-3">
                {renderContent(content)}
            </div>
        </div>
    );
}
export default ProfileScreen;