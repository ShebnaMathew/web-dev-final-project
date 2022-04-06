import {addFollow, removeFollow} from "../services/backend/follow-service";

export const ADD_FOLLOW = "set-new-follower";
export const REMOVE_FOLLOW = "remove-follower";

export const addFollowAction = async (dispatch, follower_id, follower_name, followee_id, followee_name) => {
    await addFollow(follower_id, follower_name, followee_id, followee_name);
    dispatch({
        type: ADD_FOLLOW,
        follower_id: follower_id,
        follower_name: follower_name,
        followee_id: followee_id,
        followee_name: followee_name
    })
}

export const removeFollowAction = async (dispatch, follower_id, followee_id) => {
    await removeFollow(follower_id, followee_id);
    dispatch({
        type: REMOVE_FOLLOW,
        follower_id: follower_id,
    })
}