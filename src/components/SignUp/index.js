import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import "./signup.css";
import {createProfileAction} from "../../actions/profile-actions";
import {useDispatch} from "react-redux";

const uppercaseBank = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseBank = "abcdefghijklmnopqrstuvwxyz";
const numberBank = "1234567890";
const punctuationBank = "!?.,:;'\"@#$%^&*()[]{}\\|";

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [emailVerify, setEmailVerify] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState('')

    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();

    const registerUser = async () => {
        if (email === '') {
            setError(true);
            setErrorMessage('Email cannot be blank');
            return;
        }

        // check password
        let uppercase = false;
        let lowercase = false;
        let specialchar = false;
        let number = false;
        let length = password.length >= 8;

        for (let i = 0; i < password.length; ++i) {
            const currChar = password.charAt(i);
            if (uppercaseBank.includes(currChar)) {
                uppercase = true;
            } else if (lowercaseBank.includes(currChar)) {
                lowercase = true;
            } else if (numberBank.includes(currChar)) {
                number = true;
            } else if (punctuationBank.includes(currChar)) {
                specialchar = true;
            }
        }

        if (!(uppercase && lowercase && specialchar && number && length)) {
            setError(true);
            setErrorMessage(
                'Password must meet the following criteria:\n\n' +
                '- At least 8 characters in length\n' +
                '- At least one lowercase letter\n' +
                '- At least one uppercase letter\n' +
                '- At least one special symbol\n' +
                '- At least one number'
            );
            return;
        }
        if (username === '') {
            setError(true);
            setErrorMessage('Username cannot be blank')
            return;
        }
        if (username.length > 16) {
            setError(true)
            setErrorMessage('Username cannot be more than 16 characters')
            return;
        }
        if (name === '') {
            setError(true);
            setErrorMessage('Name cannot be blank');
            return;
        }
        if (dob === '') {
            setError(true);
            setErrorMessage('Date of Birth must be selected');
            return;
        }
        if (email !== emailVerify) {
            setError(true);
            setErrorMessage('Emails do not match; please check and try again')
            return;
        }
        const response = await createProfileAction(dispatch, {
                                    email: email,
                                    dob: dob,
                                    name: name,
                                    username: username,
                                    password: password
                                })

        if (response.data && response.data.status === "fail") {
            setErrorMessage(response.data.message)
            setError(true);
        } else {
            navigate('/', {replace: true})
        }
    }

    return (
        <div className="row justify-content-center mt-4 mx-5">
        <div className="wd-signup-width bg-dark text-black fontFamily p-5 pt-2 pb-3 wd-round-corners wd-background wd-z-index">
            <div>
                <div className="d-flex justify-content-center">
                    <img width="150px" height="150px" src="/images/headphones-logo.png" alt=""/>
                </div>
                <h1 className="d-flex justify-content-center text-black">Sign up</h1>
            </div>
            {error &&
                <div className="wd-error">
                    {
                        errorMessage.includes('\n') ? errorMessage.split('\n').map(l => {
                            return (<div>{l}</div>)
                        }) : errorMessage
                    }
                </div>
            }
            <div className="justify-content-center mt-3 form-inline" role="form">
                <label className="fw-bold" htmlFor="signin-email">Email Address</label>
                <div className="input-group mb-3">
                    <input type="email" onChange={(event) => setEmail(event.target.value)} value={email} className="form-control" placeholder="Enter your email" id="signin-email" required={true}/>
                </div>

                <label className="fw-bold" htmlFor="emailConfirm">Confirm Email Address</label>
                <div className="input-group mb-3">
                    <input type="email" onChange={(event) => setEmailVerify(event.target.value)} value={emailVerify} className="form-control" placeholder="Enter your email again" id="emailConfirm" required={true}/>
                </div>

                <label className="fw-bold" htmlFor="pw">Create Password</label>
                <div className="input-group mb-3">
                    <div className="input-group">
                        <input type="password" onChange={(event) => setPassword(event.target.value)} value={password} className="form-control" placeholder="Create a password" id="pw" required={true}/>
                    </div>
                </div>
                <label className="fw-bold" htmlFor="profileName">Username</label>
                <div className="input-group mb-3">
                    <div className="input-group">
                        <input type="text" onChange={(event) => setUsername(event.target.value)} value={username} className="form-control" placeholder="Enter a username" id="profileName" required={true}/>
                    </div>
                </div>
                <label className="fw-bold" htmlFor="signin-name">Name</label>
                <div className="input-group mb-3">
                    <div className="input-group">
                        <input type="text" onChange={(event) => setName(event.target.value)} value={name} className="form-control" placeholder="Enter your name" id="signin-name" required={true}/>
                    </div>
                </div>
                <label className="fw-bold" htmlFor="dob">Date of Birth</label>
                <div className="input-group mb-3 d-flex justify-content-lg-between">
                    <div>
                        <input onChange={(event) => setDob(event.target.value)} value={dob} className="form-control" id="date" type="date" required={true}/>
                    </div>
                </div>
                <div>
                    <span className="justify-content-center">By clicking on sign-up, you agree to our Terms and Conditions of Use.
                        To learn more about how we collect, use, share and protect your personal data,
                        please see our <a className="ps-1" href="/privacyPolicy"> Privacy Policy</a>.
                    </span>
                </div>
                <button onClick={() => registerUser()} className="btn w-100 btn-success btn-lg mt-2">Sign up</button>
                <span className="d-flex justify-content-center mt-3">
                    Have an account?
                    <Link className="text-black" to="/login">
                        <span className="ms-2 text-black">Log in.</span>
                </Link>
                </span>
                <span className="d-flex justify-content-center mt-3">
                        <Link className="text-black" to="/">
                            <span className="ms-2 text-black">Continue without signing up</span>
                        </Link>
                </span>
            </div>
        </div>
        </div>
    )
}

export default SignUp;