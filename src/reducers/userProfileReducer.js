const userProfileReducer = (state = {}, action) => {
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