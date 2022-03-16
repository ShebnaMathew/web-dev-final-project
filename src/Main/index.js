import React from "react";
import {Link, Outlet} from "react-router-dom";
import './main.css';

const MainScreen = () => {
    return(
        <>
            <div className="row mb-3">
                <div>
                    <h4>One day, I'll be a header</h4>
                    <br/>
                    <Link to="/profile">Profile</Link>
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