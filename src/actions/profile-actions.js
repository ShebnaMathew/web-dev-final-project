// get profile of logged in user
import {
    createUser,
    getProfile,
    login,
    updateUserProfile,
    getUser,
    logout,
    getProfilePicture
} from "../services/backend/profile-service";

export const SET_USER = "set-user";
export const SET_PROFILE_DATA = "set-profile-data";
export const SAVE_PROFILE_DATA = "save-profile-data";
export const RESET_USER = "reset-user";
export const SET_PROFILE_PICTURE = "set-profile-picture";

export const updateCurrentUserAction = (dispatch, newData) => {
    dispatch({
        type: SET_USER,
        data: newData
    })
}

export const getCurrentUserAction = async (dispatch) => {
    const userData = await getUser();
    dispatch({
        type: SET_USER,
        data: userData
    })
}

export const createProfileAction = async (dispatch, userData) => {
    const response = await createUser(userData);
    if (response.data && response.data.status === "fail") {
        return response;
    }
    await getCurrentUserAction(dispatch);
    return response;
}

export const loginAction = async (dispatch, email, password) => {
    const response = await login(email, password).catch(err => console.log(err.status));
    if (response !== 200) {
        return response;
    }
    await getCurrentUserAction(dispatch);
    return response;
}

export const logoutAction = async (dispatch) => {
    await logout();
    dispatch({
        type: RESET_USER
    })
}

export const getProfileAction = async (dispatch, id) => {
    const profile = await getProfile(id);
    dispatch({
        type: SET_PROFILE_DATA,
        userProfile: profile
    });
}

export const saveProfileDataAction = async (dispatch, newProfileData, id) => {
    const response = await updateUserProfile(newProfileData, id)
    if (response.data && response.data.status === "fail") {
        return response;
    }
    dispatch({
        type: SAVE_PROFILE_DATA,
        data: newProfileData
    })
    return response;
}

export const updateProfilePictureAction = async(dispatch, id) => {
    const profilePic = await getProfilePicture(id);
    dispatch({
        type: SET_PROFILE_PICTURE,
        results: profilePic
    })
}