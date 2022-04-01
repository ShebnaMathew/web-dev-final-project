import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {searchNewMusicAction} from "../../actions/search-actions";
import {aggregateSearchResults} from "../../util/AggregateUtil";
import { useState } from "react";
import Post from "./Post";
import PostList from "./PostList";

const NewsFeed = () => {

    const news = useSelector((state) => state.newsResults);

    const dispatch = useDispatch();

    useEffect(() => {
        searchNewMusicAction(dispatch);
    }, [])

    const recentPosts = aggregateSearchResults(news);

    const [showPost, setShowPost] = useState(false);
    const [post, setPost] = useState('');

    console.log("showPost: ", showPost);
    console.log("post Id: ", post);
    console.log("posstss: ", recentPosts);

    return(
        (!showPost) ? <PostList posts={recentPosts} setShowPost={setShowPost} setPost={setPost}/>: <Post post={post} posts={[...recentPosts]} setShowPost={setShowPost} setPost={setPost}/>
    )
}

export default NewsFeed;