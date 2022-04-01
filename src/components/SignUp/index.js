import {Link} from "react-router-dom";
import React from "react";
import "./signup.css";

const SignUp = () => {
    return (
        <div className="col bg-dark text-black fontFamily p-5 pt-2 pb-3">
            <div>
                <div className="d-flex justify-content-center">
                    <img width="150px" height="150px" src="/images/music_logo.png"/>
                </div>
                <h1 className="d-flex justify-content-center text-black">Sign up</h1>
            </div>
            <form className="justify-content-center mt-3 form-inline" role="form">
                <label className="fw-bold" htmlFor="email">Email Address</label>
                <div className="input-group mb-3">
                    <input type="email" className="form-control" placeholder="Enter your email" id="email" required="true"/>
                </div>

                <label className="fw-bold" htmlFor="emailConfirm">Confirm Email Address</label>
                <div className="input-group mb-3">
                    <input type="email" className="form-control" placeholder="Enter your email again" id="emailConfirm" required="true"/>
                </div>

                <label className="fw-bold" htmlFor="pw">Create Password</label>
                <div className="input-group mb-3">
                    <div className="input-group">
                        <input type="password" className="form-control" placeholder="Create a password" id="pw" required="true"/>
                    </div>
                </div>
                <label className="fw-bold" htmlFor="profileName">Name</label>
                <div className="input-group mb-3">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Enter a profile name" id="profileName"/>
                    </div>
                </div>
                <label className="fw-bold" htmlFor="dob">Date of Birth</label>
                <div className="input-group mb-3 d-flex justify-content-lg-between" data-provide="datepicker">
                    <div>
                        <label htmlFor="date">DateOfBirth</label>
                        <input className="form-control" id="date" type="date"/>
                    </div>
                </div>
                <div>
                    <span className="d-flex justify-content-center">By clicking on sign-up, you agree to our Terms and Conditions of Use.</span>
                    <span className="d-flex justify-content-center">To learn more about how we collect, use, share and protect your personal data,</span>
                    <span className="d-flex justify-content-center">please see our <a href="#"> Privacy Policy</a>.</span>
                </div>
                <button type="submit" className="btn w-100 btn-success btn-lg mt-2 ">Sign up</button>
                <span className="d-flex justify-content-center mt-3">
                    Have an account?
                    <Link classname="text-decoration-none text-black" to="/login">
                        <span className="ms-2 text-black">Log in.</span>
                </Link>
                </span>

            </form>
        </div>
    )
}

export default SignUp;