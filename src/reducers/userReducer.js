const userReducer = (state = {}, action) => {
    switch(action.type) {
        case "set-user":
            return {
                ...state,
                ...action.data
            }
        default:
            return (state);
    }
};

export default userReducer;