import React from "react";
import {Link, Outlet} from "react-router-dom";
import './main.css';
import {useDispatch} from "react-redux";
import {getLoggedInUserProfile} from "../../actions/profile-actions";


const MainScreen = () => {

    const dispatch = useDispatch();

    getLoggedInUserProfile(dispatch)

    return(
        <>
            
            <div className="row mb-3 mt-5 pt-3">
                <div>
                    {/*dispatch on id per click*/}
                    <Link to="/profile">User Profile</Link>
                    <span> | </span>
                    <Link to={'/profile/124'}>External Profile</Link>
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