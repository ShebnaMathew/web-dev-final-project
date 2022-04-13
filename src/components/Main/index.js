import React, { useEffect, useState } from "react";
import {Outlet} from "react-router-dom";
import './main.css';
import {useDispatch} from "react-redux";
import {getCurrentUserAction} from "../../actions/profile-actions";
import { searchNewMusicAction} from "../../actions/search-actions";
import {authorize} from "../../services/spotify/spotify-service";

const MainScreen = () => {

    const [token, setToken] = useState(false);

    useEffect(async () => {
        await authorize();
        setToken(true);
    }, [])

    const dispatch = useDispatch();
    
    getCurrentUserAction(dispatch);

    useEffect(() => {
        searchNewMusicAction(dispatch);
    }, [])

    return(
        <>
            <div className="wd-header-buffer"/>
            {token && <Outlet/>}
        </>
    )
}
export default MainScreen;