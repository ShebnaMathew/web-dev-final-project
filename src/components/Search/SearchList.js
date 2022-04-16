import React from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getSingleEpisode } from "../../actions/search-actions";
import { getArtistName, getImage } from "../../util/GetPostDetails";

const SearchList = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const episode = useSelector((state) => state.searchResults.current_episode);

    return(
        <div class="container-fluid py-2 mt-3 mb-0">
            <h5 class="wd-font-family">{props.media} <i class="fa-solid fa-chevron-right"></i></h5>
            <div class="d-flex flex-row flex-nowrap wd-search-horizontal-overflow">
                {props.posts.map((post) => {

                    let artistName = getArtistName(post);
                    let image = getImage(post);

                    return (
                            <div class="card mb-3 wd-cursor mt-2 wd-search-min-width me-3" onClick={() => {
                                (post.type === "artist") && navigate(`/artist/${post.id}`, {state: {back: location.pathname, post: post}});
                                (post.type === "album") && navigate(`/album/${post.id}`, {state: {back: location.pathname, post: post}});
                                (post.type === "track") && navigate(`/track/${post.id}`, {state: {back: location.pathname, post: post}});
                                (post.type === "playlist") && navigate(`/playlist/${post.id}`, {state: {back: location.pathname, post: post}});
                                (post.type === "show") && navigate(`/show/${post.id}`, {state: {back: location.pathname, post: post}});
                                if (post.type === "episode") {
                                    getSingleEpisode(dispatch, post.id);
                                    navigate(`/episode/${post.id}`, {state: {back: location.pathname, post: episode}});
                                }

                            }}>
                            <img src={image} className="card-img-top wd-image-size" alt="..."/>
                            <div className="card-body">
                                <h6>{post.name}{artistName && " - "+artistName}</h6>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchList;