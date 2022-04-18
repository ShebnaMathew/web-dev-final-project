import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {
    getPlaylistTrackAction,
    getTracksForPlaylist,
    getCurrentPlaylist,
    getPlaylistAction
} from "../../../actions/search-actions";
import CommentsTabList from "../Lists/CommentsTabList";
import PlaylistTrackList from "../Lists/PlaylistTrackList";
import {createPost, getPost} from "../../../services/backend/post-service";
import {likeContent, unlikeContent, getLikes} from "../../../services/backend/like-service";

const Playlist = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const params = useParams();

    const id = params.postId;

    const [showTracks, setShowTracks] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const playlist = useSelector((state) => state.searchResults.current_playlist);

    const [pageReady, setPageReady] = useState(false);
    
    useEffect(async () => {
        if (!pageReady) {
            await getPlaylistAction(dispatch, id);
            await getTracksForPlaylist(dispatch, id);
            setPageReady(true);
        }
    },[])

    // _MONGO: get likes and comments for this album

    return(
        <>
        {!pageReady &&
            <i className="fa wd-spinner-pos fa-3x fa-spinner fa-spin"/>
        }

        {pageReady &&
            <div class="container wd-details-container wd-detail-max-width">
                <div class="row justify-content-center m-0 wd-details-container-children">
                    <div className="col col-lg-1 justify-content-center mt-3">
                        <button
                            className="row justify-content-center mt-5 btn btn-dark wd-round-btn wd-details-width-height px-0"
                            onClick={() => navigate(location.state.back)}>
                            <i class="fas fa-angle-left"/>
                        </button>
                    </div>
                    <div class="col col-lg-7 wd-background-banner-playlist wd-details-container-children">
                        <div class="row justify-content-md-center mt-5">
                            <img src={playlist.images[0].url} class="m-3 wd-detail-box-shadow wd-detail-img-height"
                                 alt="..."/>
                        </div>
                        <div class="row justify-content-md-center mb-5">
                            <div className="row justify-content-center mt-3">Playlist</div>
                            <p className="row text-center mt-1"><a href={playlist.external_urls.spotify} target="_blank"
                                                                   className="row justify-content-center mt-3 wd-detail-text-deco-none wd-detail-bold-font">{playlist.name}</a>
                            </p>
                            <p className="row justify-content-center mt-1 wd-detail-sub-bold-font">Owner: {playlist.owner.display_name}</p>
                            {playlist.description !== "" &&
                            <div className="row justify-content-center mt-1">{playlist.description}</div>}
                            <div className="row justify-content-center mt-1">Total tracks: {playlist.tracks.total}</div>
                        </div>
                    </div>
                    <div
                        className="col col-lg-4 wd-detail-right-max wd-detail-parent wd-zero-margin wd-details-container-children wd-details-container-children-overflow">
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
                                }}>Tracks
                                </button>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link" onClick={() => {
                                    setShowComments(true);
                                    setShowTracks(false);
                                }}>Comments
                                </button>
                            </li>
                        </ul>
                        {showTracks && <PlaylistTrackList back={location.state.back}/>}
                        {showComments && <CommentsTabList/>}
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default Playlist;
