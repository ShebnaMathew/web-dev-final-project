const newsReducer = (state = {}, action) => {
    switch(action.type) {
        case "update-news":
            return action.results;
        default:
            return (state);
    }

};

export default newsReducer;