import React, {useState} from "react";
import "./login.css";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginAction} from "../../actions/profile-actions";

const Login = () => {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async () => {
        const response = await loginAction(dispatch, username, password)
        console.log(response)
        if (response !== 200) {
            setErrorMessage("Unable to login")
            setError(true);
        } else {
            navigate('/', {replace: true})
        }
    }

    return (
            <div className="col bg-dark text-black fontFamily p-5 pt-2 pb-3">
                <div>
                    <div className="d-flex justify-content-center">
                        <img width="150px" height="150px" src="/images/music_logo.png"/>
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
                    <Link classname="text-decoration-none text-black" to="#">
                        <span className="text-decoration-none text-black">Forgot password?</span>
                    </Link>

                    <div className="mt-2">
                        <span>
                            <input type="checkbox" checked="checked" name="remember"/>
                            Remember me
                        </span>
                    </div>
                    <button type="button" onClick={() => login()} className="btn w-100 btn-success btn-lg mt-2 ">Login</button>

                </div>
            </div>
    )
}

export default Login;