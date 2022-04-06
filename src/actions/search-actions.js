import {getNewMusic, search} from "../services/spotify/spotify-service";

export const UPDATE_NEWS = "update-news";
export const UPDATE_SEARCH = "update-search";

export const searchNewMusicAction = async (dispatch) => {
    const results = await getNewMusic();
    dispatch({
        type: UPDATE_NEWS,
        results: results
    })
}

export const searchAction = async (dispatch, searchString) => {
    const results = await search(searchString)
    dispatch({
        type: UPDATE_SEARCH,
        results: results
    })
}