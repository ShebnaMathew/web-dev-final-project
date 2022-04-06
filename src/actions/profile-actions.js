// get profile of logged in user
import {createUser, getProfile, login, updateUserProfile, getUser, logout} from "../services/backend/backend-service";

export const SET_USER = "set-user";
export const SET_PROFILE_DATA = "set-profile-data";
export const SAVE_PROFILE_DATA = "save-profile-data";
export const RESET_USER = "reset-user";

export const getCurrentUserAction = async (dispatch) => {
    const userData = await getUser();
    dispatch({
        type: SET_USER,
        data: userData
    })
}

export const createProfileAction = async (dispatch, userData) => {
    const response = await createUser(userData);
    if (response !== 200) {
        return response.status;
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
    await updateUserProfile(newProfileData, id)
    dispatch({
        type: SAVE_PROFILE_DATA,
        data: newProfileData
    })
}