import {UPDATE_SEARCH, GET_ALBUM_TRACKS, GET_TRACK, GET_ALBUM, SET_ALBUM, GET_SHOW_EPISODES, 
    GET_EPISODE, SET_SHOW, GET_SHOW, GET_PLAYLIST_TRACKS, SET_PLAYLIST, GET_POSTS_TO_RENDER, GET_ALL_POSTS} from "../actions/search-actions";
import results from "./data/current-events.json";

const searchReducer = (state = results, action) => {
    switch(action.type) {
        case UPDATE_SEARCH:
            return {...state, results: action.results};
        case GET_ALBUM_TRACKS:
            return {...state, current_album_tracks: action.results.items};
        case GET_TRACK:
            return {...state, current_tracks: action.results};
        case SET_ALBUM:
            return {...state, current_album: action.results};
        case GET_ALBUM:
            return {...state, current_album: action.results};
        case SET_PLAYLIST:
            return {...state, current_playlist: action.results};
        case GET_PLAYLIST_TRACKS:
            return {...state, current_playlist_tracks: action.results.items};
        case GET_SHOW_EPISODES:
            return {...state, current_show_episodes: action.results};
        case GET_EPISODE:
            return {...state, current_episodes: action.results};
        case SET_SHOW:
            return {...state, current_show: action.results};
        case GET_SHOW:
            return {...state, current_show: action.results};
        case GET_POSTS_TO_RENDER:
            return {...state, posts_to_render: action.results};
        case GET_ALL_POSTS:
            return {...state, all_posts: action.results};
        default:
            return (state);
    }

};

export default searchReducer;