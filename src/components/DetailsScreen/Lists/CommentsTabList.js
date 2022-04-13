import {addComment, deleteComment} from "../../../services/backend/comment-service";
import {likeContent, unlikeContent} from "../../../services/backend/like-service";

const CommentsTabList = () => {

    // dummy list - get actual comments from db and render with map

    return(
        <div class="row justify-content-md-center"> 
                    <div class="list-group list-group-flush my-3 pe-0"> 
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 1</span>
                            <span>Rando 1's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 2</span>
                            <span>Rando 2's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 1</span>
                            <span>Rando 1's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 2</span>
                            <span>Rando 2's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 1</span>
                            <span>Rando 1's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 2</span>
                            <span>Rando 2's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 3</span>
                            <span>Rando 3's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 1</span>
                            <span>Rando 1's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 2</span>
                            <span>Rando 2's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 3</span>
                            <span>Rando 3's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 1</span>
                            <span>Rando 1's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 2</span>
                            <span>Rando 2's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 3</span>
                            <span>Rando 3's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 1</span>
                            <span>Rando 1's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 2</span>
                            <span>Rando 2's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 3</span>
                            <span>Rando 3's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 1</span>
                            <span>Rando 1's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 2</span>
                            <span>Rando 2's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 3</span>
                            <span>Rando 3's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 1</span>
                            <span>Rando 1's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 2</span>
                            <span>Rando 2's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 3</span>
                            <span>Rando 3's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 1</span>
                            <span>Rando 1's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 2</span>
                            <span>Rando 2's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 3</span>
                            <span>Rando 3's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 1</span>
                            <span>Rando 1's comment</span>
                        </p>
                        <p className="list-group-item my-0 wd-detail-bg-black wd-list-no-border">
                            <span className="wd-newsfeed-bold-text me-2">Rando 2</span>
                            <span>Rando 2's comment</span>
                        </p>
                    </div>
                    <hr/>
                    <div class="input-group mb-5">
                        <input type="text" class="form-control wd-detail-comment-btn wd-detail-comment" placeholder="Add a comment" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                        <button class="btn btn-outline-secondary wd-detail-button-action" type="button" id="button-addon2">Comment</button>
                    </div>
                </div>
    )
}

export default CommentsTabList;