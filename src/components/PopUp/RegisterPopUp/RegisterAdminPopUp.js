import React, {useState} from "react";
import './register-pop-up.css';
import {useDispatch} from "react-redux";
import {saveProfileData} from "../../../actions/profile-actions";
import {registerAdmin} from "../../../services/backend/backend-service";

const RegisterAdminPopUp = (
    contentParams = {
        setShowRegisterAdmin: () => console.log("WARNING setShowRegisterAdmin is undefined")
    }
) => {

    const [key, setKey] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const dispatch = useDispatch();

    const register = async () => {
        const result = await registerAdmin(key)
        if (result) {
            await saveProfileData(dispatch, { isAdmin: true })
            setSuccessMessage('Success!');
        } else {
            setErrorMessage('Unable to register as admin')
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
                To register as an admin, please contact the site administrators for an Admin Access Key
                and paste the key into the field below:
            </p>
            <div>
                <label htmlFor="url-box" className="wd-display-block">Admin Access Key:</label>
                <textarea rows={1} onChange={(event) => setKey(event.target.value)} className="wd-register-text-area" id="url-box" placeholder="Paste Admin Access Key here"/>
            </div>
            <button className="wd-register-button mt-3" onClick={() => register()}>Register</button>
            {renderMessage()}
        </div>
    );
}
export default RegisterAdminPopUp;