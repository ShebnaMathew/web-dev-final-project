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
            <div className="wd-header-buffer"/>
            <Outlet/>
        </>
    )
}
export default MainScreen;