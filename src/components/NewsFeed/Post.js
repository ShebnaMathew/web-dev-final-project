import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getArtistAction, setPostsToRender } from "../../actions/search-actions";
import { getArtistId, getArtistName, getImage, getNumberOfTracksOrEpisodes, getReleaseDate } from "../../util/GetPostDetails";
import {addComment, deleteComment, getComments} from "../../services/backend/comment-service";
import {likeContent, unlikeContent, getLikes} from "../../services/backend/like-service";
import PostList from "./PostList";

const Post = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const allPosts = useSelector((state) => state.searchResults.all_posts);
    const artist = useSelector((state) => state.searchResults.current_artist);
    const user = useSelector((state) => state.user);

    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState("");
    const [style, setStyle] = useState("far"); // get current user like stat

    const post = location.state.post;

    const artistName = getArtistName(post);
    const artistId = getArtistId(post);
    const image = getImage(post);
    const releaseDate = getReleaseDate(post);
    const totalTracksOrEpisodes = getNumberOfTracksOrEpisodes(post);

    useEffect(() => {
        getArtistAction(dispatch, artistId);
    },[artistId])

    const [comments, setComments] = useState([]);
    const [currentComment, setCurrentComment] = useState("");
    const [triggerAlert, setTriggerAlert] = useState(false);

    //const params = useParams(); // uncomment when db

    // uncomment when db ready
    // useEffect(() => {
    //     setComments(getComments(params.postId)); // can we get the commentor name - not the id
    // }, [])

    const addToComments = () => {
        setComments([...comments, {commentor: "me", comment: currentComment}]);
        setCurrentComment("");
        //addComment(currentComment); // shouldnt this need the post id
    }

    const deleteFromComments = (c) => {
        setComments(comments.filter((comment) => comment !== c))
        //deleteComment(c); // should be comment id i guess
    }

    return(
        <>
        {!triggerAlert && <div className="row mb-5 mt-5 mx-5">
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
                            <span className="me-2">
                            <i className={`${style} fa-heart me-2 ${liked}`} onClick={() => {
                                if (liked === "") {setLiked("wd-liked-color"); setStyle("fas")} else {setLiked(""); setStyle("far")}
                            }}/></span>
                            <span className="me-4">{post.reacts && post.reacts.like ? post.reacts.like : 0}</span>
                            <span className="me-2"><i class="far fa-comment"/></span>
                            <span className="me-4">{post.reacts && post.reacts.comment ? post.reacts.comment : 0}</span>
                         </h6>
                        <hr/>
                        <div className="wd-post-max-height wd-post-overflow">
                            {comments.map((c) => {
                                console.log("c post: ", c)
                            return <p className="card-text">
                                <span className="wd-newsfeed-bold-text me-2 wd-detail-float-left">{c.commentor}</span>
                                <span className="wd-detail-float-left">{c.comment}</span>
                                <i class="fa-solid fa-xmark wd-detail-float-right" onClick={() => deleteFromComments(c)}></i>
                                <div className="wd-detail-float-done"></div>
                            </p>
                            }
                        )}
                        </div>
                        <hr/>
                        <div class="input-group">
                            <input type="text" class="form-control wd-detail-comment-btn wd-detail-comment" placeholder="Add a comment" onChange={(e) => setCurrentComment(e.target.value)} value={currentComment} aria-label="Recipient's username" aria-describedby="button-addon2"/>
                            <button class="btn btn-outline-secondary wd-detail-button-action" type="button" id="button-addon2" onClick={() => {
                                if (!user && !user._id) {
                                    setTriggerAlert(true);
                                } else {
                                    addToComments()
                                }
                                }
                            }>Comment</button>
                        </div>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                    </div>
                </div>
            </div>
        </div>}
        
        {/* good to show an alert letting them know that they need to login, rather than just disabling the option ? */}
{triggerAlert &&
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setTriggerAlert(false)}>Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>}

    <h6 className="row mb-2 mt-2 justify-content-center card-text">More posts</h6>
        <PostList/>
    </>
    )
}

export default Post;