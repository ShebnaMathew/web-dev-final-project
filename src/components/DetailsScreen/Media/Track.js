import { useDispatch, useSelector } from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import CommentsTabList from "../Lists/CommentsTabList";
import {createPost, getPost} from "../../../services/backend/post-service";
import {likeContent, unlikeContent, getLikes} from "../../../services/backend/like-service";
import React, {useEffect, useState} from "react";
import {getAlbumAction, getArtistAction, getSingleTrackAction} from "../../../actions/search-actions";
import {likeAction, unlikeAction} from "../../../actions/like-action";

const Track = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const params = useParams();
    const id = params.postId;

    // const album = useSelector((state) => state.searchResults.current_album);
    const track = useSelector((state) => state.searchResults.current_track);

    const [pageReady, setPageReady] = useState(false);
    const user = useSelector((state) => state.user);

    console.log(track)

    let thisLike = null;
    let isLiked = false;
    if (track && track.likes && user._id) {
        for (const l of track.likes) {
            if (l.liker_id === user._id) {
                isLiked = true;
                thisLike = l;
                break;
            }
        }
    }

    useEffect(async () => {
        if (!pageReady) {
            await getSingleTrackAction(dispatch, id);
            setPageReady(true);
        }
    }, [])

    console.log(track);

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
                    <div class="col col-lg-7 wd-background-banner-track wd-details-container-children">
                        <div class="row justify-content-md-center mt-5">
                            <img src={track.image_url} class="m-3 wd-detail-box-shadow wd-detail-img-height"
                                 alt="..."/>
                        </div>
                        <div class="row justify-content-md-center mb-5">
                            <div className="row justify-content-center mt-3">Track</div>
                            <p className="row text-center mt-1"><a href={track.spotify_url} target="_blank"
                                                                   className="row justify-content-center mt-3 wd-detail-text-deco-none wd-detail-bold-font">{track.name}</a>
                            </p>
                            <a className="row justify-content-center mt-1 wd-detail-text-deco-none wd-detail-sub-bold-font"
                               onClick={
                                   () => navigate(`/album/${track.album_id}`, {state: {back: location.state.back}})}>
                                Album: {track.album_name}</a>
                            <a className="row justify-content-center mt-1 wd-detail-text-deco-none wd-detail-sub-bold-font"
                               onClick={() => navigate(`/artist/${track.artist_id}`, {state: {back: location.state.back}})}>{track.artist_name}</a>
                            <div className="row justify-content-center mt-1">Release
                                date: {track.release_date}</div>
                            <div
                                className="row justify-content-center mt-1">Duration: {track.track_duration}
                            </div>
                            <div className="row justify-content-center mt-1">Popularity Score: {track.popularity}</div>
                        </div>
                    </div>
                    <div
                        className="col col-lg-4 wd-detail-right-max wd-detail-parent wd-zero-margin wd-details-container-children wd-details-container-children-overflow">
                        <p className="mt-4">
                        <span title={!(user && user._id) ? "Log in or Sign up to like posts" : ""}>
                            {/* get likes from db */}
                            <button disabled={!(user && user._id)} className="btn" onClick={async () => {

                                if (isLiked) {
                                    await unlikeAction(dispatch, thisLike._id, "track", track)

                                } else {
                                    await likeAction(dispatch, user._id, track.post_id, "track", track)
                                }

                            }}>
                                {/* get likes from db */}
                                <i className={`${isLiked ? "wd-liked-color" : ""} ${isLiked ? "fa" : "far"} fa-heart me-2`}/>
                                <b>{track.likes.length}</b>
                                {/* when the db is ready, uncomment below */}
                                {/* <b>{likes}</b> */}
                                <span> likes</span>
                            </button>
                        </span>
                        </p>
                        Comments
                        <hr className="mt-0"/>
                        <CommentsTabList comments={track.comments} type={"track"} body={track}/>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default Track;