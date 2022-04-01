const profileReducer = (state = {}, action) => {
    switch(action.type) {
        case "save-profile-data":
            return {
                ...state,
                ...action.data
            }
        case "set-profile-data":
            return {
                ...action.userProfile
            };
        default:
            return (state);
    }
};

export default profileReducer;