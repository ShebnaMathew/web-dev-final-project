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

export {
    addComment,
    deleteComment
}