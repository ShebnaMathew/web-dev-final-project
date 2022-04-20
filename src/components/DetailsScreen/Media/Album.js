import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {
    getAlbumAction,
    getArtistAction,
    getTrackAction,
    getTracks,
    setCurrentAlbum
} from "../../../actions/search-actions";
import CommentsTabList from "../Lists/CommentsTabList";
import TrackList from "../Lists/TrackList";
import {createPost, getPost} from "../../../services/backend/post-service";
import {likeContent, unlikeContent, getLikes} from "../../../services/backend/like-service";
import { prepareData } from "../../../util/PrepareDataUtil";


const Album = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const params = useParams();
    const id = params.postId;
    //const [data, setData] = useState(getPost(id)); // once getPost is setup
    const [data, setData] = useState(null);

    const [showTracks, setShowTracks] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const album = useSelector((state) => state.searchResults.current_album);
    const artist = useSelector((state) => state.searchResults.current_artist);

    const [albumReady, setAlbumReady] = useState(false);
    const [pageReady, setPageReady] = useState(false);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState("");
    const [style, setStyle] = useState("far"); // get current user like stat

    useEffect(async () => {
        if (!albumReady) {
            await getAlbumAction(dispatch, id);
            setLikes(getLikes(id));
            setAlbumReady(true);
        }
    }, [])

    useEffect(async () => {
        if (!pageReady && albumReady) {
            await getTracks(dispatch, album.id);
            await getArtistAction(dispatch, album.artists[0].id);
            setPageReady(true);
        }
    }, [albumReady])

    useEffect(() => {
        if(pageReady && albumReady && data === null) {
            const check = prepareData(album, 'album');
            console.log("check data: ", check)
            setData(check);
            console.log("data: ", data)
            createPost(data); 
        }
    }, [pageReady, albumReady])

    // _MONGO: get likes and comments for this album

    return(
        <>
        {!data &&
            <i className="fa wd-spinner-pos fa-3x fa-spinner fa-spin"/>
        }
        {data &&
            <div class="container wd-details-container wd-detail-max-width">
                <div class="row justify-content-center m-0 wd-details-container-children">

                    <div className="col col-lg-1 justify-content-center mt-3">
                        <button
                            className="row justify-content-center mt-5 btn btn-dark wd-round-btn wd-details-width-height px-0"
                            onClick={() => navigate(location.state.back)}>
                            <i class="fas fa-angle-left"/>
                        </button>
                    </div>
                    <div class="col col-lg-6 wd-background-banner wd-details-container-children">
                        <div class="row justify-content-md-center mt-5">
                            <img src={data.image_url} class="m-3 wd-detail-box-shadow wd-detail-img-height"
                                 alt="..."/>
                        </div>
                        <div class="row justify-content-md-center mb-5">
                            <div
                                className="row justify-content-center mt-3">{album.album_type.charAt(0).toUpperCase() + album.album_type.substring(1)}</div>
                            <p className="row justify-content-center mt-1">
                                <a href={data.spotify_url}
                                    target="_blank"
                                    className="row text-center justify-content-center mt-3 wd-detail-text-deco-none wd-detail-bold-font">{data.name}</a>
                            </p>
                            <a className="row justify-content-center mt-1 wd-detail-text-deco-none wd-detail-sub-bold-font"
                               onClick={() => navigate(`/artist/${artist.id}`, {state: {back: location.state.back}})}>{data.artist_name}</a>
                            <div className="row justify-content-center mt-1">Release date: {data.release_date}</div>
                            <div className="row justify-content-center mt-1">Total tracks: {data.total_tracks}</div>
                        </div>
                    </div>
                    <div
                        className="col col-lg-5 wd-detail-right-max wd-detail-parent wd-zero-margin wd-details-container-children wd-details-container-children-overflow">
                        <p className="mt-4">
                        <span>
                            {/* get likes from db */}
                            <i className={`${style} fa-heart me-2 ${liked}`} onClick={() => {
                                if (liked === "") {setLiked("wd-liked-color"); setStyle("fas")} else {setLiked(""); setStyle("far")}
                            }}/>
                            <b>324234</b>
                            {/* when the db is ready, uncomment below */}
                            {/* <b>{likes}</b> */}
                            <span> likes</span>
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
                        {showTracks && <TrackList back={location.state.back}/>}
                        {/* dummy data -> todo go to profile for each user once we have the data */}
                        {showComments && <CommentsTabList/>}
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default Album;