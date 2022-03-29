import sampleSearch from './data/sample-search.json';

const searchReducer = (state = {}, action) => {
    switch(action.type) {
        case "update-search-results":
            return action.results;
        default:
            return (state);
    }

};

export default searchReducer;