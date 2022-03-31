// get profile of logged in user
import {getProfile, login, updateUserProfile} from "../services/backend/backend-service";

export const loginAction = async (dispatch, username, password) => {
    const userData = await login(username, password);
    dispatch({
        type: "set-user",
        data: userData
    })
}

export const getProfileAction = async (dispatch, id) => {
    const profile = await getProfile(id);
    console.log('setting profile')
    dispatch({
        type: "set-profile-data",
        userProfile: profile
    });
}

export const saveProfileDataAction = async (dispatch, newProfileData, id) => {
    await updateUserProfile(newProfileData, id)
    dispatch({
        type: "save-profile-data",
        data: newProfileData
    })
}