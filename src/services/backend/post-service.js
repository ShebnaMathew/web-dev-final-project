import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    origin: "localhost:3000"
})

const backendHost = "http://localhost:4000";

const createPost = async (post_body) => {
    await api.post(backendHost + '/post', post_body);
}

const getPost = async (post_id) => {
    const response = await api.get(backendHost + '/post/' + post_id);
    return response.body;
}

export {
    getPost,
    createPost
}