import {GET_ALBUM, GET_PLAYLIST, GET_SINGLE_EPISODE} from "./search-actions";
import {likeContent, unlikeContent} from "../services/backend/like-service";

export const likeAction = async (dispatch, liker_id, post_id, type, body) => {

    let likeBody = {
        liker_id,
        post_id,
        type
    }
    const result = await likeContent(likeBody);
    likeBody = {
        ...likeBody,
        _id: result
    }

    let dispatch_type;
    switch (type) {
        case "album":
            dispatch_type = GET_ALBUM
            break;
        case "episode":
            dispatch_type = GET_SINGLE_EPISODE;
            break;
        case "playlist":
            dispatch_type = GET_PLAYLIST;
            break;
        default:
            dispatch_type = "";
    }

    dispatch({
        type: dispatch_type,
        results: {
            ...body,
            likes: [
                ...body.likes,
                likeBody
            ]
        }
    })
}

export const unlikeAction = async (dispatch, like_id, type, body) => {
    await unlikeContent(like_id);

    let dispatch_type;
    switch (type) {
        case "album":
            dispatch_type = GET_ALBUM
            break;
        case "episode":
            dispatch_type = GET_SINGLE_EPISODE;
            break;
        case "playlist":
            dispatch_type = GET_PLAYLIST;
            break;
        default:
            dispatch_type = "";
    }

    dispatch({
        type: dispatch_type,
        results: {
            ...body,
            likes: body.likes.filter(l => l._id !== like_id)
        }
    })
}