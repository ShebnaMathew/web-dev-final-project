import React, { useEffect, useState } from "react"; 
import StackGrid from "react-stack-grid";
import './newsfeed.css';
//import { Collapse } from bootstrap;

const PostList = (props) => {


    return(
        <StackGrid columnWidth={350}>
            {props.posts.map((post) => {

                return (
                    <div class="card mb-3 me-3 wd-cursor" onClick={() => {
                        props.setPost(post);
                        props.setShowPost(true);
                        window.scrollTo(0, 0);
                    }
                    }>
                        
                        <img src={post.images[1].url} class="card-img-top" alt="..."/> 
                        <div class="card-body">
                            <h6>{post.name} - {post.artists[0].name}</h6>
                            <p className="mt-3">
                                <span className="me-2"><i class="far fa-heart"></i></span>
                                <span className="me-4">{post.reacts && post.reacts.like ? post.reacts.like : 0}</span>
                                <span className="me-2"><i class="far fa-comment"></i></span>
                                <span className="me-4">{post.reacts && post.reacts.comment ? post.reacts.comment : 0}</span>
                            </p>
                            {post.comments && post.comments.slice(0,2).map((c) => {
                                    return <p class="card-text">
                                        <span className="wd-newsfeed-bold-text me-2">{c.name}</span>
                                        <span>{c.comment}</span>
                                    </p>
                            })}
                            {post.comments && (post.comments.length > 2)? <p class="card-text">
                                        <span className="wd-newsfeed-bold-text me-2">{post.comments.length - 2} more comments</span>
                                        
                                    </p>:""}
                        </div>
                    </div>
                )
            })}
        </StackGrid>
    )
}

export default PostList;