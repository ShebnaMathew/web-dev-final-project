import { useNavigate } from "react-router-dom";
import PostList from "./PostList";


const Post = (props) => {
    const post = props.post;
    console.log("post idx: ", post.idx)
    console.log("posts: ", props.posts)
    console.log("posts slice: ", props.posts.splice(post.idx+1,3))

    const morePosts = props.posts.sort(() => .5 - Math.random()).slice(0, 3)

    return(
        <>
        <div className="row mb-5 mt-5">
            <div className="col-1">
                <button className="btn btn-light wd-round-btn wd-shadow" onClick={() => {
                        props.setPost('');
                        props.setShowPost(false);
                    }}><i class="fas fa-angle-left"></i></button>
            </div>
            <div class="col-10 card wd-shadow">
                <div class="row">
                    <div class="col-5">
                    <a href={post.artists[0].external_urls.spotify} target="_blank"> 
                        <img src={post.images[0].url} class="img-fluid rounded-start my-3" alt="..."/>
                    </a>
                    </div>
                    <div class="col-7">
                    <div class="card-body">
                        <h4 class="card-title">{post.name}</h4>
                        <h5 class="card-title">{post.artists[0].name}</h5>
                        <p class="card-text mt-4">Released on  {post.release_date}</p>
                        <p class="card-text">{post.total_tracks} tracks</p>
                        <hr/>
                        <h6>
                            <span className="me-2"><i class="far fa-heart"></i></span>
                            <span className="me-4">{post.reacts.like}</span>
                            <span className="me-2"><i class="far fa-comment"></i></span>
                            <span className="me-4">{post.reacts.comment}</span>
                         </h6>
                        <hr/>
                        <div class="wd-post-max-height wd-post-overflow">
                            {post.comments.map((c) => {
                                return <p class="card-text">
                                        <span className="wd-newsfeed-bold-text me-2">{c.name}</span>
                                        <span>{c.comment}</span>
                                    </p>
                            })}
                        </div>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <h6 className="row mb-2 mt-2 justify-content-center">More posts</h6>
        <PostList posts={morePosts} setShowPost={props.setShowPost} setPost={props.setPost}/>
        </>
    )

}

export default Post;