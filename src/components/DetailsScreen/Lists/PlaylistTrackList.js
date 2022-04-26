import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";

const PlaylistTrackList = ({playlistId, playlistName}) => {

    const navigate = useNavigate();
    const playlist_tracks = useSelector((state) => state.searchResults.current_playlist_tracks);

    return(
        <div className="row justify-content-md-center">
            <div className="list-group list-group-flush my-3 wd-detail-parent wd-detail-comment-overflow pe-0"> 
                {playlist_tracks.map((t) => <div key={t.track.id} onClick={() => {
                        navigate(`/track/${t.track.id}`,{state: {playlistId, playlistName}})
                }} className="list-group-item list-group-item-action wd-detail-bg-black wd-list-no-border">{t.track.name}</div>)}
            </div>
        </div>
    )
}

export default PlaylistTrackList;