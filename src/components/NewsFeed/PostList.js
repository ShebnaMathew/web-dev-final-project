import React from "react"; 
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import StackGrid from "react-stack-grid";
import { setPostsToRender } from "../../actions/search-actions";
import { getArtistName, getImage } from "../../util/GetPostDetails";

const PostList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const posts = useSelector((state) => state.searchResults.posts_to_render);
    const allPosts = useSelector((state) => state.searchResults.all_posts);
    const morePosts = allPosts.sort(() => .5 - Math.random()).slice(0, 3)
    
    return(
        <div className="container">
            <StackGrid columnWidth={350}>
                {posts.map((post) => {

                    let artistName = getArtistName(post);
                    let image = getImage(post);

                    return (
                        <div class="card mb-3 me-3 wd-cursor mt-5" onClick={() => {
                            setPostsToRender(dispatch, morePosts);
                            navigate(`/post/${post.id}`,{state: {post: post, back: '/'}});
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