import axios from "axios";

const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const tokenEndpoint = 'https://accounts.spotify.com/api/token'
const searchEndpoint = 'https://api.spotify.com/v1/search'
const artistEndpoint = 'https://api.spotify.com/v1/artists'
const albumEndpoint = 'https://api.spotify.com/v1/albums'
const trackEndpoint = 'https://api.spotify.com/v1/tracks'
const showEndpoint = 'https://api.spotify.com/v1/shows'
const episodeEndpoint = 'https://api.spotify.com/v1/episodes'
const playlistEndpoint = 'https://api.spotify.com/v1/playlists'

let bearerToken = "";

export const authorize = async () => {
    let config = {
        headers: {
            'Authorization': 'Basic ' + (btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET)),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    const body = "grant_type=client_credentials"

    const response = await axios.post(tokenEndpoint, body, config);
    bearerToken = response.data.access_token;
    const ttl = response.data.expires_in;

    // use ttl to set when this token should be refreshed
    // call authorize recursively until the application is terminated
    setTimeout(authorize,(ttl - 5) * 1000);

}

const getResponse = async (url) => {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + bearerToken,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    const response = await axios.get(url, config);
    return response.data;
}

export const search = async (searchString) => {
    const fullUrl = searchEndpoint + "?type=artist,album,playlist,track,show,episode&market=US&limit=20&q=" + searchString;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + bearerToken,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    const response = await axios.get(fullUrl, config);
    return response.data;
}

export const getNewMusic = async () => {
    const fullUrl = searchEndpoint + "?type=artist,album,playlist,track,show,episode&market=US&limit=48&q=tag:new";

    let config = {
        headers: {
            'Authorization': 'Bearer ' + bearerToken,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    const response = await axios.get(fullUrl, config);
    return response.data;
}

export const getArtist = async (artistId) => {
    const fullUrl = artistEndpoint + "/" + artistId;
    return getResponse(fullUrl);
}

export const getAlbumTracks = (albumId) => {
    const fullUrl = `${albumEndpoint}/${albumId}/tracks`;
    return getResponse(fullUrl);
}

export const getTrack = (trackId) => {
    const fullUrl = `${trackEndpoint}/${trackId}`;
    return getResponse(fullUrl);
}

export const getAlbum = async (albumId) => {
    const fullUrl = `${albumEndpoint}/${albumId}`;
    return await getResponse(fullUrl);
}

export const getPlaylistTracks = (playlistId) => {
    const fullUrl = `${playlistEndpoint}/${playlistId}/tracks?market=US`;
    return getResponse(fullUrl);
}

export const getPlaylist = (playlistId) => {
    const fullUrl = `${playlistEndpoint}/${playlistId}`;
    return getResponse(fullUrl);
}

export const getShowEpisodes = (showId, offset) => {
    const fullUrl = `${showEndpoint}/${showId}/episodes?market=US&limit=50&offset=${offset}`;
    return getResponse(fullUrl);
}

export const getEpisode = (episodeId) => {
    const fullUrl = `${episodeEndpoint}/${episodeId}?market=US`;
    return getResponse(fullUrl);
}

export const getShow = (showId) => {
    const fullUrl = `${showEndpoint}/${showId}?market=US`;
    return getResponse(fullUrl);
}

