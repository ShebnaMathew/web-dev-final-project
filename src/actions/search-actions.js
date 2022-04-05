import {getNewMusic, search} from "../services/spotify/spotify-service";

export const searchNewMusicAction = async (dispatch) => {
    const results = await getNewMusic();
    dispatch({
        type: "update-news",
        results: results
    })
}

export const searchAction = async (dispatch, searchString) => {
    const results = await search(searchString)
    dispatch({
        type: "set-search-results",
        results: results
    })
}