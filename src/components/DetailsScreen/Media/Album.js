import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate} from "react-router-dom";
import { getTrackAction, getTracks, setCurrentAlbum } from "../../../actions/search-actions";
import CommentsTabList from "../Lists/CommentsTabList";
import TrackList from "../Lists/TrackList";

const Album = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [showTracks, setShowTracks] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const results = useSelector((state) => state.searchResults.current_album_tracks);

    const post = location.state.post;

    useEffect(() => {
        getTracks(dispatch, post.id);
        setCurrentAlbum(dispatch, post);
    }, [])

    useEffect(() => {
        getTrackAction(dispatch, results);
    }, [results])
    
    // _MONGO: get likes and comments for this album

    return(
        <>
        <div class="container wd-detail-max-width">
            <div class="row justify-content-center m-0">
        
                <div className="col col-lg-1 justify-content-center mt-3">
                    <button className="row justify-content-center mt-5 btn btn-dark wd-round-btn wd-details-width-height px-0" onClick={() => navigate(location.state.back)}>
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
                        <a className="row justify-content-center mt-1 wd-detail-text-deco-none wd-detail-sub-bold-font" onClick={() => navigate(`/profile/${post.artists[0].id}`)}>{post.artists[0].name}</a>
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
                    {showTracks && <TrackList back={location.state.back}/>}
                    {/* dummy data -> todo go to profile for each user once we have the data */}
                    {showComments && <CommentsTabList/>}
                </div>
            </div>
        </div>
        </>
    )
}

export default Album;