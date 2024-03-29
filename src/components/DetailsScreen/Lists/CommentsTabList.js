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
        <>
        <div className={`row justify-content-md-center wd-comment-width-outer wd-position-relative ${(!user || !user._id) ? "wd-comment-height-no-user" : "wd-comment-height"} container wd-768-override ps-0 pe-0 pt-0 pb-0 ms-0 me-0 wd-margin-top-1-rem`}>
            <div className={`list-group list-group-flush mb-0 pb-0 pe-0 ${(!user || !user._id) ? "wd-inner-comment-height" : "wd-inner-comment-height-full"} wd-detail-comment-overflow`}>
                {comments.map((c) =>
                <div className="row my-1 wd-full-width" key={c._id}>
                    <p className="wd-comment-width list-group-item my-0 wd-detail-bg-black wd-list-no-border ps-4 pe-3 pt-0 wd-comment-overflow-break-word" key={c._id}>
                        <span className="wd-cursor-pointer wd-newsfeed-bold-text me-2"
                              onClick={() => (user && user._id === c.commentor_id) ? navigate('/profile') : navigate(`/profile/${c.commentor_id}`)}>
                            {c.commentor_name}
                        </span>
                        <span className="wd-comment-width-inherit">{c.comment}</span>
                    </p>
                    {(user._id && (user._id === c.commentor_id || user.isAdmin)) &&
                        <i className="wd-comment-icon-width fa-solid fa-xmark wd-cursor-pointer my-0 ps-0 pt-1 pe-0" onClick={() => deleteCommentAction(dispatch, c._id, type, body)}/>
                    }
                </div>
                )}
            </div>

        </div>
        {(user && user._id) &&
        <>
            <div className="input-group mb-0 wd-comment-relative wd-comment-width-outer wd-comment-border pt-2 pb-2">
                <input type="text" className="form-control wd-detail-comment-btn wd-detail-comment ms-1 me-1" placeholder="Add a comment" onChange={(e) => setCurrentComment(e.target.value)} value={currentComment} aria-label="Recipient's username" aria-describedby="button-addon2"/>
                <button className="btn btn-outline-secondary wd-detail-button-action"
                        type="button"
                        id="button-addon2"
                        onClick={async () => {
                            if (currentComment.length === 0) {
                                return;
                            }
                            await addCommentAction(dispatch, user._id, user.username, body.post_id, body.name, body.image_url, type, currentComment, body);
                            setCurrentComment("");
                        }}>Comment</button>
            </div>
        </>
        }
        </>
    )
}

export default CommentsTabList;