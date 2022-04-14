import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    origin: "localhost:3000"
})

const backendHost = "http://localhost:4000";

const likeContent = async (like_data) => {
    const response = await api.post(backendHost + '/content/like', like_data);
    return response.body.like_id;
}

const unlikeContent = async (like_id) => {
    await api.delete(backendHost + '/content/like/' + like_id);
}

const getLikes = async (post_id) => {
    const response = await api.get(backendHost + '/content/like/' + post_id);
    return response.data.likes;
}

export {
    likeContent,
    unlikeContent,
    getLikes
}
