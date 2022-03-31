import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    origin: "localhost:3000"
})

const backendHost = "http://localhost:4000"

const getUserProfile = async () => {
    const userProfile = await api.get(backendHost + '/profile');
    return userProfile.data;
}

const updateUserProfile = async (updatedProfileInfo) => {
    await api.put(backendHost + '/profile', updatedProfileInfo);
}

const getProfile = async (id) => {
    if (id === undefined) {
        return await getUserProfile();
    }
    const profile = await api.get(backendHost + '/profile/' + id);
    return profile.data;
}

const registerAdmin = async (key) => {
    let error = false;
    await api.post(backendHost + '/profile/register', {key: key}).catch(err => error = true)

    return !error;
}

export {
    getUserProfile,
    getProfile,
    updateUserProfile,
    registerAdmin
};

