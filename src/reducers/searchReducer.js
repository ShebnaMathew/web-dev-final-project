import {UPDATE_SEARCH} from "../actions/search-actions";

const searchReducer = (state = {}, action) => {
    switch(action.type) {
        case UPDATE_SEARCH:
            return action.results;
        default:
            return (state);
    }

};

export default searchReducer;