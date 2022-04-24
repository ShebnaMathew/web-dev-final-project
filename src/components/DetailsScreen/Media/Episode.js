import { useDispatch, useSelector } from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import CommentsTabList from "../Lists/CommentsTabList";
import {getSingleEpisode} from "../../../actions/search-actions";
import React, { useEffect, useState } from "react";
import {likeAction, unlikeAction} from "../../../actions/like-action";

const Episode = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const params = useParams();
    const id = params.postId;

    const episode = useSelector((state) => state.searchResults.current_episode);
    const user = useSelector((state) => state.user);
    const [episodeReady, setEpisodeReady] = useState(false);

    let thisLike = null;
    let isLiked = false;
    if (episode.likes && user._id) {
        for (const l of episode.likes) {
            if (l.liker_id === user._id) {
                isLiked = true;
                thisLike = l;
                break;
            }
        }
    }

    useEffect(async () => {
        if (!episodeReady) {
            await getSingleEpisode(dispatch,id);
            setEpisodeReady(true);
        }
    }, [id])

    return(
        <>
        {!episodeReady &&
            <i className="fa wd-spinner-pos fa-3x fa-spinner fa-spin"/>
        }
        {episodeReady &&
            <div className="container wd-details-container wd-detail-max-width">
                <div className="row justify-content-center m-0 wd-details-container-children">
                    <div className="col-lg-7 wd-background-banner-episode wd-details-container-children">
                        <div className="row mt-5 justify-content-center text-center pb-3">
                            <div className="col-md-2 mt-3 justify-content-center text-center">
                                <button
                                    className="row mt-0 btn btn-dark wd-round-btn wd-details-width-height px-0"
                                    onClick={() => navigate("/show/" + episode.show_id)}>
                                    <i className="fas fa-angle-left"/>
                                </button>
                            </div>
                            <div className="col-md-10 mt-3 justify-content-center text-center">
                                <img src={episode.image_url} className="col-md-10 m-3 wd-detail-box-shadow wd-detail-img-height"
                                    alt="..."/>
                                <div className="justify-content-center text-center mt-3">Episode</div>
                                <p className="justify-content-center text-center mt-1">
                                    <a href={episode.spotify_url} target="_blank"
                                        className="row text-center justify-content-center mt-3 wd-detail-text-deco-none wd-detail-bold-font">
                                        {episode.name}
                                    </a>
                                </p>
                                <a className="justify-content-center text-center mt-1 wd-detail-text-deco-none wd-detail-sub-bold-font"
                                    onClick={() => navigate(`/show/${episode.show_id}`)}>
                                    Show: {episode.show_name}
                                </a>
                                <div className="justify-content-center text-center mt-1">Release date: {episode.release_date}</div>
                                <div className="justify-content-center text-center mt-1">{episode.description}</div>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-5 wd-detail-right-max wd-detail-parent wd-zero-margin wd-details-container-children wd-details-container-children-overflow">
                        <p className="mt-4">
                        <span title={!(user && user._id) ? "Log in or Sign up to like posts" : ""}>
                            <button disabled={!(user && user._id)} className="btn" onClick={async () => {
                                if (isLiked) {
                                    await unlikeAction(dispatch, thisLike._id, "episode", episode)
                                } else {
                                    await likeAction(dispatch, user._id, episode.post_id, "episode", episode)
                                }
                            }}>
                                <i className={`${isLiked ? "wd-liked-color" : ""} ${isLiked ? "fa" : "far"} fa-heart me-2`}/>
                                <b>{episode.likes.length}</b>
                                <span> likes</span>
                            </button>
                        </span>
                        </p>
                        Comments
                        <hr className="mt-0"/>
                        <CommentsTabList comments={episode.comments} type={"episode"} body={episode}/>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default Episode;