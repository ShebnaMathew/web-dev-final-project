import React from "react";
import './register-pop-up.css';
import {useDispatch} from "react-redux";

const RegisterAdminPopUp = (
    contentParams = {
        setShowRegisterAdmin: () => console.log("WARNING setShowRegisterAdmin is undefined")
    }
) => {

    const dispatch = useDispatch();

    const registerAdmin =() => {
        dispatch({
            type: "register-admin"
        })
        contentParams.setShowRegisterAdmin(false);
    }

    return(
        <div className="wd-fg-color-black ps-3 pe-3 pt-3 pb-3">
            <p>
                To register as an admin, please contact the site administrators for an Admin Access Key
                and paste the key into the field below:
            </p>
            <div>
                <label htmlFor="url-box" className="wd-display-block">Admin Access Key:</label>
                <textarea rows={1} className="wd-register-text-area" id="url-box" placeholder="Paste Admin Access Key here"/>
            </div>
            <button className="wd-register-button mt-3" onClick={() => registerAdmin()}>Register</button>
        </div>
    );
}
export default RegisterAdminPopUp;