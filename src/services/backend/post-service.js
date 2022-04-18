import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    origin: process.env.ORIGIN_URL || "localhost:3000"
})

const backendHost = process.env.BACKEND_URL || "http://localhost:4000"

const createPost = async (post_body) => {
    await api.post(backendHost + '/post', post_body);
}

const getPost = async (post_data) => {
    const type = post_data.type;
    const id = post_data._id;
    const response = await api.get(backendHost + '/post/' + type + '/' + id);
    return response.body;
}

export {
    getPost,
    createPost
}