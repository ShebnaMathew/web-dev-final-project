import Post from "./Post";
import recentPosts from "./recents-DUMMY.json";

const NewsFeed = () => {
    return(
        <Post posts={recentPosts}/>
    )
}

export default NewsFeed;