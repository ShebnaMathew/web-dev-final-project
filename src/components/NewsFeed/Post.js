import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getArtistAction, setPostsToRender } from "../../actions/search-actions";
import { getArtistId, getArtistName, getImage, getNumberOfTracksOrEpisodes, getReleaseDate } from "../../util/GetPostDetails";
import PostList from "./PostList";

const Post = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const allPosts = useSelector((state) => state.searchResults.all_posts);
    const artist = useSelector((state) => state.searchResults.current_artist);

    const post = location.state.post;

    const artistName = getArtistName(post);
    const artistId = getArtistId(post);
    const image = getImage(post);
    const releaseDate = getReleaseDate(post);
    const totalTracksOrEpisodes = getNumberOfTracksOrEpisodes(post);

    useEffect(() => {
        getArtistAction(dispatch, artistId);
    },[artistId])

    return(
        <>
        <div className="row mb-5 mt-5 mx-5">
            <div className="col-1">
                <button className="btn btn-dark wd-round-btn" onClick={() => {
                    setPostsToRender(dispatch, allPosts);
                    navigate('/');
                    }}><i class="fas fa-angle-left"/></button>
            </div>
            <div className="col-10 card wd-shadow">
                <div className="row">
                    <div className="col-5">
                    <a href={post.external_urls.spotify} target="_blank">
                        <img src={image} className="img-fluid rounded-start my-3" alt="..."/>
                    </a>
                    </div>
                    <div className="col-7">
                    <div className="card-body">
                        <div><a className="card-title h4 wd-post-text-decoration" onClick={() => {
                            (post.type === "artist") && navigate(`/artist/${post.id}`, {state: {back: '/', post: post}});
                            (post.type === "album") && navigate(`/album/${post.id}`, {state: {back: '/', post: post}});
                            (post.type === "track") && navigate(`/track/${post.id}`, {state: {back: '/', post: post}});
                            (post.type === "playlist") && navigate(`/playlist/${post.id}`, {state: {back: '/', post: post}});
                            (post.type === "show") && navigate(`/show/${post.id}`, {state: {back: '/', post: post}});
                            (post.type === "episode") && navigate(`/episode/${post.id}`, {state: {back: '/', post: post}});

                        }}>{post.name}</a></div>
                        <div><a className="card-title h6 wd-post-text-decoration" onClick={() => {
                            (artistId) && navigate(`/artist/${artistId}`, {state: {back: '/', post: artist}})
                        }}>{artistName}</a></div>
                        {releaseDate && <p className="card-text mt-4">Released on  {releaseDate}</p>}
                        {(post.type === 'album' || post.type === 'show') && <p className="card-text">{totalTracksOrEpisodes} {(post.type === 'album') ? ((totalTracksOrEpisodes === 1) ? 'track': 'tracks'):'episodes'}</p>}
                        <hr/>
                        <h6>
                            <span className="me-2"><i class="far fa-heart"/></span>
                            <span className="me-4">{post.reacts && post.reacts.like ? post.reacts.like : 0}</span>
                            <span className="me-2"><i class="far fa-comment"/></span>
                            <span className="me-4">{post.reacts && post.reacts.comment ? post.reacts.comment : 0}</span>
                         </h6>
                        <hr/>
                        <div className="wd-post-max-height wd-post-overflow">
                            {post.comments && post.comments.map((c) => {
                                return <p className="card-text">
                                        <span className="wd-newsfeed-bold-text me-2">{c.name}</span>
                                        <span>{c.comment}</span>
                                    </p>
                            })}
                        </div>
                        <hr/>
                        <div class="input-group">
                            <input type="text" class="form-control wd-detail-comment-btn wd-detail-comment" placeholder="Add a comment" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                            <button class="btn btn-outline-secondary wd-detail-button-action" type="button" id="button-addon2">Comment</button>
                        </div>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <h6 className="row mb-2 mt-2 justify-content-center card-text">More posts</h6>
        <PostList/>
    </>
    )
}

export default Post;