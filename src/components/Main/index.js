import React, {useEffect, useState} from "react";
import {Link, Outlet} from "react-router-dom";
import './main.css';
import {useDispatch} from "react-redux";
import {getCurrentUserAction, loginAction} from "../../actions/profile-actions";
import {authorize} from "../../services/spotify/spotify-service";

const MainScreen = () => {

    const [token, setToken] = useState(false);

    useEffect(async () => {
        await authorize();
        setToken(true);
    }, [])

    const dispatch = useDispatch();

    getCurrentUserAction(dispatch);

    return(
        <>
            <div className="wd-header-buffer"/>
            {token && <Outlet/>}
        </>
    )
}
export default MainScreen;