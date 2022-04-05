const searchReducer = (state = {}, action) => {
    switch(action.type) {
        case "update-search-results":
            return {
                query: action.query,
                results: action.results
            };
        default:
            return (state);
    }

};

export default searchReducer;