import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
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

    // check if we have a profile for this artist -> placeholder : 'artistPresent'
    let artistPresent = true; // for testing

    const renderAlbums = () => {
        if (music.length > 0) {
            return(
                <>
                    <div className="row d-none d-lg-block justify-content-center m-0 wd-details-container-children">
                        <h4 className="justify-content-center text-center pt-4 ps-5">Albums from {artist.name}</h4>
                        <PostList className="justify-content-center text-center pt-4 ps-5" posts={music}/>
                    </div>
                    <div className="row d-lg-none justify-content-center m-0 wd-details-container-children">
                        <h4 className="justify-content-center text-center pt-4 ps-5">Albums from {artist.name}</h4>
                        <PostList className="justify-content-center text-center pt-4 ps-5" posts={music}/>
                    </div>
                </>
            )
        } else {
            getArtist(id).then(async (artist) => {
                const results = await search(artist.name);
                let albums = results.albums.items;
                if (albums.length > 5) {
                    albums = albums.slice(0, 5);
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
            <div className="container wd-details-container wd-detail-max-width">
                <div className="row justify-content-center m-0 wd-details-container-children mb-0 pb-0">
                    <div className="col-lg-7 wd-background-banner-artist wd-details-container-children">
                        <div className="row mt-5 justify-content-center text-center pb-3">
                            <div className="col-md-10 mt-3 justify-content-center text-center">
                                <img src={artist.image_url} className="col-md-10 m-3 wd-detail-box-shadow wd-detail-img-height"
                                        alt="..."/>
                                <div className="d-lg-none justify-content-center m-0 wd-details-container-children pt-0 mt-0">
                                    <div className="justify-content-md-center wd-parent-height pt-2">
                                        <div className="justify-content-center text-center mt-3">Artist</div>
                                        <p className="justify-content-center text-center mt-1">
                                            <a href={artist.spotify_url} target="_blank"
                                                className="row text-center justify-content-center mt-3 wd-detail-text-deco-none wd-detail-bold-font">
                                                {artist.name}
                                            </a>
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
                        </div>
                    </div>
                    <div className="col-lg-5 d-none d-lg-block wd-detail-right-max wd-detail-parent wd-zero-margin wd-details-container-children wd-details-container-children-overflow">
                        <div className="row justify-content-md-center wd-background-banner-artist-reverse wd-parent-height pt-2">
                            <div className="justify-content-center text-center mt-3">Artist</div>
                            <p className="justify-content-center text-center mt-1">
                                <a href={artist.spotify_url} target="_blank"
                                    className="row text-center justify-content-center mt-3 wd-detail-text-deco-none wd-detail-bold-font">
                                    {artist.name}
                                </a>
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