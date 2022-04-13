import React, {useState} from "react";
import './register-pop-up.css';
import {useDispatch} from "react-redux";
import {saveProfileDataAction} from "../../../actions/profile-actions";
import {getAlbum, getArtist, search} from "../../../services/spotify/spotify-service";
import {createPost} from "../../../services/backend/post-service";

const RegisterArtistPopUp = ({ _id, setIsArtist }) => {

    const [artistId, setArtistId] = useState('');
    const [artistName, setArtistName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const dispatch = useDispatch();

    const registerArtist = async () => {

        // pull id
        const artistTag = 'artist/'
        const start = artistId.indexOf(artistTag) + artistTag.length;
        let end = artistId.slice(start).indexOf("/")

        if (end < 0) {
            end = artistId.length;
        }

        const id = artistId.slice(start, start + end);

        const result = await getArtist(id);
        if (result.name === artistName) {
            await saveProfileDataAction(dispatch, {
                isArtist: true,
                artistId: id
            }, _id);

            const results = await search(artistName);
            const albums = results.albums.items;

            const userAlbums = []
            for (const a of albums) {
                const result = await getAlbum(a.id);
                console.log(result)
                userAlbums.push({
                    post_id: a.id,
                    image_url: (a.images && a.images.length > 0) ? a.images[0].url : "",
                    name: a.name,
                    artist_name: (a.artists && a.artists.length > 0) ? a.artists[0].name : "",
                    release_date: a.release_date,
                    total_tracks: a.total_tracks
                });
            }

            for (const a of userAlbums) {
                await createPost(a);
            }

            setIsArtist(true);
            setSuccessMessage("Success!")
        } else {
            setErrorMessage('Unable to register artist "' + artistName + '"');
        }

    }

    const renderMessage = () => {
        if (successMessage !== '') {
            return (
                <p className="wd-success-message pt-2">
                    {successMessage}
                </p>
            )
        } else if (errorMessage !== '') {
            return (
                <p className="wd-error-message pt-2">
                    {errorMessage}
                </p>
            )
        }
    }

    return(
      <div className="wd-fg-color-black ps-3 pe-3 pt-3 pb-3">
          <p>
              To register as an artist, please visit your Spotify artist page and copy and paste the URL into the
              first text box. Then verify the name of the Artist in the second text box. Click "Register"
              to confirm registration.
          </p>
          <div>
              <label htmlFor="url-box" className="wd-display-block">Artist URL:</label>
              <textarea rows={1} onChange={(event) => setArtistId(event.target.value)} className="wd-register-text-area" id="url-box" placeholder="Paste Spotify Artist URL here"/>
          </div>
          <div>
              <label htmlFor="artist-name" className="wd-display-block">Artist Name:</label>
              <textarea rows={1} onChange={(event) => setArtistName(event.target.value)} className="wd-register-text-area" id="artist-name" placeholder="Enter Artist name here"/>
          </div>
          <button className="wd-register-button mt-3" onClick={() => registerArtist()}>Register</button>
          {renderMessage()}
      </div>
    );
}
export default RegisterArtistPopUp;