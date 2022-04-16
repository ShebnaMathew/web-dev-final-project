import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    origin: process.env.ORIGIN_URL || "localhost:3000"
})

const backendHost = process.env.BACKEND_URL || "http://localhost:4000";

const addFollow = async (follower_id, followee_id) => {
    await api.post(backendHost + '/profile/follow', {
        follower_id,
        followee_id,
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

export {
    addFollow,
    removeFollow,
};