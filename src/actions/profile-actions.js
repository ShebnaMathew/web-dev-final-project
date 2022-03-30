// get profile of logged in user
import {getProfile, getUserProfile, updateUserProfile} from "../services/backend/backend-service";

export const getLoggedInUserProfile = async (dispatch) => {
    const userProfile = await getUserProfile();
    dispatch({
        type: "set-user-profile-data",
        userProfile: userProfile
    });
}

export const saveProfileData = async (dispatch, newProfileData) => {
    await updateUserProfile(newProfileData)
    dispatch({
        type: "save-profile-data",
        data: newProfileData
    })
}

// define getting current profile being viewed
export const getCurrentProfile = async (dispatch, id) => {
    const currentProfile = await getProfile(id);
    dispatch({
        type: "update-current-user",
        currentUser: currentProfile
    })
}