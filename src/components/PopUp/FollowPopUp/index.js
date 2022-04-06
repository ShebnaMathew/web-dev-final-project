import React from "react";
import FollowPopupListItem from "./FollowPopUpListItem";
import {useSelector} from "react-redux";

const FollowPopUpList = ({
    setShowFollow,
    followers,
    following,
}) => {

    const user = useSelector((state) => state.user);

    return(
        <>
            { followers ?
                followers.map(follow => {
                    if (user._id === follow.follower_id) {
                        return <FollowPopupListItem setShowFollow={setShowFollow} name={follow.follower_name}/>
                    } else {
                        return <FollowPopupListItem setShowFollow={setShowFollow} name={follow.follower_name} id={follow.follower_id}/>
                    }
                })
                :
                following.map(follow => {
                    if (user._id === follow.followee_id) {
                        return <FollowPopupListItem setShowFollow={setShowFollow} name={follow.followee_name}/>
                    } else {
                        return <FollowPopupListItem setShowFollow={setShowFollow} name={follow.followee_name} id={follow.followee_id}/>
                    }
                })
            }
        </>
    )
}
export default FollowPopUpList;