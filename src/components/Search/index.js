import React, {useEffect, useState} from "react";
import '../Profile/profile-main.css';
import './search.css';
import {aggregateSearchResults} from "../../util/AggregateUtil";
import PostList from "../NewsFeed/PostList";
import Post from "../NewsFeed/Post";
import {useParams} from "react-router-dom";
import {search} from "../../services/spotify/spotify-service";
import {searchAction} from "../../actions/search-actions";
import {useDispatch, useSelector} from "react-redux";

const SearchScreen = () => {

    const params = useParams()
    const dispatch = useDispatch();

    const results = useSelector((state) => state.searchResults);

    const [showPost, setShowPost] = useState(false);
    const [post, setPost] = useState('');
    const [ready, setReady] = useState(false);

    const query = params.query;
    
    const aggregatedResults = aggregateSearchResults(results);

    useEffect(async () => {
        setReady(false);
        await searchAction(dispatch, query);
        setReady(true);
    }, [query, dispatch])

    return(
        <>
            {ready &&
                (!showPost ? <PostList posts={aggregatedResults} setShowPost={setShowPost} setPost={setPost}/>: <Post post={post} posts={[...aggregatedResults]} setShowPost={setShowPost} setPost={setPost}/>)
            }
            {!ready &&
                <i className="fa wd-spinner-pos fa-3x fa-spinner fa-spin"/>
            }
            </>
    );
}
export default SearchScreen;