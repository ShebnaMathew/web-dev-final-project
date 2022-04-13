import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    origin: "localhost:3000"
})

const backendHost = "http://localhost:4000";

const likeContent = async (like_data) => {
    const response = await api.post(backendHost + '/comment/like', like_data);
    return response.body.like_id;
}

const unlikeContent = async (like_id) => {
    await api.delete(backendHost + '/comment/like/' + like_id);
}

export {
    likeContent,
    unlikeContent
}
