import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {addCommentAction, deleteCommentAction} from "../../../actions/comment-action";

const CommentsTabList = ({comments, type, body}) => {

    const [currentComment, setCurrentComment] = useState("");
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    return(
        <div className="row justify-content-md-center wd-position-relative wd-detail-max-height"> 
                    <div className="list-group list-group-flush my-3 pe-0 wd-detail-height-95 wd-detail-comment-overflow">
                        {comments.map((c) => 
                        <div className="row my-1">
                            <p className="col-11 list-group-item my-0 wd-detail-bg-black wd-list-no-border ps-4 pe-2 pt-0">
                                <span className="wd-cursor-pointer wd-newsfeed-bold-text me-2"
                                      onClick={() => (user && user._id === c.commentor_id) ? navigate('/profile') : navigate(`/profile/${c.commentor_id}`)}>
                                    {c.commentor_name}
                                </span>
                                <span className="wd-comment-width-inherit">{c.comment}</span>
                            </p>
                            {(user._id && (user._id === c.commentor_id || user.isAdmin)) &&
                                <i className="col-1 fa-solid fa-xmark wd-cursor-pointer my-0 ps-0 pt-1" onClick={() => deleteCommentAction(dispatch, c._id, type, body)}/>
                            }
                        </div>
                        )}
                    </div>
                    {(user && user._id) &&
                        <>
                            <hr/>
                            <div className="input-group mb-0 wd-comment-sticky">
                                <input type="text" className="form-control wd-detail-comment-btn wd-detail-comment" placeholder="Add a comment" onChange={(e) => setCurrentComment(e.target.value)} value={currentComment} aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                <button className="btn btn-outline-secondary wd-detail-button-action"
                                        type="button"
                                        id="button-addon2"
                                        onClick={async () => {
                                            await addCommentAction(dispatch, user._id, user.username, body.post_id, body.name, body.image_url, type, currentComment, body);
                                            setCurrentComment("");
                                        }}>Comment</button>
                            </div>
                        </>
                    }
                </div>
    )
}

export default CommentsTabList;