import React from "react"; 
import { useLocation, useNavigate } from "react-router-dom";
import { getArtistName, getImage } from "../../util/GetPostDetails";

const SearchList = (props) => {

    const navigate = useNavigate();
    const location = useLocation();

    return(
        <div class="container-fluid py-2 mt-3 mb-0">
            <h5 class="wd-font-family">{props.media} <i class="fa-solid fa-chevron-right"></i></h5>
            <div class="d-flex flex-row flex-nowrap wd-search-horizontal-overflow">
                {props.posts.map((post) => {

                    let artistName = getArtistName(post);
                    let image = getImage(post);

                    return (
                        
                        <div class="card mb-3 wd-cursor mt-2 wd-search-min-width me-3" onClick={() => {
                            (post.type === "artist") ? navigate(`/profile/${post.id}`) :
                            navigate('/details',{state: {post: post, search: location.pathname}});
                            window.scrollTo(0, 0);
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