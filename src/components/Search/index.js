import React, {useState} from "react";
import '../Profile/profile-main.css';
import './search.css';
import {useSelector} from "react-redux";
import {aggregateSearchResults} from "../../util/AggregateUtil";
import PostList from "../NewsFeed/PostList";
import Post from "../NewsFeed/Post";

const SearchScreen = () => {

    const searchResults = useSelector((state) => state.searchResults);
    const aggregatedResults = aggregateSearchResults(searchResults);

    const [showPost, setShowPost] = useState(false);
    const [post, setPost] = useState('');

    return(
        <>
            {!showPost ? <PostList posts={aggregatedResults} setShowPost={setShowPost} setPost={setPost}/>: <Post post={post} posts={[...aggregatedResults]} setShowPost={setShowPost} setPost={setPost}/>}
        </>
    );
}
export default SearchScreen;