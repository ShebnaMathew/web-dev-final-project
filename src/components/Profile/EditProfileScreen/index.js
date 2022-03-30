import React, {useEffect, useState} from "react";
import './edit-profile.css';
import '../profile-main.css';
import {useDispatch, useSelector} from "react-redux";
import PopUp from "../../PopUp/PopUp";
import RegisterArtistPopUp from "../../PopUp/RegisterPopUp/RegisterArtistPopUp";
import {Link} from "react-router-dom";
import {getLoggedInUserProfile, saveProfileData} from "../../../actions/profile-actions";
import RegisterAdminPopUp from "../../PopUp/RegisterPopUp/RegisterAdminPopUp";

const EditProfileScreen = () => {

    const dispatch = useDispatch();

    const [showRegisterArtist, setShowRegisterArtist] = useState(false);
    const [showRegisterAdmin, setShowRegisterAdmin] = useState(false);

    let profileData = useSelector((state) => state.userProfile);

    const [name, setName] = useState(profileData.name ? profileData.name : "");
    const [bio, setBio] = useState(profileData.bio ? profileData.bio : "");
    const [website, setWebsite] = useState(profileData.website ? profileData.website : "");
    const [dob, setDob] = useState(profileData.dob ? profileData.dob : "");
    const [email, setEmail] = useState(profileData.email ? profileData.email : "");

    useEffect(() => {
        setName(profileData.name);
        setBio(profileData.bio);
        setWebsite(profileData.website);
        setDob(profileData.dob);
        setEmail(profileData.email);
    })



    const captureFieldChange = (event, setter) => {
        setter(event.target.value)
    }

    const showRegisterArtistPopUp = () => {
        setShowRegisterArtist(true);
    }

    const renderRegisterArtistPopUp = () => {
        if (showRegisterArtist) {
            return (
                <PopUp title="Register" setShow={setShowRegisterArtist} Content={RegisterArtistPopUp} contentParams={{setShowRegisterArtist: setShowRegisterArtist}}/>
            )
        }
    }

    const renderRegisterArtistButton = () => {
        if (!profileData.isArtist) {
            return(
                <div className="pb-2">
                    <button onClick={() => showRegisterArtistPopUp()} className="btn btn-dark wd-edit-profile-register-button">Register as Artist</button>
                </div>
            );
        }
    }

    const showRegisterAdminPopUp = () => {
        setShowRegisterAdmin(true);
    }

    const renderRegisterAdminPopUp = () => {
        if (showRegisterAdmin) {
            return (
                <PopUp title="Register" setShow={setShowRegisterAdmin} Content={RegisterAdminPopUp} contentParams={{setShowRegisterAdmin: setShowRegisterAdmin}}/>
            )
        }
    }

    const renderRegisterAdminButton = () => {
        if (!profileData.isAdmin) {
            return(
                <div>
                    <button onClick={() => showRegisterAdminPopUp()} className="btn btn-dark wd-edit-profile-register-button">Register as Admin</button>
                </div>
            );
        }
    }

    return(
        <>
            {renderRegisterArtistPopUp()}
            {renderRegisterAdminPopUp()}
            <div className="wd-profile-header-info-dims wd-position-relative wd-display-flex wd-main-outer-padding pt-2">
                <div className=" wd-display-inline-block pe-2 wd-position-relative">
                    <img className="img-fluid wd-profile-picture-dims wd-circle-image" src={profileData.profilePicture} alt=""/>
                    <div className="wd-profile-picture-dims wd-edit-profile-picture-overlay-position">
                        <div className="wd-edit-profile-image-filter wd-circle-image wd-edit-border-transparent"/>
                        <button className="wd-edit-profile-overlay-button wd-edit-profile-picture-button">
                            <i className="fa fa-camera"/>
                        </button>
                    </div>
                </div>
                <div className="wd-display-inline-block wd-position-relative wd-full-height wd-main-info-dims">
                    <div className="wd-display-conditional-block wd-edit-profile-button-position">
                        <div className="wd-edit-profile-username-position wd-edit wd-fg-color-white wd-font-size-26 wd-bold-font">{profileData.username}</div>
                        <Link to="/profile"
                              onClick={() => saveProfileData(dispatch, {
                                  name: name,
                                  bio: bio,
                                  website: website,
                                  dob: dob,
                                  email: email
                              })}
                              className="btn btn-dark wd-edit-profile-header-button wd-edit-profile-button-display me-4">
                            Save Changes
                        </Link>
                        <Link to="/profile" className="btn btn-dark wd-edit-profile-header-button wd-edit-profile-button-display">
                            Discard Changes
                        </Link>
                    </div>
                </div>
            </div>
            <div className=" mt-3 mb-3 wd-main-outer-padding">
                <div className="wd-edit-profile-text-entry ps-2 pe-2 pt-1 pb-1">
                    <label htmlFor="name" className="wd-font-12">Name</label>
                    <textarea id="name"
                              onChange={(event) => captureFieldChange(event, setName)}
                              rows={1}
                              defaultValue={name ? name : ""}
                    />
                </div>
                <br/>
                <div className="wd-edit-profile-text-entry ps-2 pe-2 pt-1 pb-1">
                    <label htmlFor="bio" className="wd-font-12">Bio</label>
                    <textarea id="bio"
                              onChange={(event) => captureFieldChange(event, setBio)}
                              rows={3}
                              defaultValue={bio ? bio : ""}
                    />
                </div>
                <br/>
                <div className="wd-edit-profile-text-entry ps-2 pe-2 pt-1 pb-1">
                    <label htmlFor="website" className="wd-font-12">Website</label>
                    <textarea id="website"
                              onChange={(event) => captureFieldChange(event, setWebsite)}
                              rows={1}
                              defaultValue={website ? website : ""}
                    />
                </div>
                <br/>
                <div className="wd-edit-profile-text-entry ps-2 pe-2 pt-1 pb-1">
                    <label htmlFor="email" className="wd-font-12">Email</label>
                    <textarea id="email"
                              onChange={(event) => captureFieldChange(event, setEmail)}
                              rows={1}
                              defaultValue={email ? email : ""}
                    />
                </div>
                <br/>
                <div className="wd-edit-profile-text-entry ps-2 pe-2 pt-1 pb-1">
                    <label htmlFor="dob" className="wd-font-12">Date of Birth</label>
                    <input id="dob"
                           type="date"
                           className="form-control ps-0 pe-0"
                           value={dob ? dob : ""}
                           onChange={(event) => captureFieldChange(event, setDob)}
                    />
                </div>
            </div>
            {renderRegisterArtistButton()}
            {renderRegisterAdminButton()}
        </>
    )
}
export default EditProfileScreen;