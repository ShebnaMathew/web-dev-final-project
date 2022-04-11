import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommentsTabList from "../Lists/CommentsTabList";
import TrackEpisodeList from "../Lists/TrackEpisodeList";

const Playlist = (props) => {
    const post = props.post;
    const navigate = useNavigate();

    const [showTracks, setShowTracks] = useState(true);
    const [showComments, setShowComments] = useState(false);

    const handleKeypress = async e => {
        if (e.charCode === 13) {
            // e.target.value
            // add comment in _MONGO
        }
    };

    // _API: get album tracks
    // _MONGO: get likes and comments for this album

    return(
        <div class="container wd-detail-max-width">
            <div class="row justify-content-center m-0">
                <div className="col col-lg-1 justify-content-center mt-3">
                <button className="row justify-content-center mt-5 btn btn-dark wd-round-btn wd-details-width-height px-0" onClick={() => navigate(props.search)}>
                    <i class="fas fa-angle-left"/>
                </button>
                </div>
                <div class="col col-lg-7 wd-background-banner-playlist">
                    <div class="row justify-content-md-center mt-5">
                        <img src={post.images[0].url} class="m-3 wd-detail-box-shadow wd-detail-img-height" alt="..."/>
                    </div>
                    <div class="row justify-content-md-center mb-5">
                        <div className="row justify-content-center mt-3">Playlist</div>
                        <p className="row justify-content-center mt-1"><a href={post.external_urls.spotify} target="_blank" className="row justify-content-center mt-3 wd-detail-text-deco-none wd-detail-bold-font">{post.name}</a></p>
                        <a href="#" className="row justify-content-center mt-1 wd-detail-text-deco-none wd-detail-sub-bold-font" onClick={() => navigate(`/profile/${post.owner.id}`)}>Owner: {post.owner.display_name}</a>
                        {post.description !== "" && <div className="row justify-content-center mt-1">{post.description}</div>}
                        <div className="row justify-content-center mt-1">Total tracks: {post.tracks.total}</div>
                    </div>
                </div>
                <div className="col col-lg-4 wd-detail-right-max wd-detail-parent wd-zero-margin">
                <p className="mt-4">
                    <span className="">
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
                {showTracks && <TrackEpisodeList/>}
                {showComments && <CommentsTabList/>}
                </div>
            </div>
        </div>
    )
}

export default Playlist;
