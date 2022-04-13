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
                    if (user._id && user._id === follow._id) {
                        return <FollowPopupListItem setShowFollow={setShowFollow} name={follow.username} profilePicture={follow.profilePicture}/>
                    } else {
                        return <FollowPopupListItem setShowFollow={setShowFollow} name={follow.username} profilePicture={follow.profilePicture} id={follow._id}/>
                    }
                })
                :
                following.map(follow => {
                    if (user._id && user._id === follow._id) {
                        return <FollowPopupListItem setShowFollow={setShowFollow} name={follow.username} profilePicture={follow.profilePicture}/>
                    } else {
                        return <FollowPopupListItem setShowFollow={setShowFollow} name={follow.username} profilePicture={follow.profilePicture} id={follow._id}/>
                    }
                })
            }
        </>
    )
}
export default FollowPopUpList;