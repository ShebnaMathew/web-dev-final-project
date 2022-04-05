import React, {useEffect, useState} from "react";
import '../Profile/profile-main.css';
import './search.css';
import {useDispatch, useSelector} from "react-redux";
import {aggregateSearchResults} from "../../util/AggregateUtil";
import PostList from "../NewsFeed/PostList";
import Post from "../NewsFeed/Post";
import {searchAction} from "../../actions/search-actions";
import {useParams} from "react-router-dom";

const SearchScreen = () => {


    const searchResults = useSelector((state) => state.searchResults);
    const aggregatedResults = aggregateSearchResults(searchResults);

    const [results, setResults] = useState(aggregatedResults)
    const dispatch = useDispatch();
    const params = useParams()

    useEffect(async () => {
        await searchAction(dispatch, params.query);
        setResults(aggregatedResults)
    }, [])

    const [showPost, setShowPost] = useState(false);
    const [post, setPost] = useState('');

    return(
        <>
            {!showPost ? <PostList posts={results} setShowPost={setShowPost} setPost={setPost}/>: <Post post={post} posts={[...results]} setShowPost={setShowPost} setPost={setPost}/>}
        </>
    );
}
export default SearchScreen;