import {GET_ALBUM, GET_PLAYLIST, GET_SHOW, GET_SINGLE_EPISODE, GET_SINGLE_TRACK} from "./search-actions";
import {addComment, deleteComment} from "../services/backend/comment-service";

export const addCommentAction = async (dispatch,
                                       commentor_id,
                                       commentor_name,
                                       post_id,
                                       post_name,
                                       image_url,
                                       type,
                                       comment,
                                       body) => {

    let commentBody = {
        commentor_id,
        commentor_name,
        post_id,
        post_name,
        image_url,
        comment,
        type
    }
    const result = await addComment(commentBody);
    commentBody = {
        ...commentBody,
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
        case "show":
            dispatch_type = GET_SHOW;
            break
        case "track":
            dispatch_type = GET_SINGLE_TRACK;
            break;
        default:
            dispatch_type = "";
    }

    dispatch({
        type: dispatch_type,
        results: {
            ...body,
            comments: [
                ...body.comments,
                commentBody
            ]
        }
    })
}

export const deleteCommentAction = async (dispatch, comment_id, type, body) => {
    await deleteComment(comment_id);

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
        case "show":
            dispatch_type = GET_SHOW;
            break
        case "track":
            dispatch_type = GET_SINGLE_TRACK;
            break;
        default:
            dispatch_type = "";
    }

    dispatch({
        type: dispatch_type,
        results: {
            ...body,
            comments: body.comments.filter(l => l._id !== comment_id)
        }
    })
}