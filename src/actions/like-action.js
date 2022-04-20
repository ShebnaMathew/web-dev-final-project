import {GET_ALBUM} from "./search-actions";
import {likeContent, unlikeContent} from "../services/backend/like-service";

export const likeAction = async (dispatch, liker_id, post_id, type, body) => {

    const likeBody = {
        liker_id,
        post_id,
        type
    }
    const result = await likeContent(likeBody);
    likeBody.id = result;

    let dispatch_type;
    switch (type) {
        case "album":
            dispatch_type = GET_ALBUM
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
        default:
            dispatch_type = "";
    }

    dispatch({
        type: dispatch_type,
        results: {
            ...body,
            likes: body.likes.filter(l => l.id !== like_id)
        }
    })
}