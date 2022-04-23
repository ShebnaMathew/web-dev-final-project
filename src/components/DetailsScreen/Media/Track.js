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

    const track = useSelector((state) => state.searchResults.current_track);

    const [pageReady, setPageReady] = useState(false);
    const user = useSelector((state) => state.user);

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

    return(
        <>
        {!pageReady &&
            <i className="fa wd-spinner-pos fa-3x fa-spinner fa-spin"/>
        }

        {pageReady &&
            <div className="container wd-details-container wd-detail-max-width">
                <div className="row justify-content-center m-0 wd-details-container-children">
                    <div className="col-lg-7 wd-background-banner-track wd-details-container-children">
                        <div className="row mt-5 justify-content-center text-center pb-3">
                            <div className="col-md-2 mt-3 justify-content-center text-center">
                                <button
                                    className="row mt-0 btn btn-dark wd-round-btn wd-details-width-height px-0"
                                    onClick={() => navigate(location.state.back)}>
                                    <i className="fas fa-angle-left"/>
                                </button>
                            </div>
                            <div className="col-md-10 mt-3 justify-content-center text-center">
                                <img src={track.image_url} className="col-md-10 m-3 wd-detail-box-shadow wd-detail-img-height"
                                        alt="..."/>
                                <div className="justify-content-center text-center mt-3">Track</div>
                                <p className="justify-content-center text-center mt-1">
                                    <a href={track.spotify_url} target="_blank"
                                        className="row text-center justify-content-center mt-3 wd-detail-text-deco-none wd-detail-bold-font">
                                        {track.name}
                                    </a>
                                </p>
                                <div>
                                    <a className="justify-content-center text-center mt-1 wd-detail-text-deco-none wd-detail-sub-bold-font"
                                        onClick={() => navigate(`/artist/${track.artist_id}`, {state: {back: location.state.back}})}>{track.artist_name}</a>
                               </div>
                                <a className="justify-content-center text-center mt-1 wd-detail-text-deco-none wd-detail-sub-bold-font"
                                    onClick={() => navigate(`/album/${track.album_id}`, {state: {back: location.state.back}})}>
                                    Album: {track.album_name}
                                </a>
                                <div className="justify-content-center text-center mt-1">Release date: {track.release_date}</div>
                                <div className="justify-content-center text-center mt-1">Duration: {track.track_duration}</div>
                                <div className="justify-content-center text-center mt-1">Popularity Score: {track.popularity}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 wd-detail-right-max wd-detail-parent wd-zero-margin wd-details-container-children wd-details-container-children-overflow">
                        <p className="mt-4">
                            <span>
                                <i className={`${isLiked ? "wd-liked-color" : ""} ${isLiked ? "fa" : "far"} fa-heart me-2`} onClick={async () => {
                                    if (isLiked) {
                                        await unlikeAction(dispatch, thisLike._id, "track", track)

                                    } else {
                                        await likeAction(dispatch, user._id, track.post_id, "track", track)
                                    }

                                }}/>
                                <b>{track.likes.length}</b>
                                <span> likes</span>
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