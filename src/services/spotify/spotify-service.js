import axios from "axios";

const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
const tokenEndpoint = 'https://accounts.spotify.com/api/token'
const searchEndpoint = 'https://api.spotify.com/v1/search'
const artistEndpoint = 'https://api.spotify.com/v1/artists'

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

export const search = async (searchString) => {
    const fullUrl = searchEndpoint + "?type=artist,album,playlist,track,show,episode&market=US&limit=20&q=" + searchString;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + bearerToken,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    const response = await axios.get(fullUrl, config);
    console.log(response.data)
    return response.data;
}

export const getNewMusic = async () => {
    const fullUrl = searchEndpoint + "?type=artist,album,playlist,track,show,episode&market=US&limit=20&q=tag:new";

    let config = {
        headers: {
            'Authorization': 'Bearer ' + bearerToken,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    const response = await axios.get(fullUrl, config);
    return response.data;
}

export const getArtist = async (artistId, artistName) => {
    const artistTag = 'artist/'
    const start = artistId.indexOf(artistTag) + artistTag.length;
    let end = artistId.slice(start).indexOf("/")

    if (end < 0) {
        end = artistId.length;
    }

    const id = artistId.slice(start, start + end);

    const fullUrl = artistEndpoint + "/" + id;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + bearerToken,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    let error = false;
    const response = await axios.get(fullUrl, config).catch(err => error = true);

    if (error) {
        return false;
    }

    console.log(response)

    const returnedName = response.data.name;

    return artistName === returnedName;

}