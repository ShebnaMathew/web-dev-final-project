import React, {useEffect, useRef, useState} from "react";
import './edit-profile.css';
import '../profile-main.css';
import {useDispatch, useSelector} from "react-redux";
import PopUp from "../../PopUp/PopUp";
import RegisterArtistPopUp from "../../PopUp/RegisterPopUp/RegisterArtistPopUp";
import {Link, useNavigate} from "react-router-dom";
import {getProfileAction, saveProfileDataAction, updateProfilePictureAction} from "../../../actions/profile-actions";
import RegisterAdminPopUp from "../../PopUp/RegisterPopUp/RegisterAdminPopUp";
import {getProfile} from "../../../services/backend/profile-service";

const EditProfileScreen = () => {

    const [showRegisterArtist, setShowRegisterArtist] = useState(false);
    const [showRegisterAdmin, setShowRegisterAdmin] = useState(false);
    const [isArtist, setIsArtist] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState("");
    const [profile, setProfile] = useState({});
    const [pageReady, setPageReady] = useState(false);

    const imageRef = useRef();

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);


    useEffect(async () => {
        if (!pageReady && user._id === undefined) {
            setPageReady(true);
        } else if (!pageReady) {
            let profileData = await getProfile(user._id);
            setProfile({
                _id: profileData._id,
                profilePicture: profileData.profilePicture,
                name: profileData.name,
                bio: profileData.bio,
                dob: profileData.dob,
                email: profileData.email,
                website: profileData.website
            });
            setIsArtist(profileData.isArtist);
            setIsAdmin(profileData.isAdmin);
            setPageReady(true);
        }
    }, [])

    const showRegisterArtistPopUp = () => {
        setShowRegisterArtist(true);
    }

    const setIsArtistWithBool = (boolVal) => {
        setIsArtist(boolVal);
    }

    const renderRegisterArtistPopUp = () => {
        if (showRegisterArtist) {
            return (
                <PopUp title="Register" setShow={setShowRegisterArtist} Content={RegisterArtistPopUp} contentParams={{ _id: profile._id, setIsArtist: setIsArtistWithBool}}/>
            )
        }
    }

    const renderRegisterArtistButton = () => {
        if (!isArtist) {
            return(
                <div className="pb-2">
                    <button onClick={() => showRegisterArtistPopUp()} className="btn btn-secondary wd-edit-profile-register-button">Register as Artist</button>
                </div>
            );
        }
    }

    const showRegisterAdminPopUp = () => {
        setShowRegisterAdmin(true);
    }

    const setIsAdminWithBool = (boolVal) => {
        setIsAdmin(boolVal);
    }

    const renderRegisterAdminPopUp = () => {
        if (showRegisterAdmin) {
            return (
                <PopUp title="Register" setShow={setShowRegisterAdmin} Content={RegisterAdminPopUp} contentParams={{_id: profile._id, setIsAdmin: setIsAdminWithBool}}/>
            )
        }
    }

    const renderRegisterAdminButton = () => {
        if (!isAdmin) {
            return(
                <div>
                    <button onClick={() => showRegisterAdminPopUp()} className="btn btn-secondary wd-edit-profile-register-button">Register as Admin</button>
                </div>
            );
        }
    }

    const convertImageToString = async (event) => {
        const file = event.target.files[0];

        if (file.size > 95000) {
            setError("Image cannot be larger than 95KB");
            return;
        }

        const image = new Image();
        image.src = URL.createObjectURL(file);
        image.onload = () => {
            if (image.width !== image.height) {
                setError("Image must be a square");
                return;
            }

            setError("");

            const reader = new FileReader();

            reader.onload = () => {
                const base64String = reader.result
                setProfile({
                    ...profile,
                    profilePicture: base64String
                })
            }
            reader.readAsDataURL(file);
        }
    }

    return(
        <>
        {!pageReady && <i className="fa wd-spinner-pos fa-3x fa-spinner fa-spin"/>}
        {(pageReady && user._id !== undefined) &&
            <div className="row justify-content-center pt-3">
                <div className="wd-edit-profile-max-width wd-center-edit-profile">
                    {renderRegisterArtistPopUp()}
                    {renderRegisterAdminPopUp()}
                    <div className="wd-profile-header-info-dims wd-position-relative wd-display-flex pt-2 ps-5">
                        <div className=" wd-display-inline-block pe-2 wd-position-relative">
                            <img className="img-fluid wd-green-border wd-profile-picture-dims wd-circle-image"
                                 src={profile.profilePicture ? profile.profilePicture : "/images/blank-profile-picture.png"}
                                 alt=""/>
                            <div className="wd-profile-picture-dims wd-edit-profile-picture-overlay-position">
                                <div
                                    className="wd-edit-profile-image-filter wd-circle-image wd-edit-border-transparent"/>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    style={{display: 'none'}}
                                    id="image-upload"
                                    ref={imageRef}
                                    onChange={(event) => convertImageToString(event)}
                                />
                                <label htmlFor="image-upload">
                                    <button
                                        onClick={() => imageRef.current.click()}
                                        className="wd-edit-profile-overlay-button wd-edit-profile-picture-button">
                                        <i className="fa fa-camera"/>
                                    </button>
                                </label>
                            </div>
                        </div>
                        <div
                            className="wd-display-inline-block wd-edit-info-padding wd-position-relative wd-full-height wd-main-info-dims">
                            <div className="wd-display-conditional-block wd-edit-profile-button-position">
                                <div
                                    className="wd-edit-profile-username-position wd-edit wd-fg-color-white wd-font-size-26 wd-bold-font">{profile.username ? profile.username : ""}</div>
                                <button onClick={async () => {
                                    if (profile.name.length === 0) {
                                        setError("Name cannot be blank")
                                        return;
                                    }
                                    if (profile.email.length === 0) {
                                        setError("Email cannot be blank");
                                        return;
                                    }
                                    if (profile.dob.length === 0) {
                                        setError("Date of Birth cannot be blank");
                                        return;
                                    }

                                    const response = await saveProfileDataAction(dispatch, {
                                        ...profile
                                    }, profile._id)
                                    if (response.data && response.data.status === "fail") {
                                        setError(response.data.message);
                                    } else {
                                        await updateProfilePictureAction(dispatch, user._id)
                                        navigate('/profile');
                                    }
                                }}
                                        className="btn btn-secondary wd-edit-profile-header-button wd-edit-profile-button-display me-4">
                                    Save Changes
                                </button>
                                <Link to="/profile"
                                      className="btn btn-secondary wd-edit-profile-header-button wd-edit-profile-button-display">
                                    Discard Changes
                                </Link>
                            </div>
                        </div>
                    </div>
                    {
                        error &&
                        <div className="wd-edit-profile-error-message pt-3">
                            Error: {error}
                        </div>
                    }

                    <div className="mt-3 mb-3">
                        <div className="wd-edit-profile-text-entry ps-2 pe-2 pt-1 pb-1">
                            <label htmlFor="name" className="wd-font-12">Name</label>
                            <textarea id="name"
                                      onChange={(event) => setProfile({...profile, name: event.target.value})}
                                      rows={1}
                                      placeholder="Name"
                                      defaultValue={profile.name ? profile.name : ""}
                            />
                        </div>
                        <br/>
                        <div className="wd-edit-profile-text-entry ps-2 pe-2 pt-1 pb-1">
                            <label htmlFor="bio" className="wd-font-12">Bio</label>
                            <textarea id="bio"
                                      onChange={(event) => setProfile({...profile, bio: event.target.value})}
                                      rows={3}
                                      defaultValue={profile.bio ? profile.bio : ""}
                                      placeholder="Bio"
                            />
                        </div>
                        <br/>
                        <div className="wd-edit-profile-text-entry ps-2 pe-2 pt-1 pb-1">
                            <label htmlFor="website" className="wd-font-12">Website</label>
                            <textarea id="website"
                                      onChange={(event) => setProfile({...profile, website: event.target.value})}
                                      rows={1}
                                      defaultValue={profile.website ? profile.website : ""}
                                      placeholder={"Website"}
                            />
                        </div>
                        <br/>
                        <div className="wd-edit-profile-text-entry ps-2 pe-2 pt-1 pb-1">
                            <label htmlFor="email" className="wd-font-12">Email</label>
                            <textarea id="email"
                                      onChange={(event) => setProfile({...profile, email: event.target.value})}
                                      rows={1}
                                      defaultValue={profile.email ? profile.email : ""}
                                      placeholder="Email"
                            />
                        </div>
                        <br/>
                        <div className="wd-edit-profile-text-entry ps-2 pe-2 pt-1 pb-1">
                            <label htmlFor="dob" className="wd-font-12">Date of Birth</label>
                            <input id="dob"
                                   type="date"
                                   className="form-control ps-0 pe-0"
                                   value={profile.dob ? profile.dob : ""}
                                   onChange={(event) => setProfile({...profile, dob: event.target.value})}
                            />
                        </div>
                    </div>
                    {renderRegisterArtistButton()}
                    {renderRegisterAdminButton()}
                </div>
            </div>
        }
        {(pageReady && user._id === undefined) &&
            <div className="wd-full-width wd-center-text wd-going-home-text pt-3">
                <br/>
                <br/>
                <br/>
                <i className="fa fa-2x wd-fg-color-white fa-exclamation-triangle"/>
                <div>Must be logged in to edit profile</div>
                <div>Please navigate to an available page</div>
            </div>
        }
        </>
    )
}
export default EditProfileScreen;