import React from "react";
import {Link, Outlet} from "react-router-dom";

const MainScreen = () => {
    return(
        <>
            <div className="row">
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
                <div className="col-10">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}
export default MainScreen;