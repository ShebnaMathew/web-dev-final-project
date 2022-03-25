const userProfile = {};

const currentProfileReducer = (state = userProfile, action) => {
    switch(action.type) {
        case "update-current-user":
            return {
                ...action.currentUser
            }
        default:
            return (state);
    }

};

export default currentProfileReducer;