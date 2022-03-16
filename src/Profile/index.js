import React, {useState} from 'react';
import './profile.css';
import CommentList from "./CommentList";
import LikedList from "./LikedList";
import MusicList from "./MusicList";

const ProfileScreen = () => {

    const [content, setContent] = useState('comments');

    const isCurrentUser = false;
    const isMusician = false;
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

    const renderPrivateInfo = () => {
        if(isCurrentUser) {
            return (
                <>
                    <i className="far fa-id-card ps-3  wd-font-size-16"/>
                    <span className="ps-2  wd-font-size-16">Name</span>
                    <i className="fa fa-birthday-cake ps-3  wd-font-size-16"/>
                    <span className="ps-2  wd-font-size-16">DOB</span>
                    <i className="fa fa-at ps-3  wd-font-size-16"/>
                    <span className="ps-2  wd-font-size-16">Email</span>
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
            <div className="wd-profile-header-info-dims wd-position-relative wd-display-flex pt-2">
                <div className="wd-profile-picture-dims wd-display-inline-block ps-5 pe-2">
                    <img className="img-fluid wd-circle-image" src="/images/blank-profile-picture.png" alt=""/>
                </div>
                <div className="wd-display-inline-block wd-full-height wd-main-info-dims wd-main-info-padding wd-main-info-position pe-2">
                    <div className="wd-position-relative">
                        <span className="wd-fg-color-white wd-font-size-26 wd-bold-font">Username</span>
                        <span className="wd-username-button-position ps-5">
                            {renderMainInfoButton()}
                        </span>
                    </div>
                    <div>
                        <span className="wd-fg-color-white wd-font-size-20">38 Followers</span>
                        <span className="wd-fg-color-white wd-font-size-20 ps-3">38 Following</span>
                    </div>
                    <div>
                        <span className="wd-fg-color-white wd-font-size-20">Website</span>
                    </div>
                </div>
            </div>
            <div className="wd-fg-color-white wd-bottom-border-grey pt-3 ps-5 pb-3">
                <div>
                    <i className="far fa-calendar wd-font-size-16"/>
                    <span className="ps-2  wd-font-size-16">Joined</span>
                    {renderPrivateInfo()}
                </div>
                <div>
                    <div className="wd-bold-font wd-font-size-20">Bio</div>
                    <div className="wd-font-size-18">I'm a biography</div>
                </div>
            </div>
            <div className="mt-3">
                <ul className="nav justify-content-center">
                    {renderNav(content, 'comments', 'Comments')}
                    {renderNav(content, 'likes', 'Likes')}
                    {isMusician && renderNav(content, 'music', 'Music')}
                    {/*<li className="nav-item">*/}
                    {/*    */}
                    {/*    <button onClick={() => setContent('comments')}*/}
                    {/*            className="wd-fg-color-white wd-nav-link-button wd-active-link">*/}
                    {/*        Comments*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item ps-5">*/}
                    {/*    <button onClick={() => setContent('likes')}*/}
                    {/*            className="wd-fg-color-white wd-nav-link-button">*/}
                    {/*        Likes*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item ps-5">*/}
                    {/*    <button onClick={() => setContent('music')}*/}
                    {/*            className="wd-fg-color-white wd-nav-link-button">*/}
                    {/*        Music*/}
                    {/*    </button>*/}
                    {/*</li>*/}

                </ul>
            </div>
            <div className="wd-content-section wd-fg-color-white ps-3 pe-3">
                {renderContent(content)}
            </div>
        </div>
    );
}
export default ProfileScreen;