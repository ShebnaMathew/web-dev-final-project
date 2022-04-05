import {getNewMusic} from "../services/spotify/spotify-service";

export const searchNewMusicAction = async (dispatch) => {
    const results = await getNewMusic();
    dispatch({
        type: "update-news",
        results: results
    })
}