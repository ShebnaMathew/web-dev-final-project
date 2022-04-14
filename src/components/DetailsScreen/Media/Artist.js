import {createPost, getPost} from "../../../services/backend/post-service";
import {likeContent, unlikeContent, getLikes} from "../../../services/backend/like-service";


// PROBABLY DONT NEED THIS ONE

import { useNavigate, useParams } from "react-router-dom";

const Artist = (props) => {
    const params = useParams();

    // _API: if params, get artist, else render from props

    const post = props.post;
    const navigate = useNavigate();

    return(
        <div class="row">
            <img src="..." class="img-fluid" alt="..."/>
            <h1>artist: {params._id}</h1>
        </div>
    )
}

export default Artist;