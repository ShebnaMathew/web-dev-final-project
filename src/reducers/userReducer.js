import {RESET_USER, SET_PROFILE_PICTURE, SET_USER} from "../actions/profile-actions";

const userReducer = (state = {}, action) => {
    switch(action.type) {
        case RESET_USER:
            return {}
        case SET_USER:
            return {
                ...state,
                ...action.data
            }
        case SET_PROFILE_PICTURE:
            return {
                ...state,
                profilePicture: action.results
            }
        default:
            return (state);
    }
};

export default userReducer;