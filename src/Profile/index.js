import React, {useState} from "react";
import ProfileScreen from "./ProfileScreen";
import EditProfileScreen from "./EditProfileScreen";
import './profile.css';

const Profile = () => {

    const [showEdit, setShowEdit] = useState(false);

    return (
        <>
            {!showEdit && <ProfileScreen setShowEdit={setShowEdit}/>}
            {showEdit && <EditProfileScreen setShowEdit={setShowEdit}/>}
        </>
    )
}
export default Profile;