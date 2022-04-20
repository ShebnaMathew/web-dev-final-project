import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {addComment, deleteComment, getComments} from "../../../services/backend/comment-service";
import {likeContent, unlikeContent, getLikes} from "../../../services/backend/like-service";

const CommentsTabList = () => {

    const [comments, setComments] = useState([]);
    const [currentComment, setCurrentComment] = useState("");
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    //const params = useParams(); // uncomment when db

    // uncomment when db ready
    // useEffect(() => {
    //     setComments(getComments(params.postId)); // can we get the commentor name - not the id
    // }, [])

    const addToComments = () => {
        setComments([...comments, {id:'', commentor: "me", comment: currentComment}]);
        setCurrentComment("");
        addComment(currentComment); // shouldnt this need the post id
    }

    const deleteFromComments = (c) => {
        setComments(comments.filter((comment) => comment !== c))
        deleteComment(c); // should be comment id i guess
    }

    // dummy list - get actual comments from db and render with map

    return(
        <div class="row justify-content-md-center"> 
                    <div class="list-group list-group-flush my-3 pe-0"> 
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2 wd-detail-float-left">Rando 1</span>
                            <span className="wd-detail-float-left">Rando 1's comment</span>
                            <div className="wd-detail-float-done"></div>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2 wd-detail-float-left">Rando 2</span>
                            <span className="wd-detail-float-left">Rando 2's comment</span>
                            <div className="wd-detail-float-done"></div>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2 wd-detail-float-left">Rando 3</span>
                            <span className="wd-detail-float-left">Rando 3's comment</span>
                            <div className="wd-detail-float-done"></div>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2 wd-detail-float-left">Rando 4</span>
                            <span className="wd-detail-float-left">Rando 4's comment</span>
                            <div className="wd-detail-float-done"></div>
                        </p>
                        {comments.map((c) => 
                            <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                                <span className="wd-newsfeed-bold-text me-2 wd-detail-float-left" onClick={() => navigate(`/profile/${c.id}`)}>{c.commentor}</span>
                                <span className="wd-detail-float-left">{c.comment}</span>
                                {(user && user._id) && <i class="fa-solid fa-xmark wd-detail-float-right" onClick={() => deleteFromComments(c)}></i>}
                                <div className="wd-detail-float-done"></div>
                            </p>
                        )}
                    </div>
                    <hr/>
                    {(user && user._id) &&
                        <div class="input-group mb-5">
                            <input type="text" class="form-control wd-detail-comment-btn wd-detail-comment" placeholder="Add a comment" onChange={(e) => setCurrentComment(e.target.value)} value={currentComment} aria-label="Recipient's username" aria-describedby="button-addon2"/>
                            <button class="btn btn-outline-secondary wd-detail-button-action" type="button" id="button-addon2" onClick={() => addToComments()}>Comment</button>
                        </div>
                    }
                </div>
    )
}

export default CommentsTabList;