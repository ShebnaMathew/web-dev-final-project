import axios from 'axios';

const backendHost = "http://localhost:4000"

const getUserProfile = async () => {
    const userProfile = await axios.get(backendHost + '/profile');
    return userProfile.data;
}

const updateUserProfile = async (updatedProfileInfo) => {
    await axios.put(backendHost + '/profile', updatedProfileInfo);
}

const getProfile = async (id) => {
    if (id === undefined) {
        return await getUserProfile();
    }
    const profile = await axios.get(backendHost + '/profile/' + id);
    return profile.data;
}

const registerAdmin = async (key) => {
    let error = false;
    await axios.post(backendHost + '/profile/register', {key: key}).catch(err => error = true)

    return !error;
}

export {
    getUserProfile,
    getProfile,
    updateUserProfile,
    registerAdmin
};

