import profileData from './data/profile.json';

const profileReducer = (state = profileData, action) => {
    switch(action.type) {
        case "save-profile-data":
            return {
                ...state,
                name: action.name,
                bio: action.bio,
                website: action.website,
                dob: action.dob,
                email: action.email
            }
        default:
            return (state);
    }

};

export default profileReducer;