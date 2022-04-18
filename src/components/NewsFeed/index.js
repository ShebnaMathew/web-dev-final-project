import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {aggregateSearchResults} from "../../util/AggregateUtil";
import { shuffle } from "../../util/ShuffleUtil";
import StackGrid from "react-stack-grid";
import './newsfeed.css';
import {searchNewMusicAction, setAllPosts, setPostsToRender} from "../../actions/search-actions";
import { getArtistName, getImage } from "../../util/GetPostDetails";
import { useNavigate } from "react-router-dom";
import {getContentAction} from "../../actions/content-action";

const NewsFeed = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ready, setReady] = useState(false);
    
    const news = useSelector((state) => state.newsResults);
    const user = useSelector((state) => state.user);
    // shuffle the posts, so all kinds of them show equally...not in order of type of media...this is a terrible comment
    const posts = shuffle(aggregateSearchResults(news));
    const morePosts = posts.sort(() => .5 - Math.random()).slice(0, 3);

    useEffect(async () => {
        // await getContentAction(dispatch, user._id)
        await searchNewMusicAction(dispatch);
        setReady(true)
    }, [])

    useEffect(() => {
        setAllPosts(dispatch, posts);
    }, [])

    return(
        <>
        {!ready &&
            <i className="fa wd-spinner-pos fa-3x fa-spinner fa-spin"/>
        }
        {
            ready && <div className="container">
                <StackGrid columnWidth={350}>
                    {posts.map((post) => {

                        let artistName = getArtistName(post);
                        let image = getImage(post);

                        return (
                            <div key={post.id} className="card mb-3 me-3 wd-cursor mt-5" onClick={() => {
                                setPostsToRender(dispatch, morePosts);
                                navigate(`/post/${post.id}`, {state: {post: post, back: '/'}});
                                window.scrollTo(0, 0);
                            }}>
                                <img src={image} className="card-img-top wd-image-size" alt="..."/>
                                <div className="card-body">
                                    <h6>{post.name} - {artistName}</h6>
                                    <p className="mt-3">
                                        <span className="me-2"><i className="far fa-heart"/></span>
                                        <span
                                            className="me-4">{post.reacts && post.reacts.like ? post.reacts.like : 0}</span>
                                        <span className="me-2"><i className="far fa-comment"/></span>
                                        <span
                                            className="me-4">{post.reacts && post.reacts.comment ? post.reacts.comment : 0}</span>
                                    </p>
                                    {post.comments && post.comments.slice(0, 2).map((c) => {
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
        }
    </>
    )
}

export default NewsFeed;