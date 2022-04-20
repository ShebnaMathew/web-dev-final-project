import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    origin: process.env.ORIGIN_URL || "localhost:3000"
})

const backendHost = process.env.BACKEND_URL || "http://localhost:4000";

const getContent = async (user_id) => {
    if (user_id === undefined) {
        const response = await api.get(backendHost + '/content');
        return response.data.posts;
    } else {
        const response = await api.get(backendHost + '/content/' + user_id);
        return response.data.posts;
    }
}

export {
    getContent
}