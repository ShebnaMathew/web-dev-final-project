import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import "./signup.css";
import {createProfileAction} from "../../actions/profile-actions";
import {useDispatch} from "react-redux";

const SignUp = () => {

    console.log('rendering page')

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
        if (password === '') {
            setError(true);
            setErrorMessage('Password cannot be blank');
            return;
        }
        if (username === '') {
            setError(true);
            setErrorMessage('Username cannot be blank')
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

        console.log(response)
        if (response.status !== 200) {
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
                <h1 className="d-flex justify-content-center text-black">Sign up</h1>
            </div>
            {error &&
                <div className="wd-error">
                    Error: {errorMessage}
                </div>
            }
            <div className="justify-content-center mt-3 form-inline" role="form">
                <label className="fw-bold" htmlFor="email">Email Address</label>
                <div className="input-group mb-3">
                    <input type="email" onChange={(event) => setEmail(event.target.value)} value={email} className="form-control" placeholder="Enter your email" id="email" required={true}/>
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
                <label className="fw-bold" htmlFor="name">Name</label>
                <div className="input-group mb-3">
                    <div className="input-group">
                        <input type="text" onChange={(event) => setName(event.target.value)} value={name} className="form-control" placeholder="Enter your name" id="name" required={true}/>
                    </div>
                </div>
                <label className="fw-bold" htmlFor="dob">Date of Birth</label>
                <div className="input-group mb-3 d-flex justify-content-lg-between">
                    <div>
                        <input onChange={(event) => setDob(event.target.value)} value={dob} className="form-control" id="date" type="date" required={true}/>
                    </div>
                </div>
                <div>
                    <span className="d-flex justify-content-center">By clicking on sign-up, you agree to our Terms and Conditions of Use.</span>
                    <span className="d-flex justify-content-center">To learn more about how we collect, use, share and protect your personal data, </span>
                    <span className="d-flex justify-content-center">please see our <a className="ps-1" href="#"> Privacy Policy</a>.</span>
                </div>
                <button onClick={() => registerUser()} className="btn w-100 btn-success btn-lg mt-2">Sign up</button>
                <span className="d-flex justify-content-center mt-3">
                    Have an account?
                    <Link className="text-decoration-none text-black" to="/login">
                        <span className="ms-2 text-black">Log in.</span>
                </Link>
                </span>
            </div>
        </div>
    )
}

export default SignUp;