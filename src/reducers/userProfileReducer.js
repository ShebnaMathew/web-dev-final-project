import {updateUserProfile} from "../api/backend/connector";

const profileData = {};

const userProfileReducer = (state = profileData, action) => {
    switch(action.type) {
        case "register-artist":
            return {
                ...state,
                isArtist: true
            }
        case "save-profile-data":
            return {
                ...state,
                ...action.data
            }
        case "set-user-profile-data":
            return {
                ...action.userProfile
            };
        default:
            return (state);
    }

};

export default userProfileReducer;