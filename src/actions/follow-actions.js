import {addFollow, removeFollow} from "../services/backend/follow-service";

export const ADD_FOLLOW = "set-new-follower";
export const REMOVE_FOLLOW = "remove-follower";

export const addFollowAction = async (dispatch, follower_id, followee_id) => {
    await addFollow(follower_id, followee_id);
    dispatch({
        type: ADD_FOLLOW,
        follower: follower_id,
        followee: followee_id
    })
}

export const removeFollowAction = async (dispatch, follower_id, followee_id) => {
    await removeFollow(follower_id, followee_id);
    dispatch({
        type: REMOVE_FOLLOW,
        follower: follower_id,
        followee: followee_id
    })
}