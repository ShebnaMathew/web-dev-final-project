import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    origin: "localhost:3000"
})

const backendHost = "http://localhost:4000";

const getContent = async (user_id) => {
    if (user_id === undefined) {
        const response = await api.get(backendHost + '/content');
        return response.body.posts;
    } else {
        const response = await api.get(backendHost + '/content/' + user_id);
        return response.body.posts;
    }
}

export {
    getContent
}