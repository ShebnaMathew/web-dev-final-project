import React, {useState} from "react";
import "./login.css";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginAction, updateProfilePictureAction} from "../../actions/profile-actions";

const Login = () => {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const login = async () => {
        const response = await loginAction(dispatch, username, password)
        if (response !== 200) {
            setErrorMessage("Incorrect email/password")
            setError(true);
        } else {
            navigate('/', {replace: true})
        }
    }

    return (
        <div className="row justify-content-center mt-4 mx-5">
            <div className="wd-login-width bg-dark text-black fontFamily p-5 pt-2 pb-3 wd-round-corners wd-z-index">
                <div>
                    <div className="d-flex justify-content-center">
                        <img width="150px" height="150px" src="/images/headphones-logo.png" alt=""/>
                    </div>
                    <h1 className="d-flex justify-content-center text-black">Login</h1>
                </div>
                {error &&
                    <div className="wd-error">
                        Error: {errorMessage}
                    </div>
                }
                <div className="mt-3">
                    <label className="fw-bold" htmlFor="Email">Email Address</label>
                    <div className="input-group mb-3">
                        <input type="text" onChange={(event) => setUsername(event.target.value)} className="form-control" placeholder="Enter Email Address" id="Email"/>
                    </div>

                    <label className="fw-bold" htmlFor="pw">Password</label>
                    <div className="input-group mb-3">
                        <div className="input-group">
                            <input type="password" onChange={(event) => setPassword(event.target.value)} className="form-control" placeholder="Enter Password" id="pw"/>
                        </div>
                    </div>
                    <button type="button" onClick={() => login()} className="btn w-100 btn-success btn-lg mt-2 ">Login</button>
                    <span className="d-flex justify-content-center mt-3">
                        Don't have an account?
                        <Link className="text-black" to="/signup">
                            <span className="ms-2 text-black">Sign up</span>
                        </Link>
                    </span>
                    <span className="d-flex justify-content-center mt-3">
                        <Link className="text-black" to="/">
                            <span className="ms-2 text-black">Continue without signing in</span>
                        </Link>
                    </span>
                </div>
            </div>
            </div>
    )
}

export default Login;