import React, {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutAction, updateProfilePictureAction} from "../../actions/profile-actions";
import './header.css'

const Header = () => {

    const [searchString, setSearchString] = useState('');
    const [blur, setBlur] = useState('');
    const [profilePictureReady, setProfilePictureReady] = useState(false);

    const user = useSelector((state) => state.user)

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/privacyPolicy') ? 
        setBlur('wd-blur'): 
        setBlur('')
    , [location.pathname])

    const handleKeypress = async e => {
        if (e.charCode === 13) {
            navigate('/search/' + searchString);
            setSearchString('');
        }
    };

    const logout = async () => {
        await logoutAction(dispatch);
        setProfilePictureReady(false);
        navigate('/');
    }

    useEffect(async () => {
        if (user && user._id) {
            await updateProfilePictureAction(dispatch, user._id)
            setProfilePictureReady(true);
        }
    }, [user._id])

    return(
        <nav className={`navbar navbar-dark bg-dark fixed-top ${blur} wd-header wd-min-body-width`}>
            <div className="container-fluid">
                <div className={`navbar-brand wd-cursor-pointer wd-bold wd-font-family wd-font-size d-none d-lg-block ${(blur) ? 'wd-pointer-events-none': ''}`} onClick={() => navigate('/')}>
                <img src="/images/headphones2.png" alt="" width="30" height="30" className="d-inline-block align-text-top"/>
                    ommentify</div>

                <div href='#' className={`navbar-brand wd-cursor-pointer wd-bold wd-font-family wd-font-size d-lg-none ${(blur) ? 'wd-pointer-events-none': ''}`} onClick={() => navigate('/')}>
                <img src="/images/headphones2.png" alt="" width="30" height="30" className="d-inline-block align-text-top"/>
                </div>
                <div className="d-flex wd-header-center">
                    <input onChange={(event) => setSearchString(event.target.value)}
                           onKeyPress={(e) => handleKeypress(e)}
                           className="form-control wd-search-disabled-override wd-header-bg-dark wd-header-search-border wd-header-color wd-header-fontAwesome"
                           type="search"
                           placeholder="&#xf002; Search Music"
                           aria-label="Search"
                           value={searchString}
                           disabled={blur ? 'disabled': ''}
                    />
                </div>
                <div className="d-flex ms-auto wd-header-media">
                    <div className="me-2 text-white my-1 fa-stack wd-header-cursor-pointer" title="Privacy Policy" disabled={blur ? 'disabled': ''} onClick={() => navigate('/privacyPolicy')}>
                        <i className="fa-regular fa-circle fa-stack-2x wd-header-fg-grey"/>
                        <i className="fa fa-shield fa-stack-1x wd-header-fg-light-grey" aria-hidden="true"/>
                    </div>
                    {(!user || !user._id) &&
                        <>
                            <button className="btn btn-success me-2" disabled={blur ? 'disabled': ''} type="submit" onClick={() => navigate('/login')}>Login</button>
                            <button className="btn btn-secondary" disabled={blur ? 'disabled': ''} type="submit" onClick={() => navigate('/signup')}>Sign Up</button>
                        </>
                    }
                    {(user && user._id && profilePictureReady) &&
                        <>
                            <img className="wd-thumbnail-image-size wd-circle-image wd-green-border wd-cursor-pointer me-2"
                                 src={user.profilePicture ? user.profilePicture : "/images/blank-profile-picture.png"}
                                 alt=""
                                 title={user.username}
                            onClick={() => {
                                navigate('/profile')
                            }}/>
                            <button className="btn btn-secondary" type="submit" onClick={() => logout()}>Log Out</button>
                        </>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Header;