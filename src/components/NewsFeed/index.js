import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {searchNewMusicAction} from "../../actions/search-actions";
import {aggregateSearchResults} from "../../util/AggregateUtil";
import { shuffle } from "../../util/ShuffleUtil";
import PostList from "./PostList";
import './newsfeed.css';

const NewsFeed = () => {

    const news = useSelector((state) => state.newsResults);
    const [ready, setReady] = useState(false);

    const dispatch = useDispatch();

    useEffect(async () => {
        setReady(false);
        await searchNewMusicAction(dispatch);
        setReady(true);
    }, [dispatch])

    // shuffle the posts, so all kinds of them show equally...not in order of type of media...this is a terrible comment
    const recentPosts = shuffle(aggregateSearchResults(news));

    return(
        <>
            {ready && <PostList posts={recentPosts} allPosts={recentPosts}/>}
            {!ready && <i className="fa wd-spinner-pos fa-3x fa-spinner fa-spin"/>}
        </>
        )
}

export default NewsFeed;