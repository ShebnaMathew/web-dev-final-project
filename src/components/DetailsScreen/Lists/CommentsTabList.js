import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {addCommentAction, deleteCommentAction} from "../../../actions/comment-action";

const CommentsTabList = ({comments, type, body}) => {

    const [currentComment, setCurrentComment] = useState("");
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    console.log(user)

    // dummy list - get actual comments from db and render with map

    return(
        <div class="row justify-content-md-center"> 
                    <div class="list-group list-group-flush my-3 pe-0">
                        {comments.map((c) => 
                            <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                                <span className="wd-cursor-pointer wd-newsfeed-bold-text me-2 wd-detail-float-left"
                                      onClick={() => (user && user._id === c.commentor_id) ? navigate('/profile') : navigate(`/profile/${c.commentor_id}`)}>
                                    {c.commentor_name}
                                </span>
                                <span className="wd-detail-float-left">{c.comment}</span>
                                {(user._id && (user._id === c.commentor_id || user.isAdmin)) &&
                                    <i class="fa-solid fa-xmark wd-detail-float-right wd-cursor-pointer" onClick={() => deleteCommentAction(dispatch, c._id, type, body)}/>
                                }
                                <div className="wd-detail-float-done"/>
                            </p>
                        )}
                    </div>
                    <hr/>
                    {(user && user._id) &&
                        <div class="input-group mb-5">
                            <input type="text" class="form-control wd-detail-comment-btn wd-detail-comment" placeholder="Add a comment" onChange={(e) => setCurrentComment(e.target.value)} value={currentComment} aria-label="Recipient's username" aria-describedby="button-addon2"/>
                            <button class="btn btn-outline-secondary wd-detail-button-action"
                                    type="button"
                                    id="button-addon2"
                                    onClick={async () => {
                                        await addCommentAction(dispatch, user._id, user.username, body.post_id, body.name, body.image_url, type, currentComment, body);
                                        setCurrentComment("");
                                    }}>Comment</button>
                        </div>
                    }
                </div>
    )
}

export default CommentsTabList;