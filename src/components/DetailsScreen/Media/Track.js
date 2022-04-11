import { useLocation, useNavigate } from "react-router-dom";
import CommentsTabList from "../Lists/CommentsTabList";

const Track = (props) => {
    
    const navigate = useNavigate();
    const location = useLocation();

    const post = props.post;
    const search = props.search;

    const handleKeypress = async e => {
        if (e.charCode === 13) {
            // e.target.value
            // add comment in _MONGO
        }
    };

    // _API: get album tracks
    // _MONGO: get likes and comments for this album

    return(
        <div class="container wd-detail-max-width">
            <div class="row justify-content-center m-0">
                <div className="col col-lg-1 justify-content-center mt-3">
                <button className="row justify-content-center mt-5 btn btn-dark wd-round-btn wd-details-width-height px-0" onClick={() => navigate(search)}>
                    <i class="fas fa-angle-left"/>
                </button>
                </div>
                <div class="col col-lg-7 wd-background-banner-track">
                    <div class="row justify-content-md-center mt-5">
                        <img src={post.album.images[0].url} class="m-3 wd-detail-box-shadow wd-detail-img-height" alt="..."/>
                    </div>
                    <div class="row justify-content-md-center mb-5">
                        <div className="row justify-content-center mt-3">Track</div>
                        <p className="row justify-content-center mt-1"><a href={post.external_urls.spotify} target="_blank" className="row justify-content-center mt-3 wd-detail-text-deco-none wd-detail-bold-font">{post.name}</a></p>
                        <a className="row justify-content-center mt-1 wd-detail-text-deco-none wd-detail-sub-bold-font" onClick={
                            () => navigate('/details',{state: {post: post, search: location.pathname, newsfeed: null, newsfeedProps: null}})}>
                                Album: {post.album.name}</a> {/** the post in the state should be the album post, need to get that from the api */}
                        <a className="row justify-content-center mt-1 wd-detail-text-deco-none wd-detail-sub-bold-font" onClick={() => navigate(`/profile/${post.artists[0].id}`)}>{post.artists[0].name}</a>
                        <div className="row justify-content-center mt-1">Release date: {post.album.release_date}</div>
                        <div className="row justify-content-center mt-1">Duration: {Math.floor(post.duration_ms / 60000)}m {Math.floor(post.duration_ms / 1000 - (Math.floor(post.duration_ms / 60000)) * 60)}s</div>
                        <div className="row justify-content-center mt-1">Popularity Score: {post.popularity}</div>
                    </div>
                </div>
                <div className="col col-lg-4 wd-detail-right-max wd-detail-parent wd-zero-margin">
                <p className="mt-4">
                    <span className="">
                        <i class="far fa-heart me-2"/><b>324234</b><span> likes</span>
                    </span>
                </p>
                Comments
                <hr className="mt-0"/>
                <CommentsTabList/>
                </div>
            </div>
        </div>
    )
}

export default Track;