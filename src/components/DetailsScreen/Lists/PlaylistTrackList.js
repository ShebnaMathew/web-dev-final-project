import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAlbumAction } from "../../../actions/search-actions";

const PlaylistTrackList = ({playlistId, playlistName}) => {
    console.log(playlistId)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playlist_tracks = useSelector((state) => state.searchResults.current_playlist_tracks);

    return(
        <div className="row justify-content-md-center">
            <div className="list-group list-group-flush my-3 wd-detail-parent wd-detail-comment-overflow pe-0"> 
                {playlist_tracks.map((t) => <a onClick={() => {
                        // TODO: does this actually do anything
                        getAlbumAction(dispatch, t.track.album.id);
                        navigate(`/track/${t.track.id}`,{state: {playlistId, playlistName}})
                }} className="list-group-item list-group-item-action wd-detail-bg-black wd-list-no-border">{t.track.name}</a>)}
            </div>
        </div>
    )
}

export default PlaylistTrackList;