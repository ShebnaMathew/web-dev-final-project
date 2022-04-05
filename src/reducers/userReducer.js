import {SET_USER} from "../actions/profile-actions";

const userReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                ...action.data
            }
        default:
            return (state);
    }
};

export default userReducer;