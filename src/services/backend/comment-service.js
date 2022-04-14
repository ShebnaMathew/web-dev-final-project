import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    origin: "localhost:3000"
})

const backendHost = "http://localhost:4000";

const addComment = async (comment_data) => {
    const response = await api.post(backendHost + '/comment', comment_data);
    return response.body.comment_id;
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