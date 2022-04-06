import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    origin: "localhost:3000"
})

const backendHost = "http://localhost:4000"

const addFollower = async (follower, followee) => {
    await api.post(backendHost + '/profile/follower', {
        follower,
        followee
    });
}

const removeFollower = async (follower, followee) => {
    await api.delete(backendHost + '/profile/follower', {
        follower,
        followee
    });
}

const addFollowee = async (follower, followee) => {
    await api.post(backendHost + '/profile/followee', {
        follower,
        followee
    });
}

const removeFollowee = async (follower, followee) => {
    await api.delete(backendHost + '/profile/followee', {
        follower,
        followee
    });
}

const getFollowers = async (userId) => {
    await api.get(backendHost + '/profile/followers');
}

const getFollowing = async (userId) => {
    await api.get(backendHost + '/profile/following');
}

export {
    addFollower,
    removeFollower,
    addFollowee,
    removeFollowee,
    getFollowers,
    getFollowing
};