import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TrackList = (props) => {

    const navigate = useNavigate();
    
    const album_tracks = useSelector((state) => state.searchResults.current_album_tracks);
    const results = useSelector((state) => state.searchResults.current_tracks);
    console.log("track results: ", album_tracks)
    return(
        <div className="row justify-content-md-center">
            <div class="list-group list-group-flush my-3 wd-detail-parent wd-detail-comment-overflow pe-0"> 
                {album_tracks.map((t) => <a onClick={() => 
                        navigate(`/track/${t.id}`,{state: {post: results[t.id], back: props.back}})
                } class="list-group-item list-group-item-action wd-detail-bg-black wd-list-no-border">{t.name}</a>)}
            </div>
        </div>
    )
}

export default TrackList;