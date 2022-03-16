import React from 'react';
import './profile.css';
import CommentList from "./CommentList";
import LikedList from "./LikedList";
import MusicList from "./MusicList";

const ProfileScreen = () => {
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
                            <button className="btn btn-dark wd-username-button">Follow</button>
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
                    <i className="far fa-id-card ps-3  wd-font-size-16"/>
                    <span className="ps-2  wd-font-size-16">Name</span>
                    <i className="fa fa-birthday-cake ps-3  wd-font-size-16"/>
                    <span className="ps-2  wd-font-size-16">DOB</span>
                    <i className="fa fa-at ps-3  wd-font-size-16"/>
                    <span className="ps-2  wd-font-size-16">Email</span>
                </div>
                <div>
                    <div className="wd-bold-font wd-font-size-20">Bio</div>
                    <div className="wd-font-size-18">I'm a biography</div>
                </div>
            </div>
            <div className="mt-3">
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <button className="wd-fg-color-white wd-nav-link-button wd-active-link">
                            Comments
                        </button>
                    </li>
                    <li className="nav-item ps-5">
                        <button className="wd-fg-color-white wd-nav-link-button">
                            Likes
                        </button>
                    </li>
                    <li className="nav-item ps-5">
                        <button className="wd-fg-color-white wd-nav-link-button">
                            Music
                        </button>
                    </li>

                </ul>
            </div>
            <div className="wd-content-section wd-fg-color-white ps-3 pe-3">
                {/*<CommentList/>*/}
                {/*<LikedList/>*/}
                <MusicList/>
            </div>
        </div>
    );
}
export default ProfileScreen;