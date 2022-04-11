import { useLocation, useNavigate } from "react-router-dom";
import { getArtistId, getArtistName, getImage, getNumberOfTracksOrEpisodes, getReleaseDate } from "../../util/GetPostDetails";
import PostList from "./PostList";

const Post = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const recentPosts = location.state.posts;
    const allPosts = location.state.all_posts;
    const post = recentPosts.filter((p) => p.id === location.state.post_id)[0];

    const artistName = getArtistName(post);
    const artistId = getArtistId(post);
    const image = getImage(post);
    const releaseDate = getReleaseDate(post);
    const totalTracksOrEpisodes = getNumberOfTracksOrEpisodes(post);
    
    const morePosts = allPosts.sort(() => .5 - Math.random()).slice(0, 3)

    return(
        <>
        <div className="row mb-5 mt-5 mx-5">
            <div className="col-1">
                <button className="btn btn-dark wd-round-btn" onClick={() => navigate('/')}><i class="fas fa-angle-left"/></button>
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
                            (post.type === "artist") ? navigate(`/profile/${post.id}`) :
                            navigate('/details',{state: {post: post, search: null, newsfeed: location.pathname, newsfeedProps: {state: {post_id: post.id, posts: recentPosts, all_posts: allPosts}}}});
                        }}>{post.name}</a></div>
                        <div><a className="card-title h6 wd-post-text-decoration" onClick={() => {
                            (artistId) && navigate(`/profile/${post.id}`)
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
        <PostList posts={morePosts} allPosts={allPosts}/>
        </>
    )

}

export default Post;