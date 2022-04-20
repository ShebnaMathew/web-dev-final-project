import { useDispatch, useSelector } from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import CommentsTabList from "../Lists/CommentsTabList";
import {createPost, getPost} from "../../../services/backend/post-service";
import {likeContent, unlikeContent, getLikes} from "../../../services/backend/like-service";
import {getEpisodeAction, getShowAction, getSingleEpisode} from "../../../actions/search-actions";
import React, { useEffect, useState } from "react";

const Episode = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const params = useParams();
    const id = params.postId;

    // going to episode directly -> post doesn't have a 'show' key - so this component won't render for post.show
    // the current show reducer state will hold the last show that was visited, which may not be the show for an episode that's selected directly from the search
    const episode = useSelector((state) => state.searchResults.current_episode);
    const show = useSelector((state) => state.searchResults.current_show);
    const [showReady, setShowReady] = useState(false);
    const [episodeReady, setEpisodeReady] = useState(false);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState("");
    const [style, setStyle] = useState("far"); // get current user like stat

    console.log('new render')
    console.log(show)
    console.log(episode)
    console.log(id)
    // console.log(show)

    const post = {}

    useEffect(async () => {
        if (!episodeReady) {
            await getSingleEpisode(dispatch,id);
            setEpisodeReady(true);
        }
    }, [id])

    useEffect(async () => {
        if(!showReady && episodeReady) {
            await getShowAction(dispatch, episode.show.id);
            setShowReady(true);
        }
    }, [episodeReady])

    return(
        <>
        {!showReady &&
            <i className="fa wd-spinner-pos fa-3x fa-spinner fa-spin"/>
        }

        {showReady &&
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
                            <img src={episode.images[0].url} className="m-3 wd-detail-box-shadow wd-detail-img-height"
                                 alt="..."/>
                        </div>
                        <div className="row justify-content-md-center mb-5">
                            <div className="row justify-content-center mt-3">Episode</div>
                            <p className="row text-center mt-1"><a href={episode.external_urls.spotify} target="_blank"
                                                                   className="row justify-content-center mt-3 wd-detail-text-deco-none wd-detail-bold-font">{episode.name}</a>
                            </p>
                            <a className="row justify-content-center mt-1 wd-detail-text-deco-none wd-detail-sub-bold-font"
                               onClick={
                                   () => navigate(`/show/${show.id}`, {
                                       state: {
                                           episode: show,
                                           back: location.state.back
                                       }
                                   })}>
                                Show: {show.name}</a>
                            <div className="row justify-content-center mt-1">Release date: {episode.release_date}</div>
                            <p className="row justify-content-center mt-1">{episode.description}</p>
                        </div>
                    </div>
                    <div
                        className="col col-lg-4 wd-detail-right-max wd-detail-parent wd-zero-margin wd-details-container-children wd-details-container-children-overflow">
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
                        Comments
                        <hr className="mt-0"/>
                        <CommentsTabList/>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default Episode;