import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CommentsTabList from "../Lists/CommentsTabList";

const Episode = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const show = useSelector((state) => state.searchResults.current_show);

    const post = location.state.post;
    
    // _MONGO: get likes and comments for this album

    return(
        
        <div class="container wd-details-container wd-detail-max-width">
            <div class="row justify-content-center m-0 wd-details-container-children">
                <div className="col col-lg-1 justify-content-center mt-3">
                    <button className="row justify-content-center mt-5 btn btn-dark wd-round-btn wd-details-width-height px-0" onClick={() => navigate(location.state.back)}>
                        <i class="fas fa-angle-left"/>
                    </button>
                </div>
                <div class="col col-lg-7 wd-background-banner-episode wd-details-container-children">
                    <div class="row justify-content-md-center mt-5"> 
                        <img src={post.images[0].url} class="m-3 wd-detail-box-shadow wd-detail-img-height" alt="..."/>
                    </div>
                    <div class="row justify-content-md-center mb-5">
                        <div className="row justify-content-center mt-3">Episode</div>
                        <p className="row text-center mt-1"><a href={post.external_urls.spotify} target="_blank" className="row justify-content-center mt-3 wd-detail-text-deco-none wd-detail-bold-font">{post.name}</a></p>
                        <a className="row justify-content-center mt-1 wd-detail-text-deco-none wd-detail-sub-bold-font" onClick={
                            () => navigate(`/show/${show.id}`,{state: {post: show, back: location.state.back}})}>
                                Show: {show.name}</a>
                        <div className="row justify-content-center mt-1">Release date: {post.release_date}</div>
                        <p className="row justify-content-center mt-1">{post.description}</p>
                    </div>
                </div>
                <div className="col col-lg-4 wd-detail-right-max wd-detail-parent wd-zero-margin wd-details-container-children wd-details-container-children-overflow">
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

export default Episode;