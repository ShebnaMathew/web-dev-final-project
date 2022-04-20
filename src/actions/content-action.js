import { getContent } from "../services/backend/content-service";
import {getNewMusic} from "../services/spotify/spotify-service";
import {prepareData} from "../util/PrepareDataUtil";

export const UPDATE_NEWS = "update-news";

export const getContentAction = async (dispatch, user_id) => {
    let results = await getContent(user_id);
    console.log('here!')
    if (results.length < 20) {
        const newsResults = await getNewMusic(20 - results.length);

        const newsPosts = []
        if (newsResults.albums.items) {
            for (const album of newsResults.albums.items) {
                const parsedData = prepareData(album, "album");
                newsPosts.push(parsedData);
            }
        }

        results = [...results, ...newsPosts]
    }

    dispatch({
        type: UPDATE_NEWS,
        results: results
    })
}