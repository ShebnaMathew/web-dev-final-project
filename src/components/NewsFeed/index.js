import { useState } from "react";
import Post from "./Post";
import PostList from "./PostList";
import recentPosts from "./recents-DUMMY.json";

const NewsFeed = () => {

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