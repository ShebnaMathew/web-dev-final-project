import {addFollow, removeFollow} from "../services/backend/follow-service";

export const ADD_FOLLOW = "set-new-follower";
export const REMOVE_FOLLOW = "remove-follower";

export const addFollowAction = async (dispatch, follower_id, followee_id, username, profilePicture) => {
    await addFollow(follower_id, followee_id);
    dispatch({
        type: ADD_FOLLOW,
        follower_id: follower_id,
        username: username,
        profilePicture: profilePicture
    })
}

export const removeFollowAction = async (dispatch, follower_id, followee_id) => {
    await removeFollow(follower_id, followee_id);
    dispatch({
        type: REMOVE_FOLLOW,
        follower_id: follower_id,
    })
}