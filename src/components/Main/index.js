import React from "react";
import {Link, Outlet} from "react-router-dom";
import './main.css';
import {useDispatch, useSelector} from "react-redux";

const MainScreen = () => {

    const userProfile = useSelector((state) => state.userProfile);
    const currentProfile = useSelector((state) => state.currentProfile);
    const dispatch = useDispatch();

    const setCurrentToUser = () => {
        dispatch({
            type: "update-current-user",
            currentUser: userProfile
        })
    }

    const sampleProfile = {
        _id: 124,
        username: "otherUser",
        name: "Jane Doe",
        dob: "1995-06-17",
        email: "janeDoe@example.com",
        website: "janesexample.com",
        joined: "2022-04-21",
        bio: "This is jane doe's sample profile",
        followerCount: 125,
        followingCount: 256,
        profilePicture: "/images/blank-profile-picture.png",
        isArtist: false
    }

    const setExternalUser = () => {
        dispatch({
            type: "update-current-user",
            currentUser: sampleProfile
        })
    }

    return(
        <>
            <div className="row mb-3">
                <div>
                    <h4>One day, I'll be a header</h4>
                    <br/>
                    <Link onClick={() => setCurrentToUser()} to="/profile">User Profile</Link>
                    <span> | </span>
                    <Link onClick={() => setExternalUser()} to={`/profile/${sampleProfile._id}`}>External Profile</Link>
                    <span> | </span>
                    <Link to="/search">Search</Link>
                    <br/>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-xxl-8 col-xl-9 col-lg-10 col-md-12 col-sm-12">
                    <Outlet/>
                </div>
            </div>

        </>
    )
}
export default MainScreen;