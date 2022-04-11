import React from "react"; 
import { useNavigate } from "react-router-dom";
import StackGrid from "react-stack-grid";
import { getArtistName, getImage } from "../../util/GetPostDetails";

const PostList = (props) => {

    const navigate = useNavigate();

    return(
        <div className="container">
            <StackGrid columnWidth={350}>
                {props.posts.map((post) => {

                    let artistName = getArtistName(post);
                    let image = getImage(post);

                    return (
                        <div class="card mb-3 me-3 wd-cursor mt-5" onClick={() => {
                            navigate(`/post`,{state: {post_id: post.id, posts: props.posts, all_posts: props.allPosts}});
                            window.scrollTo(0, 0);
                        }}>
                            <img src={image} className="card-img-top wd-image-size" alt="..."/>
                            <div className="card-body">
                                <h6>{post.name} - {artistName}</h6>
                                <p className="mt-3">
                                    <span className="me-2"><i className="far fa-heart"/></span>
                                    <span className="me-4">{post.reacts && post.reacts.like ? post.reacts.like : 0}</span>
                                    <span className="me-2"><i className="far fa-comment"/></span>
                                    <span className="me-4">{post.reacts && post.reacts.comment ? post.reacts.comment : 0}</span>
                                </p>
                                {post.comments && post.comments.slice(0,2).map((c) => {
                                    return <p className="card-text">
                                            <span className="wd-newsfeed-bold-text me-2">{c.name}</span>
                                            <span>{c.comment}</span>
                                        </p>
                                })}
                                {post.comments && (post.comments.length > 2) && 
                                    <p className="card-text">
                                        <span className="wd-newsfeed-bold-text me-2">{post.comments.length - 2} more comments</span>
                                    </p>}
                            </div>
                        </div>
                    )
                })}
            </StackGrid>
        </div>
    )
}

export default PostList;