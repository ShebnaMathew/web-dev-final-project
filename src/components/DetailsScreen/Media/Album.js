import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {likeAction, unlikeAction} from "../../../actions/like-action";
import {
    getAlbumAction,
    getArtistAction,
    getTracks,
} from "../../../actions/search-actions";
import CommentsTabList from "../Lists/CommentsTabList";
import TrackList from "../Lists/TrackList";

const Album = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const params = useParams();
    const id = params.postId;

    const [showTracks, setShowTracks] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const [commentActive, setCommentActive] = useState('');
    const [otherActive, setOtherActive] = useState('active');

    const album = useSelector((state) => state.searchResults.current_album);
    const user = useSelector((state) => state.user);

    let thisLike = null;
    let isLiked = false;

    if (album.likes && user._id) {
        for (const l of album.likes) {
            if (l.liker_id === user._id) {
                isLiked = true;
                thisLike = l;
                break;
            }
        }
    }

    const [albumReady, setAlbumReady] = useState(false);
    const [pageReady, setPageReady] = useState(false);

    useEffect(async () => {
        if (!albumReady) {
            await getAlbumAction(dispatch, id);
            setAlbumReady(true);
        }
    }, [])


    useEffect(async () => {
        if (!pageReady && albumReady) {
            await getTracks(dispatch, album.post_id);
            await getArtistAction(dispatch, album.artist_id);
            setPageReady(true);
        }
    }, [albumReady])

    // _MONGO: get likes and comments for this album

    return(
        <>
        {!pageReady &&
            <i className="fa wd-spinner-pos fa-3x fa-spinner fa-spin"/>
        }
        {pageReady &&
            <div className="container wd-details-container wd-detail-max-width">
                <div className="row justify-content-center m-0 wd-details-container-children">
                    <div className="col-lg-7 wd-background-banner wd-details-container-children">
                        <div className="row mt-5 justify-content-center text-center pb-3">
                            <div className="col-md-2 mt-3 justify-content-center text-center">
                                <button
                                    className="row mt-0 btn btn-dark wd-round-btn wd-details-width-height px-0"
                                    onClick={() => navigate(`/artist/${album.artist_id}`)}>
                                    <i className="fas fa-angle-left"/>
                                </button>
                            </div>
                            <div className="col-md-10 mt-3 justify-content-center text-center">
                                <img src={album.image_url} className="col-md-10 m-3 wd-detail-box-shadow wd-detail-img-height"
                                    alt="..."/>
                                <div className="justify-content-center text-center mt-3">{album.album_type.charAt(0).toUpperCase() + album.album_type.substring(1)}</div>
                                <p className="justify-content-center text-center mt-1">
                                    <a href={album.spotify_url}
                                        target="_blank"
                                        className="row text-center justify-content-center mt-3 wd-detail-text-deco-none wd-detail-bold-font">
                                        {album.name}
                                    </a>
                                </p>
                                <a className="justify-content-center text-center mt-1 wd-detail-text-deco-none wd-detail-sub-bold-font"
                                    onClick={() => navigate(`/artist/${album.artist_id}`)}>
                                    {album.artist_name}
                                </a>
                                <div className="justify-content-center text-center mt-1">Release date: {album.release_date}</div>
                                <div className="justify-content-center text-center mt-1">Total tracks: {album.total_tracks}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 wd-detail-right-max wd-detail-parent wd-zero-margin wd-details-container-children wd-details-container-children-overflow">
                        <p className="mt-4">
                            <span title={!(user && user._id) ? "Log in or Sign up to like posts" : ""}>
                                <button disabled={!(user && user._id)} className="btn ps-0" onClick={async () => {

                                        if (isLiked) {
                                            await unlikeAction(dispatch, thisLike._id, "album", album)

                                        } else {
                                            await likeAction(dispatch, user._id, album.post_id, "album", album)
                                        }
                                    }}>
                                    <i className={`${isLiked ? "wd-liked-color" : ""} ${isLiked ? "fa" : "far"} fa-heart me-2`}/>
                                    <b>{album.likes.length}</b>
                                    <span> likes</span>
                                </button>
                            </span>
                        </p>
                        <ul className="nav nav-tabs nav-fill">
                            <li className={`nav-item wd-detail-tab-underline`}>
                                <button className={`nav-link ${otherActive}`} onClick={() => {
                                    setShowTracks(true);
                                    setShowComments(false);
                                    setOtherActive('active')
                                    setCommentActive('');
                                }}>Tracks
                                </button>
                            </li>
                            <li className={`nav-item wd-detail-tab-underline`}>
                                <button className={`nav-link ${commentActive}`} onClick={() => {
                                    setShowComments(true);
                                    setShowTracks(false);
                                    setOtherActive('')
                                    setCommentActive('active');
                                }}>Comments
                                </button>
                            </li>
                        </ul>

                        {showTracks && <TrackList/>}
                        {showComments && <CommentsTabList comments={album.comments} type={"album"} body={album}/>}
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default Album;