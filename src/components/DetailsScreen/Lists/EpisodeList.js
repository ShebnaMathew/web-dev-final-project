import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";

const EpisodeList = () => {

    const navigate = useNavigate();
    const show_episodes = useSelector((state) => state.searchResults.current_show_episodes);

    return(
        <div className="row justify-content-md-center wd-details-container-children-overflow">
            <div className="list-group list-group-flush my-3 pe-0 wd-detail-height-95 wd-detail-comment-overflow">
                {show_episodes.map((e) => <div key={e.id} onClick={() => {
                    navigate(`/episode/${e.id}`)
                }} className="list-group-item list-group-item-action wd-detail-bg-black wd-list-no-border">{e.name}</div>)}
            </div>
        </div>
    )
}

export default EpisodeList;