import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    origin: process.env.ORIGIN_URL || "localhost:3000"
})

const backendHost = process.env.BACKEND_URL || "http://localhost:4000";

const addComment = async (comment_data) => {
    const response = await api.post(backendHost + '/comment', comment_data);
    return response.data.comment_id;
}

const deleteComment = async (comment_id) => {
    await api.delete(backendHost + '/comment/' + comment_id);
}

const getComments = async (post_id) => {
    const response = await api.get(backendHost + '/comment/' + post_id);
    return response.data.comments;
}

export {
    addComment,
    deleteComment,
    getComments
}