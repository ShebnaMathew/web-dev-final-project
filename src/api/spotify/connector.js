import axios from "axios";

const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
const tokenEndpoint = 'https://accounts.spotify.com/api/token'
const searchEndpoint = 'https://api.spotify.com/v1/search'

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
    console.log("SETTING BEARER TOKEN")

    setTimeout(authorize,(ttl - 5) * 1000);

}

export const search = async (searchString) => {
    const fullUrl = searchEndpoint + "?type=artist,album,playlist,track,show,episode&market=US&limit=50&q=" + searchString;

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