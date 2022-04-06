import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    origin: "localhost:3000"
})

const backendHost = "http://localhost:4000"

const addFollow = async (follower_id, follower_name, followee_id, followee_name) => {
    await api.post(backendHost + '/profile/follow', {
        follower_id,
        follower_name,
        followee_id,
        followee_name
    });
}

const removeFollow = async (follower_id, followee_id) => {
    await api.delete(backendHost + '/profile/follow', {
        data: {
            follower_id,
            followee_id
        }
    });
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