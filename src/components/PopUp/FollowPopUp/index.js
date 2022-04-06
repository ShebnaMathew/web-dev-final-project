import React from "react";
import FollowPopupListItem from "./FollowPopUpListItem";

const FollowPopUpList = ({
    setShowFollow,
    followers,
    following,
}) => {
    return(
        <>
            { followers ?
                followers.map(follow => {
                    return <FollowPopupListItem setShowFollow={setShowFollow} name={follow.follower_name} id={follow.follower_id}/>
                })
                :
                following.map(follow => {
                    return <FollowPopupListItem setShowFollow={setShowFollow} name={follow.followee_name} id={follow.followee_id}/>
                })
            }
        </>
    )
}
export default FollowPopUpList;