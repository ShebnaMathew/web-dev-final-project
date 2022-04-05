import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    origin: "localhost:3000"
})

const backendHost = "http://localhost:4000"

const getUser = async () => {
    const response = await api.get(backendHost + '/profile');
    return response.data;
}

const createUser = async (userData) => {
    const response = await api.post(backendHost + '/profile', userData);
    return response.status;
}

const login = async (email, password) => {
    const body = {email: email, password: password}
    const response = await api.post(backendHost + '/profile/login', body);
    return response.status;
}

const logout = async () => {
    await api.post(backendHost + '/profile/logout');
}

const updateUserProfile = async (updatedProfileInfo, id) => {
    await api.put(backendHost + '/profile/' + id, updatedProfileInfo);
}

const getProfile = async (id) => {
    const profile = await api.get(backendHost + '/profile/' + id);
    return profile.data;
}

const registerAdmin = async (key) => {
    let error = false;
    await api.post(backendHost + '/profile/admin', {key: key}).catch(err => error = true)

    return !error;
}

export {
    getUser,
    createUser,
    login,
    logout,
    getProfile,
    updateUserProfile,
    registerAdmin
};

