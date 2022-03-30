import {updateUserProfile} from "../services/backend/backend-service";

const profileData = {};

const userProfileReducer = (state = profileData, action) => {
    switch(action.type) {
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