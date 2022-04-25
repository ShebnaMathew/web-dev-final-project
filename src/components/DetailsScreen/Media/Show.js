import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getEpisodes, getShowAction} from "../../../actions/search-actions";
import CommentsTabList from "../Lists/CommentsTabList";
import EpisodeList from "../Lists/EpisodeList";
import {likeAction, unlikeAction} from "../../../actions/like-action";

const Show = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const params = useParams();

    const id = params.postId;

    const [showEpisodes, setShowEpisodes] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const show = useSelector((state) => state.searchResults.current_show);
    const user = useSelector((state) => state.user);

    const [showReady, setShowReady] = useState(false);
    const [pageReady, setPageReady] = useState(false);
    const [commentActive, setCommentActive] = useState('');
    const [otherActive, setOtherActive] = useState('active');

    let thisLike = null;
    let isLiked = false;
    if (show.likes && user._id) {
        for (const l of show.likes) {
            if (l.liker_id === user._id) {
                isLiked = true;
                thisLike = l;
                break;
            }
        }
    }

    useEffect(async () => {
        if (!showReady) {
            await getShowAction(dispatch, id);
            setShowReady(true);
        }
    }, [])

    useEffect(async () => {
        if (!pageReady && showReady) {
            await getEpisodes(dispatch, id, show.total_episodes);
            setPageReady(true);
        }
    }, [showReady])

    console.log(show);

    return(
        <>
        {!pageReady &&
            <i className="fa wd-spinner-pos fa-3x fa-spinner fa-spin"/>
        }
        {pageReady &&
            <div className="container wd-details-container wd-detail-max-width">
                <div className="row justify-content-center m-0 wd-details-container-children">
                    <div className="col-lg-7 wd-background-banner-show wd-details-container-children">
                        <div className="row mt-5 justify-content-center text-center pb-3">
                            <div className="col-md-10 mt-3 justify-content-center text-center">
                                <img src={show.image_url} className="col-md-10 m-3 wd-detail-box-shadow wd-detail-img-height"
                                        alt="..."/>
                                <div className="justify-content-center text-center mt-3">Show</div>
                                <p className="justify-content-center text-center mt-1">
                                    <a href={show.spotify_url} target="_blank"
                                        className="row text-center justify-content-center mt-3 wd-detail-text-deco-none wd-detail-bold-font">
                                        {show.name}
                                    </a>
                                </p>
                                <p className="justify-content-center text-center mt-1 wd-detail-sub-bold-font">by {show.publisher}</p>
                                <div className="justify-content-center text-center mt-1">Total episodes: {show.total_episodes}</div>
                                <hr/>
                                <div className="justify-content-center text-center mt-1">{show.description}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 wd-detail-right-max wd-detail-parent wd-zero-margin wd-details-container-children wd-details-container-children-overflow">
                        <p className="mt-4">
                        <span title={!(user && user._id) ? "Log in or Sign up to like posts" : ""}>
                            <button disabled={!(user && user._id)} className="btn ps-0" onClick={async () => {

                                    if (isLiked) {
                                        await unlikeAction(dispatch, thisLike._id, "show", show)

                                    } else {
                                        await likeAction(dispatch, user._id, show.post_id, "show", show)
                                    }
                            }}>
                                <i className={`${isLiked ? "wd-liked-color" : ""} ${isLiked ? "fa" : "far"} fa-heart me-2`}/>
                                <b>{show.likes.length}</b>
                                <span> likes</span>
                            </button>
                        </span>
                        </p>
                        <ul className="nav nav-tabs nav-fill">
                            <li className="nav-item wd-detail-tab-underline">
                                <button className={`nav-link ${otherActive}`} onClick={() => {
                                    setShowEpisodes(true);
                                    setShowComments(false);
                                    setOtherActive('active')
                                    setCommentActive('');
                                }}>Episodes
                                </button>
                            </li>
                            <li className="nav-item wd-detail-tab-underline">
                                <button className={`nav-link ${commentActive}`} onClick={() => {
                                    setShowEpisodes(false);
                                    setShowComments(true);
                                    setOtherActive('')
                                    setCommentActive('active');
                                }}>Comments
                                </button>
                            </li>
                        </ul>
                        {showEpisodes && <EpisodeList/>}
                        {showComments && <CommentsTabList comments={show.comments} type={"show"} body={show}/>}
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default Show;