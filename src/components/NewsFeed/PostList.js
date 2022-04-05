import React, { useEffect, useState } from "react"; 
import StackGrid from "react-stack-grid";
import './newsfeed.css';
//import { Collapse } from bootstrap;

const PostList = (props) => {

    return(
        <StackGrid columnWidth={350}>
            {props.posts.map((post) => {

                let artistName = "";
                switch (post.type) {
                    case "album":
                    case "track":
                        artistName = post.artists[0].name;
                        break;
                    case "artist":
                    case "episode":
                        artistName = "";
                        break;
                    case "playlist":
                        artistName = post.owner.display_name;
                        break;
                    case "show":
                        artistName = post.publisher;
                }

                let image = ""
                if (post.images && post.images.length > 0) {
                    image = post.images[0].url;
                } else {
                    image = "/images/unavailable-image.jpg"
                }

                return (
                    <div class="card mb-3 me-3 wd-cursor" onClick={() => {
                        props.setPost(post);
                        props.setShowPost(true);
                        window.scrollTo(0, 0);
                    }
                    }>
                        
                        <img src={image} className="card-img-top" alt="..."/>
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
                            {post.comments && (post.comments.length > 2)? <p className="card-text">
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