import React from "react";
import {Link, Outlet} from "react-router-dom";
import './main.css';
import {useDispatch} from "react-redux";
import {getCurrentUserAction, loginAction} from "../../actions/profile-actions";

const MainScreen = () => {

    const dispatch = useDispatch();

    getCurrentUserAction(dispatch);

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
            <Outlet/>
        </>
    )
}
export default MainScreen;