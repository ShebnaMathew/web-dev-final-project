import React from "react"; 
import {useLocation, useNavigate} from "react-router-dom";
import StackGrid from "react-stack-grid";

const PostList = ({posts}) => {

    const navigate = useNavigate();
    const location = useLocation();

    console.log(posts)

    return(
        <div className="container">
            <StackGrid columnWidth={350}>
                {posts.map((post) => {
                    return (
                        <div className="card mb-3 me-3 wd-cursor mt-5" onClick={() => {

                            switch(post.type) {
                                case "track":
                                    navigate(`/track/${post.post_id}`, {state: {back: location.pathname, post: post}});
                                    break;
                                case "album":
                                    navigate(`/album/${post.post_id}`, {state: {back: location.pathname, post: post}});
                                    break;
                                case "artist":
                                    navigate(`/artist/${post.post_id}`, {state: {back: location.pathname, post: post}});
                                    break;
                                case "show":
                                    navigate(`/show/${post.post_id}`, {state: {back: location.pathname, post: post}});
                                    break
                                case "episode":
                                    navigate(`/episode/${post.post_id}`, {state: {back: location.pathname, post: post}});
                                    break;
                                case "playlist":
                                    navigate(`/playlist/${post.post_id}`, {state: {back: location.pathname, post: post}});
                                    break;
                            }
                        }}>
                            <img src={post.image_url ? post.image_url : "/images/unavailable-image.jpg"} className="card-img-top wd-image-size" alt="..."/>
                            <div className="card-body">
                                <h6 className="mb-0">{post.name}</h6>
                                <span className="wd-italic-text">{post.type}</span>
                                <p className="mt-3">
                                    <span className="me-2"><i className="far fa-heart"/></span>
                                    <span className="me-4">{post.reacts && post.reacts.like ? post.reacts.like : 0}</span>
                                    <span className="me-2"><i className="far fa-comment"/></span>
                                    <span className="me-4">{post.reacts && post.reacts.comment ? post.reacts.comment : 0}</span>
                                </p>
                            </div>
                        </div>
                    )
                })}
            </StackGrid>
        </div>
    )
}

export default PostList;