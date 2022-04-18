import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSingleEpisode } from "../../../actions/search-actions";

const EpisodeList = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const show_episodes = useSelector((state) => state.searchResults.current_show_episodes);
    const results = useSelector((state) => state.searchResults.current_episodes);

    console.log("results for episode list: ", results)

    return(
        <div className="row justify-content-md-center wd-details-container-children-overflow">
            <div class="list-group list-group-flush my-3 pe-0"> 
                {show_episodes.map((e) => <a onClick={() => {
                    navigate(`/episode/${e.id}`,{state: {post: results[e.id], back: props.back}})
                }} class="list-group-item list-group-item-action wd-detail-bg-black wd-list-no-border">{e.name}</a>)}
            </div>
        </div>
    )
}

export default EpisodeList;