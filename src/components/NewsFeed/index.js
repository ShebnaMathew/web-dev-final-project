import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import './newsfeed.css';
import {getContentAction} from "../../actions/content-action";
import PostList from "./PostList";

const NewsFeed = () => {

    const dispatch = useDispatch();

    const [ready, setReady] = useState(false);
    
    const news = useSelector((state) => state.newsResults);
    const user = useSelector((state) => state.user);

    useEffect(async () => {
        setReady(false);
        await getContentAction(dispatch, user._id)
        setReady(true)
    }, [user._id])

    return(
        <>
        {
            !ready && <i className="fa wd-spinner-pos fa-3x fa-spinner fa-spin"/>
        }
        {
            ready && <PostList posts={news}/>
        }
    </>
    )
}

export default NewsFeed;