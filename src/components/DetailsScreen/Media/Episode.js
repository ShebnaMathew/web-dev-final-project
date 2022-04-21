import { useDispatch, useSelector } from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import CommentsTabList from "../Lists/CommentsTabList";
import {createPost, getPost} from "../../../services/backend/post-service";
import {likeContent, unlikeContent, getLikes} from "../../../services/backend/like-service";
import {getEpisodeAction, getShowAction, getSingleEpisode} from "../../../actions/search-actions";
import React, { useEffect, useState } from "react";
import {likeAction, unlikeAction} from "../../../actions/like-action";

const Episode = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const params = useParams();
    const id = params.postId;

    // going to episode directly -> post doesn't have a 'show' key - so this component won't render for post.show
    // the current show reducer state will hold the last show that was visited, which may not be the show for an episode that's selected directly from the search
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
                    <div className="col col-lg-1 justify-content-center mt-3">
                        <button
                            className="row justify-content-center mt-5 btn btn-dark wd-round-btn wd-details-width-height px-0"
                            onClick={() => navigate(location.state.back)}>
                            <i className="fas fa-angle-left"/>
                        </button>
                    </div>
                    <div className="col col-lg-7 wd-background-banner-episode wd-details-container-children">
                        <div className="row justify-content-md-center mt-5">
                            <img src={episode.image_url} className="m-3 wd-detail-box-shadow wd-detail-img-height"
                                 alt="..."/>
                        </div>
                        <div className="row justify-content-md-center mb-5">
                            <div className="row justify-content-center mt-3">Episode</div>
                            <p className="row text-center mt-1"><a href={episode.spotify_url} target="_blank"
                                                                   className="row justify-content-center mt-3 wd-detail-text-deco-none wd-detail-bold-font">{episode.name}</a>
                            </p>
                            <a className="row justify-content-center mt-1 wd-detail-text-deco-none wd-detail-sub-bold-font"
                               onClick={
                                   () => navigate(`/show/${episode.show_id}`, {
                                       state: {
                                           episode: episode,
                                           back: location.state.back
                                       }
                                   })}>
                                Show: {episode.show_name}</a>
                            <div className="row justify-content-center mt-1">Release date: {episode.release_date}</div>
                            <p className="row justify-content-center mt-1">{episode.description}</p>
                        </div>
                    </div>
                    <div
                        className="col col-lg-4 wd-detail-right-max wd-detail-parent wd-zero-margin wd-details-container-children wd-details-container-children-overflow">
                        <p className="mt-4">
                        <span>
                            {/* get likes from db */}
                            <i className={`${isLiked ? "wd-liked-color" : ""} ${isLiked ? "fa" : "far"} fa-heart me-2`} onClick={async () => {

                                if (isLiked) {
                                    await unlikeAction(dispatch, thisLike._id, "episode", episode)

                                } else {
                                    await likeAction(dispatch, user._id, episode.post_id, "episode", episode)
                                }
                            }}/>
                            <b>{episode.likes.length}</b>
                            {/* when the db is ready, uncomment below */}
                            {/* <b>{likes}</b> */}
                            <span> likes</span>
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