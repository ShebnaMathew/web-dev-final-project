import {getNewMusic, search, getAlbumTracks, getTrack, getAlbum, getShowEpisodes, getEpisode, 
    getShow, getPlaylist, getPlaylistTracks, getArtist} from "../services/spotify/spotify-service";

import {getPost} from "../services/backend/post-service.js";
import {createPost} from "../services/backend/post-service";
import {prepareData} from "../util/PrepareDataUtil";

export const UPDATE_NEWS = "update-news";
export const UPDATE_SEARCH = "update-search";
export const GET_ALBUM_TRACKS = "get-album-tracks";
export const GET_TRACK = "get-track";
export const GET_ALBUM = "get-album";
export const SET_ALBUM = "set-album";
export const GET_PLAYLIST_TRACKS = "get-playlist-tracks";
export const GET_PLAYLIST = "get-playlist";
export const GET_SHOW_EPISODES = "get-show-episodes";
export const GET_EPISODE = "get-episode";
export const GET_SHOW = "get-show";
export const SET_SHOW = "set-show";
export const SET_PLAYLIST = "set-playlist";
export const GET_POSTS_TO_RENDER = "get-posts-to-render";
export const GET_ALL_POSTS = "get-all-posts";
export const GET_ARTIST = "get-artist";
export const GET_SINGLE_EPISODE = "get-single-episode";
export const GET_SINGLE_TRACK = "get-single-track";

export const searchAction = async (dispatch, searchString) => {
    const results = await search(searchString)
    dispatch({
        type: UPDATE_SEARCH,
        results: results
    })
}

export const getArtistAction = async (dispatch, artistId) => {

    let results = await getPost({type: "artist", _id: artistId});

    if (results.status && results.status === "fail") {
        results = await getArtist(artistId);
        results = prepareData(results, "artist")
        createPost(results)

        results.comments = [];
        results.likes = [];
    }

    dispatch({
        type: GET_ARTIST,
        results: results
    })
}

export const getTracks = async (dispatch, albumId) => {
    const results = await getAlbumTracks(albumId);
    dispatch({
        type: GET_ALBUM_TRACKS,
        results: results
    })
}

export const getSingleTrackAction = async (dispatch, trackId) => {

    let results = await getPost({type: "track", _id: trackId});

    if (results.status && results.status === "fail") {
        results = await getTrack(trackId);
        results = prepareData(results, "track")
        createPost(results)

        results.comments = [];
        results.likes = [];
    }

    dispatch({
        type: GET_SINGLE_TRACK,
        results: results
    })
}

export const getAlbumAction = async (dispatch, albumId) => {
    let results = await getPost({type: "album", _id: albumId});

    if (results.status && results.status === "fail") {
        results = await getAlbum(albumId);
        results = prepareData(results, "album")
        createPost(results)

        results.comments = [];
        results.likes = [];
    }

    dispatch({
        type: GET_ALBUM,
        results: results
    })
}

export const getTracksForPlaylist = async (dispatch, playlistId) => {
    const results = await getPlaylistTracks(playlistId);
    dispatch({
        type: GET_PLAYLIST_TRACKS,
        results: results
    })
}

export const getPlaylistAction = async (dispatch, playlistId) => {
    let results = await getPost({type: "playlist", _id: playlistId});

    if (results.status && results.status === "fail") {
        results = await getPlaylist(playlistId);
        results = prepareData(results, "playlist")
        createPost(results)

        results.comments = [];
        results.likes = [];
    }
    dispatch({
        type: GET_PLAYLIST,
        results: results
    })
}

export const getEpisodes = async (dispatch, showId, total) => {
    let results = []
    let i = 0;
    while ( i < total) {
        const temp = await getShowEpisodes(showId, i);
        results = [...results, ...temp.items];
        i = i + 50;
    }
    dispatch({
        type: GET_SHOW_EPISODES,
        results: results
    })
}

export const getSingleEpisode = async (dispatch, episodeId) => {
    let results = await getPost({type: "episode", _id: episodeId});

    if (results.status && results.status === "fail") {
        results = await getEpisode(episodeId);
        results = prepareData(results, "episode")
        createPost(results)

        results.comments = [];
        results.likes = [];
    }
    dispatch({
        type: GET_SINGLE_EPISODE,
        results
    })
}

export const getShowAction = async (dispatch, showId) => {
    let results = await getPost({type: "show", _id: showId});

    if (results.status && results.status === "fail") {
        results = await getShow(showId);
        results = prepareData(results, "show")
        createPost(results)

        results.comments = [];
        results.likes = [];
    }

    dispatch({
        type: GET_SHOW,
        results: results
    })
}
