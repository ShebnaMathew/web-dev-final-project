import { useLocation, useNavigate } from "react-router-dom";
import Album from "./Media/Album";
import Artist from "./Media/Artist";
import Episode from "./Media/Episode";
import Playlist from "./Media/Playlist";
import Show from "./Media/Show";
import Track from "./Media/Track";
import './details.css';

const DetailsScreen = () => {

    const location = useLocation();
    //console.log("type: ", location.state.post.type)
    //console.log("post: ", location.state.post)
    //console.log("search: ", location.state.search)
    //console.log("newsfeed: ", location.state.newsfeed)
    //console.log("newsfeed props: ", location.state.newsfeedProps)

    return(
        <>  
            {location.state.post.type === "album" && <Album post={location.state.post} search={location.state.search} newsfeed={location.state.newsfeed} newsfeedProps={location.state.newsfeedProps}/>}
            {/* {location.state.post.type === "artist" && <Artist post={location.state.post} search={location.state.search}/>} * remove during clean up if not used */}
            {location.state.post.type === "episode" && <Episode post={location.state.post} search={location.state.search} newsfeed={location.state.newsfeed} newsfeedProps={location.state.newsfeedProps}/>}
            {location.state.post.type === "playlist" && <Playlist post={location.state.post} search={location.state.search} newsfeed={location.state.newsfeed} newsfeedProps={location.state.newsfeedProps}/>}
            {location.state.post.type === "show" && <Show post={location.state.post} search={location.state.search} newsfeed={location.state.newsfeed} newsfeedProps={location.state.newsfeedProps}/>}
            {location.state.post.type === "track" && <Track post={location.state.post} search={location.state.search} newsfeed={location.state.newsfeed} newsfeedProps={location.state.newsfeedProps}/>}
        </>
    )
}

export default DetailsScreen;