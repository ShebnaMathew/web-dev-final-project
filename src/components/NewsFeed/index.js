import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {aggregateSearchResults} from "../../util/AggregateUtil";
import { shuffle } from "../../util/ShuffleUtil";
import StackGrid from "react-stack-grid";
import './newsfeed.css';
import {searchNewMusicAction, setAllPosts, setPostsToRender} from "../../actions/search-actions";
import { getArtistName, getImage } from "../../util/GetPostDetails";
import { useNavigate } from "react-router-dom";
import {getContentAction} from "../../actions/content-action";
import PostList from "./PostList";

const NewsFeed = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ready, setReady] = useState(false);
    
    const news = useSelector((state) => state.newsResults);
    const user = useSelector((state) => state.user);

    useEffect(async () => {
        await getContentAction(dispatch, user._id)
        setReady(true)
    }, [])

    return(
        <>
        {!ready &&
            <i className="fa wd-spinner-pos fa-3x fa-spinner fa-spin"/>
        }
        {
            ready && <PostList posts={news}/>
        }
    </>
    )
}

export default NewsFeed;