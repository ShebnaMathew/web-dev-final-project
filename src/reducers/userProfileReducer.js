const profileData = {};

const userProfileReducer = (state = profileData, action) => {
    switch(action.type) {
        case "register-artist":
            return {
                ...state,
                isArtist: true
            }
        case "save-profile-data":
            return {
                ...state,
                name: action.name,
                bio: action.bio,
                website: action.website,
                dob: action.dob,
                email: action.email
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