import React, {useEffect} from "react";
import {Link, Outlet} from "react-router-dom";
import './main.css';
import {useDispatch} from "react-redux";
import {getProfile, getUserProfile} from "../../api/backend/connector";

const MainScreen = () => {
    const dispatch = useDispatch();

    // mock logged in user
    const setCurrentProfile = async (id) => {
        const currentProfile = await getProfile(id);
        dispatch({
            type: "update-current-user",
            currentUser: currentProfile
        })
    }

    const setUserProfile = async () => {
        const userProfile = await getUserProfile();
        dispatch({
            type: "set-user-profile-data",
            userProfile: userProfile
        });
    }

    setUserProfile();

    return(
        <>
            
            <div className="row mb-3 mt-5 pt-3">
                <div>
                    {/*dispatch on id per click*/}
                    <Link onClick={() => setCurrentProfile(123)} to="/profile">User Profile</Link>
                    <span> | </span>
                    <Link onClick={() => setCurrentProfile(124)} to={'/profile/124'}>External Profile</Link>
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