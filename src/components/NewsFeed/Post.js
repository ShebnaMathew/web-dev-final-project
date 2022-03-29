import React from "react"; 
import StackGrid from "react-stack-grid";
import './newsfeed.css';

const Post = (props) => {
    return(
        <StackGrid columnWidth={350}>
            {props.posts.map((post) => {
                return (
                    <div class="card mb-2 me-3">
                        <a href={post.artists[0].external_urls.spotify} target="_blank"> 
                            <img src={post.images[1].url} class="card-img-top" alt="..."/>
                            </a>
                        <div class="card-body">
                            <h6>{post.name} - {post.artists[0].name}</h6>
                            <p>
                                <span className="me-1"><i class="far fa-heart"></i></span>
                                <span className="me-2">{post.reacts.like}</span>
                                <span className="me-1"><i class="far fa-comment"></i></span>
                                <span className="me-2">{post.reacts.comment}</span>
                            </p>
                            {post.comments.map((c) => {
                                    return <p class="card-text">
                                        <span className="wd-newsfeed-bold-text me-2">{c.name}</span>
                                        <span>{c.comment}</span>
                                    </p>
                            })}
                        </div>
                    </div>
                )
            })}
        </StackGrid>
    )
}

export default Post;