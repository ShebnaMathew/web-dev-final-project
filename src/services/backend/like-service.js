import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    origin: process.env.ORIGIN_URL || "localhost:3000"
})

const backendHost = process.env.BACKEND_URL || "http://localhost:4000";

const likeContent = async (like_data) => {
    const response = await api.post(backendHost + '/content/like', like_data);
    return response.data.like_id;
}

const unlikeContent = async (like_id) => {
    await api.delete(backendHost + '/content/like/' + like_id);
}

export {
    likeContent,
    unlikeContent
}
