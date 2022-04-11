import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentsTabList from "../Lists/CommentsTabList";
import TrackEpisodeList from "../Lists/TrackEpisodeList";

const Album = (props) => {

    // use params to render through newsfeed, get the album deets from api
    
    //const post = props.post;
    const params = useParams();
    const navigate = useNavigate();

    console.log("hereeeeeee")
    const [showTracks, setShowTracks] = useState(true);
    const [showComments, setShowComments] = useState(false);

    const post = props.post;
    console.log("post: ", post)
    console.log("type: ", post.type)
    const search = props.search;
    console.log("search: ", search)
    const newsfeed = props.newsfeed;
    console.log("newsfeed: ", newsfeed)
    const newsfeedProps = props.newsfeedProps;

    
    
    
    
    console.log("newsfeed props: ", newsfeedProps)

    // if we want
    const handleKeypress = async e => {
        if (e.charCode === 13) {
            // e.target.value
            // add this comment to _MONGO/reducer
        }
    };

    // _API: get album tracks
    // _MONGO: get likes and comments for this album

    return(
        <>
        <div class="container wd-detail-max-width">
            <div class="row justify-content-center m-0">
                <div className="col col-lg-1 justify-content-center mt-3">
                <button className="row justify-content-center mt-5 btn btn-dark wd-round-btn wd-details-width-height px-0" onClick={() => {
                    if (search) navigate(search) 
                    else navigate(newsfeed, newsfeedProps);
                    }}>
                    <i class="fas fa-angle-left"/>
                </button>
                </div>
                <div class="col col-lg-7 wd-background-banner">
                    <div class="row justify-content-md-center mt-5">
                        <img src={post.images[0].url} class="m-3 wd-detail-box-shadow wd-detail-img-height" alt="..."/>
                    </div>
                    <div class="row justify-content-md-center mb-5">
                        <div className="row justify-content-center mt-3">{post.album_type.charAt(0).toUpperCase() + post.album_type.substring(1)}</div>
                        <p className="row justify-content-center mt-1"><a href={post.external_urls.spotify} target="_blank" className="row justify-content-center mt-3 wd-detail-text-deco-none wd-detail-bold-font">{post.name}</a></p>
                        <a href="#" className="row justify-content-center mt-1 wd-detail-text-deco-none wd-detail-sub-bold-font" onClick={() => navigate(`/profile/${post.artists[0].id}`)}>{post.artists[0].name}</a>
                        <div className="row justify-content-center mt-1">Release date: {post.release_date}</div>
                        <div className="row justify-content-center mt-1">Total tracks: {post.total_tracks}</div>
                    </div>
                </div>
                <div className="col col-lg-4 wd-detail-right-max wd-detail-parent wd-zero-margin">
                <p className="mt-4">
                    <span className="">
                        {/* get likes from db */}
                        <i class="far fa-heart me-2"/><b>324234</b><span> likes</span> 
                    </span>
                </p>
                <ul class="nav nav-tabs nav-fill">
                    <li class="nav-item">
                        <button class="nav-link" onClick={() => {
                            setShowTracks(true);
                            setShowComments(false);
                        }}>Tracks</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" onClick={() => {
                            setShowComments(true);
                            setShowTracks(false);
                        }}>Comments</button>
                    </li>
                </ul>
                {/* dummy data rn -> to-do navigate to each track detail screen */}
                {showTracks && <TrackEpisodeList/>}
                {/* dummy data -> todo go to profile for each user once we got the data */}
                {showComments && <CommentsTabList/>}
                </div>
            </div>
        </div>
        </>
    )
}

export default Album;