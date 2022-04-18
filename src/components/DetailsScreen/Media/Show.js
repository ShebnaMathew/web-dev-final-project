import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getEpisodeAction, getEpisodes, getShowAction, setCurrentShow} from "../../../actions/search-actions";
import CommentsTabList from "../Lists/CommentsTabList";
import EpisodeList from "../Lists/EpisodeList";
import {createPost, getPost} from "../../../services/backend/post-service";
import {likeContent, unlikeContent, getLikes} from "../../../services/backend/like-service";

const Show = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const params = useParams();

    const id = params.postId;

    const [showEpisodes, setShowEpisodes] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const episodes = useSelector((state) => state.searchResults.current_show_episodes);
    const show = useSelector((state) => state.searchResults.current_show);

    const [showReady, setShowReady] = useState(false);
    const [pageReady, setPageReady] = useState(false);

    useEffect(async () => {
        if (!showReady) {
            await getShowAction(dispatch, id);
            setShowReady(true);
        }
    }, [])

    useEffect(async () => {
        if (!pageReady && showReady) {
            await getEpisodes(dispatch, id, show.episodes.total);
            setPageReady(true);
        }
        // takes a little bit to run
    }, [showReady])

    console.log(show);

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
                    <div class="col col-lg-7 wd-background-banner-show wd-details-container-children">
                        <div class="row justify-content-md-center mt-5">
                            <img src={show.images[0].url} class="m-3 wd-detail-box-shadow wd-detail-img-height"
                                 alt="..."/>
                        </div>
                        <div class="row justify-content-md-center mb-5">
                            <p className="row text-center mt-1"><a href={show.external_urls.spotify} target="_blank"
                                                                   className="row justify-content-center mt-3 wd-detail-text-deco-none wd-detail-bold-font">{show.name}</a>
                            </p>
                            <p className="row justify-content-center mt-1 wd-detail-sub-bold-font">by {show.publisher}</p>
                            <div className="row justify-content-center my-2">Total episodes: {show.total_episodes}</div>
                            <hr/>
                            <div className="row text-center mt-1">{show.description}</div>

                        </div>
                    </div>
                    <div
                        className="col col-lg-4 wd-detail-right-max wd-zero-margin wd-details-container-children wd-details-container-children-overflow">
                        <p className="mt-4">
                    <span className="">
                        <i class="far fa-heart me-2"/><b>324234</b><span> likes</span>
                    </span>
                        </p>
                        <ul class="nav nav-tabs nav-fill">
                            <li class="nav-item">
                                <button class="nav-link" onClick={() => {
                                    setShowEpisodes(true);
                                    setShowComments(false);
                                }}>Episodes
                                </button>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link" onClick={() => {
                                    setShowEpisodes(false);
                                    setShowComments(true);
                                }}>Comments
                                </button>
                            </li>
                        </ul>
                        {showEpisodes && <EpisodeList back={location.state.back}/>}
                        {showComments && <CommentsTabList/>}
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default Show;