import React, {useEffect, useState} from 'react';
import CommentList from "../../Lists/CommentList";
import LikedList from "../../Lists/LikedList";
import PopUp from "../../PopUp/PopUp";
import {useDispatch, useSelector} from "react-redux";
import FollowPopUpList from "../../PopUp/FollowPopUp";
import './profile.css';
import '../profile-main.css';
import {Link, useParams} from "react-router-dom";
import {getProfileAction} from "../../../actions/profile-actions";
import PostList from "../../NewsFeed/PostList";
import {addFollowAction, removeFollowAction} from "../../../actions/follow-actions";
import {getProfile} from "../../../services/backend/profile-service";
import {getArtist, search} from "../../../services/spotify/spotify-service";

const ProfileScreen = () => {

    // get data from api
    const dispatch = useDispatch();

    // fetch from session
    let { _id } = useParams();
    const user = useSelector((state) => state.user);

    // if _id is undefined, is root profile
    let isCurrentUser = false;
    if (_id === undefined) {
        _id = user._id;
        isCurrentUser = true;
    }

    useEffect(() => {
        if (_id !== undefined) {
            getProfileAction(dispatch, _id)
        }
    }, [_id]);

    const profileData = useSelector((state) => state.profile);

    const [isFollowing, setIsFollowing] = useState(false);
    const [content, setContent] = useState('comments');
    const [showFollow, setShowFollow] = useState(false);
    const [followTitle, setFollowTitle] = useState("followers")

    const [music, setMusic] = useState([]);
    const [showPost, setShowPost] = useState(false);
    const [post, setPost] = useState('');

    useEffect(() => {
        if (!isCurrentUser && profileData.followers) {
            for(const f of profileData.followers) {
                if (f._id === user._id) {
                    setIsFollowing(true)
                    break;
                }
            }
        }
    }, [profileData])


    const renderNothingHere = () => {
        return (
            <div className="wd-empty-list">
                <div className="wd-empty-list-content-pos">
                    <i className="fa fa-2x fa-dizzy"/>
                    <div>There's nothing here...</div>
                </div>
            </div>
        );
    }

    // const artist = await getArtist(profileData.artistId)
    // const results = await search(artist.name);
    // const albums = results.albums.items;


    const renderContent = (content) => {
        switch (content) {
            case 'likes':
                if (profileData.likes && profileData.likes.length > 0) {
                    return (
                        <div className="wd-content-section wd-center-content wd-fg-color-white ps-3 pe-3">
                            <PostList posts={profileData.likes}/>
                        </div>
                    )
                } else {
                    return renderNothingHere();
                }
            case 'music':
                if (music.length > 0) {
                    return <PostList posts={music}/>
                } else {
                    getArtist(profileData.artistId).then(async (artist) => {
                        const results = await search(artist.name);
                        const albums = results.albums.items;
                        setMusic(albums)
                    })
                    return <i className="fa wd-spinner-pos fa-3x fa-spinner fa-spin"/>
                }
            default:
                if (profileData.comments && profileData.comments.length > 0) {
                    return (
                        <div className="wd-content-section wd-center-content wd-fg-color-white ps-3 pe-3">
                            <CommentList comments={profileData.comments}/>
                        </div>
                    )
                } else {
                    return renderNothingHere();
                }
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
                    <PopUp title="Followers" setShow={setShowFollow} Content={FollowPopUpList} contentParams={{setShowFollow: setShowFollow, followers: profileData.followers}}/>
                );
            } else if (followTitle === "following") {
                return (
                    <PopUp title="Following" setShow={setShowFollow} Content={FollowPopUpList} contentParams={{setShowFollow: setShowFollow, following: profileData.following}}/>
                );
            }
        }
    }

    const renderPrivateInfo = () => {
        if(isCurrentUser) {
            return (
                <>
                    <div className="pe-3 wd-display-inline-block wd-hide-text-overflow">
                        <i className="far fa-id-card wd-font-size-16"/>
                        <span className="ps-2 wd-font-size-16">{profileData.name}</span>
                    </div>
                    <div className="pe-3 wd-display-inline-block wd-hide-text-overflow">
                        <i className="fa fa-birthday-cake wd-font-size-16"/>
                        <span className="ps-2 wd-font-size-16 wd-hide-text-overflow">Born {formatDOB(profileData.dob)}</span>
                    </div>
                    <div className="pe-3 wd-display-inline-block wd-hide-text-overflow">
                        <i className="fa fa-at wd-font-size-16"/>
                        <span className="ps-2 wd-font-size-16 wd-hide-text-overflow">{profileData.email}</span>
                    </div>
                </>
            );
        }
    }

    const addFollow = async () => {
        const userData = await getProfile(user._id);
        await addFollowAction(dispatch, user._id, profileData._id, userData.username, userData.profilePicture);
        setIsFollowing(true);
    }

    const removeFollow = async () => {
        await removeFollowAction(dispatch, user._id, profileData._id);
        setIsFollowing(false);
    }

    const renderMainInfoButton = () => {
        if (isCurrentUser) {
            return (<Link to="/editProfile" className="btn btn-secondary wd-username-button">Edit Profile</Link>)
        }
        else if (isFollowing) {
            return (
                <button onClick={() => removeFollow()} className="btn btn-secondary wd-username-button">Unfollow</button>
            );
        } else {
            return (
                <button onClick={() => addFollow()} className="btn btn-secondary wd-username-button">Follow</button>
            );
        }
    }

    const renderUserInfo = () => {
        return (
            <>
                <div className="pe-3 wd-display-inline-block wd-hide-text-overflow">
                    <i className="far fa-calendar wd-font-size-16"/>
                    <span className="ps-2 wd-font-size-16">Joined {formatJoinedDate(profileData.joined)}</span>
                </div>
                {renderPrivateInfo()}
                {profileData.isAdmin &&
                    <div className="pe-3 wd-display-inline-block wd-hide-text-overflow">
                        <i className="fa fa-user-cog wd-font-size-16"/>
                        <span className="ps-2 wd-font-size-16 wd-hide-text-overflow">Admin</span>
                    </div>
                }
                {profileData.isArtist &&
                    <div className="pe-3 wd-display-inline-block wd-hide-text-overflow">
                        <i className="fa fa-guitar wd-font-size-16"/>
                        <Link to={`/artist/${profileData.artistId}`} className="ps-2 wd-font-size-16 wd-hide-text-overflow wd-artist-link-override">{profileData.artistName}</Link>
                    </div>
                }
            </>
        );
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
        <div className="row justify-content-center pt-3">
            <div className="wd-profile-content-width">
                {renderFollow()}
                <div className="wd-profile-header-info-dims wd-profile-header-info-max-width wd-position-relative wd-display-flex wd-main-outer-padding pt-2">
                    <div className=" wd-display-inline-block pe-2">
                        <img className="img wd-profile-picture-dims wd-circle-image" src={profileData.profilePicture ? profileData.profilePicture : "/images/blank-profile-picture.png"} alt=""/>
                    </div>
                    <div className="wd-display-inline-block wd-full-height wd-main-info-dims-profile wd-main-info-padding wd-main-info-position">
                        {!profileData.website &&
                            <div className="wd-missing-website-margin"/>
                        }
                        <div className="wd-position-relative">
                            <div className="wd-display-conditional-block wd-username-field-dims wd-fg-color-white wd-font-size-26 wd-bold-font">{profileData.username}</div>
                            <div className="wd-display-conditional-block wd-username-button-position">
                                {renderMainInfoButton()}
                            </div>
                        </div>
                        <div>
                            <div className="wd-display-conditional-block wd-follow-value-dims wd-fg-color-white wd-font-size-20 pe-3">
                                <button onClick={() => setFollowPopupVals('followers')} className="wd-follower-button ps-0 pe-0">
                                    <span className="wd-bold-font pe-2">{profileData.followers ? profileData.followers.length : 0}</span>
                                    <span>Followers</span>
                                </button>
                            </div>
                            <div className="wd-display-conditional-block wd-follow-value-dims wd-fg-color-white wd-font-size-20">
                                <button onClick={() => setFollowPopupVals('following')} className="wd-follower-button ps-0 pe-0">
                                    <span className="wd-bold-font pe-2">{profileData.following ? profileData.following.length : 0}</span>
                                    <span>Following</span>
                                </button>
                            </div>
                        </div>
                        <div>
                            {profileData.website &&
                                <a href={"https://" + profileData.website} rel="noreferrer" target="_blank" className="wd-fg-color-white wd-font-size-20 wd-hide wd-website-link">
                                    <i className="fa fa-link me-2"/>
                                    {profileData.website}
                                </a>
                            }
                        </div>
                    </div>
                    <div className="wd-inline-show-status wd-fg-color-white wd-support-info-dims wd-content-section ps-3 pt-2 pb-2">
                        {renderUserInfo()}
                    </div>
                </div>
                <div className="wd-block-show-status wd-fg-color-white wd-support-info-dims wd-content-section ps-3 pt-2 pb-2 mt-3">
                    {renderUserInfo()}
                </div>
                <div className="wd-fg-color-white wd-profile-header-info-max-width wd-bottom-border-grey wd-description-info-padding pt-3 pb-3">
                    {profileData.bio &&
                        <div>
                            <div className="wd-bold-font wd-font-size-20">Bio</div>
                            <p className="wd-font-size-18 mb-0">{profileData.bio}</p>
                        </div>
                    }
                </div>
                <div className="mt-3 wd-profile-header-info-max-width">
                    <ul className="nav justify-content-center">
                        {renderNav(content, 'comments', 'Comments')}
                        {renderNav(content, 'likes', 'Likes')}
                        {profileData.isArtist && renderNav(content, 'music', 'Music')}
                    </ul>
                </div>

            </div>
            <div>
                {renderContent(content)}
            </div>
        </div>
    );
}
export default ProfileScreen;