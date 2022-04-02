import React, {useState} from "react";
import '../Profile/profile-main.css';
import './search.css';
import {useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import {aggregateSearchResults} from "../../util/AggregateUtil";
import PostList from "../NewsFeed/PostList";
import Post from "../NewsFeed/Post";

const SearchScreen = () => {

    const searchResults = useSelector((state) => state.searchResults);
    const aggregatedResults = aggregateSearchResults(searchResults);
    const {query} = useParams(); // query to be used to filter results

    // console.log(aggregatedResults)

    const [showPost, setShowPost] = useState(false);
    const [post, setPost] = useState('');

    return(
        <>
            <div className="wd-results-header">Results for '{query}'</div>
            {!showPost ? <PostList posts={aggregatedResults} setShowPost={setShowPost} setPost={setPost}/>: <Post post={post} posts={[...aggregatedResults]} setShowPost={setShowPost} setPost={setPost}/>}
        </>
    );
}
export default SearchScreen;