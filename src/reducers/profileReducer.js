import {SAVE_PROFILE_DATA, SET_PROFILE_DATA} from "../actions/profile-actions";

const profileReducer = (state = {}, action) => {
    switch(action.type) {
        case SAVE_PROFILE_DATA:
            return {
                ...state,
                ...action.data
            }
        case SET_PROFILE_DATA:
            return {
                ...action.userProfile
            };
        default:
            return (state);
    }
};

export default profileReducer;