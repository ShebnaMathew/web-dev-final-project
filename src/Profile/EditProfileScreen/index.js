import React, {useState} from "react";
import './edit-profile.css';
import {useDispatch, useSelector} from "react-redux";
import PopUp from "../PopUp/PopUp";
import RegisterPopUp from "../PopUp/RegisterPopUp";

const EditProfileScreen = ({
    setShowEdit = () => console.log("WARNING setShowEdit is not defined")
}) => {

    const isMusician = false;

    const [showRegisterArtist, setShowRegisterArtist] = useState(false);

    const profileData = useSelector((state) => state.profile);

    const captureFieldChange = (event, setter) => {
        setter(event.target.value)
    }

    const [name, setName] = useState(profileData.name);
    const [bio, setBio] = useState(profileData.bio);
    const [website, setWebsite] = useState(profileData.website);
    const [dob, setDob] = useState(profileData.dob);
    const [email, setEmail] = useState(profileData.email);

    const dispatch = useDispatch();

    const saveProfileData = () => {
        dispatch({
            type: "save-profile-data",
            name: name,
            bio: bio,
            website: website,
            dob: dob,
            email: email
        })
        setShowEdit(false);
    }

    const showRegisterPopUp = () => {
        setShowRegisterArtist(true);
    }

    const renderRegisterPopUp = () => {
        if (showRegisterArtist) {
            return (
                <PopUp title="Register" setShow={setShowRegisterArtist} Content={RegisterPopUp} contentParams={{setShowRegisterArtist: setShowRegisterArtist}}/>
            )
        }
    }

    const renderRegisterButton = () => {
        if (!isMusician) {
            return(
                <div>
                    <button onClick={() => showRegisterPopUp()} className="btn btn-dark wd-artist-register-button">Register as Artist</button>
                </div>
            );
        }
    }

    return(
        <>
            {renderRegisterPopUp()}
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
                        <button onClick={() => saveProfileData()} className="btn btn-dark wd-edit-profile-header-button wd-edit-profile-button-display me-4">
                            Save Changes
                        </button>
                        <button onClick={() => setShowEdit(false)} className="btn btn-dark wd-edit-profile-header-button wd-edit-profile-button-display">
                            Discard Changes
                        </button>
                    </div>
                </div>
            </div>
            <div className=" mt-3 mb-3 wd-main-outer-padding">
                <div className="wd-edit-profile-text-entry ps-2 pe-2 pt-1 pb-1">
                    <label htmlFor="name" className="wd-font-12">Name</label>
                    <textarea id="name"
                              onChange={(event) => captureFieldChange(event, setName)}
                              rows={1}
                              defaultValue={name}
                    />
                </div>
                <br/>
                <div className="wd-edit-profile-text-entry ps-2 pe-2 pt-1 pb-1">
                    <label htmlFor="bio" className="wd-font-12">Bio</label>
                    <textarea id="bio"
                              onChange={(event) => captureFieldChange(event, setBio)}
                              rows={3}
                              defaultValue={bio}
                    />
                </div>
                <br/>
                <div className="wd-edit-profile-text-entry ps-2 pe-2 pt-1 pb-1">
                    <label htmlFor="website" className="wd-font-12">Website</label>
                    <textarea id="website"
                              onChange={(event) => captureFieldChange(event, setWebsite)}
                              rows={1}
                              defaultValue={website}
                    />
                </div>
                <br/>
                <div className="wd-edit-profile-text-entry ps-2 pe-2 pt-1 pb-1">
                    <label htmlFor="email" className="wd-font-12">Email</label>
                    <textarea id="email"
                              onChange={(event) => captureFieldChange(event, setEmail)}
                              rows={1}
                              defaultValue={email}
                    />
                </div>
                <br/>
                <div className="wd-edit-profile-text-entry ps-2 pe-2 pt-1 pb-1">
                    <label htmlFor="dob" className="wd-font-12">Date of Birth</label>
                    <input id="dob"
                           type="date"
                           className="form-control ps-0 pe-0"
                           value={dob}
                           onChange={(event) => captureFieldChange(event, setDob)}
                    />
                </div>
            </div>
            {renderRegisterButton()}
        </>
    )
}
export default EditProfileScreen;