import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";

const TrackList = (props) => {

    const navigate = useNavigate();
    const album_tracks = useSelector((state) => state.searchResults.current_album_tracks);
    
    return(
        <div className="row wd-track-height wd-track-list-conditional-padding justify-content-md-center ms-0">
            <div className="list-group wd-playlist-inner-track-height wd-track-episode-detail-height list-group-flush my-3 wd-comment-height wd-detail-comment-overflow pe-0">
                {album_tracks.map((t) => <div key={t.id} onClick={() =>
                        navigate(`/track/${t.id}`)
                } className="list-group-item list-group-item-action wd-detail-bg-black wd-list-no-border">{t.name}</div>)}
            </div>
        </div>
    )
}

export default TrackList;