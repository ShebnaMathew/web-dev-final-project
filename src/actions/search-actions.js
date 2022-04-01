import {search, getNewMusic} from "../services/spotify/spotify-service";

export const searchAction = async (dispatch, searchString) => {
    let results = {};
    if (searchString !== '') {
        results = await search(searchString);
    }
    dispatch({
        type: "update-search-results",
        results: results
    })
}

export const searchNewMusicAction = async (dispatch) => {
    const results = await getNewMusic();
    dispatch({
        type: "update-news",
        results: results
    })
}