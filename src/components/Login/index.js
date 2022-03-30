import React from "react";
import "./login.css";
import {Link} from "react-router-dom";

const Login = () => {
    return (
            <div className="col bg-dark text-black fontFamily p-5 pt-2 pb-3">
                <div>
                    <div className="d-flex justify-content-center">
                        <img width="150px" height="150px" src="/images/music_logo.png"/>
                    </div>
                    <h1 className="d-flex justify-content-center text-black">Login</h1>
                </div>
                <form className="mt-3">
                    <label className="fw-bold" htmlFor="uname">Email Address or Username</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Enter Username" id="Username"/>
                    </div>

                    <label className="fw-bold" htmlFor="pw">Password</label>
                    <div className="input-group mb-3">
                        <div className="input-group">
                            <input type="password" className="form-control" placeholder="Enter Password" id="pw"/>
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
                    <button type="button" className="btn w-100 btn-success btn-lg mt-2 ">Login</button>

                </form>
            </div>
    )
}

export default Login;