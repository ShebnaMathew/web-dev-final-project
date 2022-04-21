import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {createPost, getPost} from "../../../services/backend/post-service";
import {likeContent, unlikeContent, getLikes} from "../../../services/backend/like-service";
import React, {useEffect, useState} from "react";
import {getArtistAction} from "../../../actions/search-actions";
import PostList from "../../NewsFeed/PostList";
import {getArtist, search} from "../../../services/spotify/spotify-service";
import {prepareData} from "../../../util/PrepareDataUtil";


const Artist = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const params = useParams();
    const id = params.postId;

    const artist = useSelector((state) => state.searchResults.current_artist);

    const [pageReady, setPageReady] = useState(false);
    const [music, setMusic] = useState([])
    useEffect(async () => {
        if (!pageReady) {
            await getArtistAction(dispatch, id);
            setPageReady(true);
        }
    }, [])

    // _MONGO: get likes and comments for this album

    // check if we have a profile for this artist -> placeholder : 'artistPresent'
    let artistPresent = true; // for testing

    const renderAlbums = () => {
        if (music.length > 0) {
            return(
                <div>
                    <h4 className="pt-4 ps-5">Albums from {artist.name}</h4>
                    <PostList posts={music}/>
                </div>
            )
        } else {
            getArtist(id).then(async (artist) => {
                const results = await search(artist.name);
                let albums = results.albums.items;
                if (albums.length > 3) {
                    albums = albums.slice(0, 3);
                }
                const adjustedAlbums = [];
                for (const a of albums) {
                    const preparedData = prepareData(a, "album");
                    adjustedAlbums.push({
                        ...preparedData,
                        dynamic: true
                    })
                }
                setMusic(adjustedAlbums)
            })
            return <i className="fa wd-spinner-pos fa-3x fa-spinner fa-spin"/>
        }
    }

    return(
        <>
        {!pageReady &&
            <i className="fa wd-spinner-pos fa-3x fa-spinner fa-spin"/>
        }

        {pageReady &&
            <div class="container wd-details-container wd-detail-max-width">
                <div class="row justify-content-center m-0 wd-details-container-children">
                    <div className="col col-lg-1 justify-content-center mt-3">
                        <button
                            className="row justify-content-center mt-5 btn btn-dark wd-round-btn wd-details-width-height px-0"
                            onClick={() => navigate(location.state.back)}>
                            <i class="fas fa-angle-left"/>
                        </button>
                    </div>
                    <div class="col col-lg-6 wd-background-banner-artist wd-details-container-children">
                        <div class="row justify-content-md-center my-5">
                            <img src={artist.image_url} class="m-3 wd-detail-box-shadow wd-detail-img-height-artist"
                                 alt="..."/>
                        </div>
                    </div>
                    <div className="col col-lg-4 wd-detail-right-max wd-zero-margin wd-details-container-children">
                        <div
                            class="row justify-content-md-center wd-background-banner-artist-reverse wd-parent-height pt-2">
                            <div className="row justify-content-center mt-5">Artist</div>
                            <p className="row justify-content-center text-center mt-1"><a
                                href={artist.spotify_url} target="_blank"
                                className="row justify-content-center mt-3 wd-detail-text-deco-none wd-detail-bold-font">{artist.name}</a>
                            </p>
                            {(artist.genres.length > 0) &&
                            <div className="text-center justify-content-center mt-1">
                                <b className="text-center">Genres</b><br/>{artist.genres}
                            </div>}
                            <div className="text-center justify-content-center mt-1">
                                <b className="text-center">Followers</b><br/>{artist.followers_total}
                            </div>
                            <div className="text-center justify-content-center mt-1">
                                <b className="text-center">Popularity Score</b><br/>{artist.popularity}
                            </div>

                        </div>
                    </div>
                </div>
                {renderAlbums()}
            </div>
        }
        </>
    )
}

export default Artist;