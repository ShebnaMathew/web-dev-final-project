import { getContent } from "../services/backend/content-service";

export const UPDATE_NEWS = "update-news";

export const getContentAction = async (dispatch, user_id) => {
    const results = await getContent(user_id);
    dispatch({
        type: UPDATE_NEWS,
        results: results
    })
}