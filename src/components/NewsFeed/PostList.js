import React from "react"; 
import {useNavigate} from "react-router-dom";
import StackGrid from "react-stack-grid";

const PostList = ({posts}) => {


    const navigate = useNavigate();

    return(
        <div className="container wd-max-width">
            <StackGrid columnWidth={350}>
                {posts.map((post) => {
                    return (
                        <div className="card mb-3 me-3 wd-cursor mt-5" onClick={() => {

                            switch(post.type) {
                                case "track":
                                    navigate(`/track/${post.post_id}`);
                                    break;
                                case "album":
                                    navigate(`/album/${post.post_id}`);
                                    break;
                                case "artist":
                                    navigate(`/artist/${post.post_id}`);
                                    break;
                                case "show":
                                    navigate(`/show/${post.post_id}`);
                                    break
                                case "episode":
                                    navigate(`/episode/${post.post_id}`);
                                    break;
                                case "playlist":
                                    navigate(`/playlist/${post.post_id}`);
                                    break;
                            }
                        }} key={post.post_id}>
                            <img src={post.image_url ? post.image_url : "/images/unavailable-image.jpg"} className="card-img-top wd-image-size" alt="..."/>
                            <div className="card-body">
                                <h6 className="mb-0">{post.name}</h6>
                                <span className="text-muted">{post.type.charAt(0).toUpperCase() + post.type.substring(1)}</span>
                                <p className="mt-3">
                                    {!post.dynamic &&
                                        <>
                                            <span className="me-2"><i className="far fa-heart"/></span>
                                            <span className="me-4">{post.likes}</span>
                                            <span className="me-2"><i className="far fa-comment"/></span>
                                            <span className="me-4">{post.comments}</span>
                                        </>
                                    }
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