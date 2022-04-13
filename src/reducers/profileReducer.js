import {SAVE_PROFILE_DATA, SET_PROFILE_DATA} from "../actions/profile-actions";
import {ADD_FOLLOW, REMOVE_FOLLOW} from "../actions/follow-actions";

const profileReducer = (state = {}, action) => {
    switch(action.type) {
        case ADD_FOLLOW:
            return {
                ...state,
                followers: [
                    ...state.followers,
                    {
                        _id: action.follower_id,
                        username: action.username,
                        profilePicture: action.profilePicture
                    }
                ]
            };
        case REMOVE_FOLLOW:
            return {
                ...state,
                followers: state.followers.filter(f => f._id !== action.follower_id)
            };
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