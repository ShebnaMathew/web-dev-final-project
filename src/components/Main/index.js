import React, { useEffect } from "react";
import {Outlet} from "react-router-dom";
import './main.css';
import {useDispatch} from "react-redux";
import {getCurrentUserAction} from "../../actions/profile-actions";
import { searchNewMusicAction} from "../../actions/search-actions";

const MainScreen = () => {

    const dispatch = useDispatch();
    
    getCurrentUserAction(dispatch);

    useEffect(() => {
        searchNewMusicAction(dispatch);
    }, [])

    return(
        <>
            <div className="wd-header-buffer"/>
            <Outlet/>
        </>
    )
}
export default MainScreen;