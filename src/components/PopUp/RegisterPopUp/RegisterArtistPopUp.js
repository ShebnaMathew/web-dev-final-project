import React from "react";
import './register-pop-up.css';
import {useDispatch} from "react-redux";

const RegisterArtistPopUp = (
    contentParams = {
        setShowRegisterArtist: () => console.log("WARNING setShowRegisterArtist is undefined")
    }
) => {

    const dispatch = useDispatch();

    const registerArtist =() => {
        dispatch({
            type: "register-artist"
        })
        contentParams.setShowRegisterArtist(false);
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
              <textarea rows={1} className="wd-register-text-area" id="url-box" placeholder="Paste Spotify Artist URL here"/>
          </div>
          <div>
              <label htmlFor="artist-name" className="wd-display-block">Artist Name:</label>
              <textarea rows={1} className="wd-register-text-area" id="artist-name" placeholder="Enter Artist name here"/>
          </div>
          <button className="wd-register-button mt-3" onClick={() => registerArtist()}>Register</button>
      </div>
    );
}
export default RegisterArtistPopUp;