import PostList from "./PostList";

const Post = (props) => {
    const post = props.post;

    // console.log("post idx: ", post.idx)
    // console.log("posts: ", props.posts)
    // console.log("posts slice: ", props.posts.splice(post.idx+1,3))

    const morePosts = props.posts.sort(() => .5 - Math.random()).slice(0, 3)

    return(
        <>
        <div className="row mb-5 mt-5">
            <div className="col-1">
                <button className="btn btn-dark wd-round-btn" onClick={() => {
                        props.setPost('');
                        props.setShowPost(false);
                    }}><i class="fas fa-angle-left"/></button>
            </div>
            <div className="col-10 card wd-shadow">
                <div className="row">
                    <div className="col-5">
                    <a href={post.artists[0].external_urls.spotify} target="_blank"> 
                        <img src={post.images[0].url} className="img-fluid rounded-start my-3" alt="..."/>
                    </a>
                    </div>
                    <div className="col-7">
                    <div className="card-body">
                        <h4 className="card-title">{post.name}</h4>
                        <h5 className="card-title">{post.artists[0].name}</h5>
                        <p className="card-text mt-4">Released on  {post.release_date}</p>
                        <p className="card-text">{post.total_tracks} tracks</p>
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
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
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