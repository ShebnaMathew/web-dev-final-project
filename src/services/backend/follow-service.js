import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    origin: "localhost:3000"
})

const backendHost = "http://localhost:4000"

const addFollow = async (follower, followee) => {
    await api.post(backendHost + '/profile/' + followee + '/follow/' + follower);
}

const removeFollow = async (follower, followee) => {
    await api.delete(backendHost + '/profile/' + followee + '/follow/' + follower);
}

const getFollowers = async (userId) => {
    await api.get(backendHost + '/profile/followers');
}

const getFollowing = async (userId) => {
    await api.get(backendHost + '/profile/following');
}

export {
    addFollow,
    removeFollow,
    getFollowers,
    getFollowing
};