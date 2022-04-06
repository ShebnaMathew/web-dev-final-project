import {UPDATE_NEWS} from "../actions/search-actions";

const newsReducer = (state = {}, action) => {
    switch(action.type) {
        case UPDATE_NEWS:
            return action.results;
        default:
            return (state);
    }

};

export default newsReducer;