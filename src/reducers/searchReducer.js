const searchReducer = (state = {}, action) => {
    switch(action.type) {
        case "set-search-results":
            return action.results;
        default:
            return (state);
    }

};

export default searchReducer;