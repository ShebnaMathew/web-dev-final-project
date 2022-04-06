import React, {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutAction} from "../../actions/profile-actions";

const Header = () => {

    const [searchString, setSearchString] = useState('');
    const [blur, setBlur] = useState('');

    const user = useSelector((state) => state.user)

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => (location.pathname === '/login' || location.pathname === '/signup') ? 
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
        navigate('/');
    }

    return(
        <nav className={`navbar navbar-dark bg-dark fixed-top ${blur}`}>
            <div className="container-fluid">
                <a href='#' className={`navbar-brand wd-bold wd-font-family wd-font-size ${(blur) ? 'wd-pointer-events-none': ''}`} onClick={() => navigate('/')}>
                <img src="/images/headphones2.png" alt="" width="30" height="30" class="d-inline-block align-text-top"/>
                    ommentify</a>
                <div className="d-flex wd-header-center">
                    <input onChange={(event) => setSearchString(event.target.value)}
                           onKeyPress={(e) => handleKeypress(e)}
                           className="form-control wd-header-bg-dark wd-header-search-border wd-header-color wd-header-fontAwesome"
                           type="search"
                           placeholder="&#xf002; Search Music"
                           aria-label="Search"
                           value={searchString}
                           disabled={blur ? 'disabled': ''}
                    />
                </div>
                {!user || !user._id &&
                    <div className="d-flex ms-auto">
                        <button className="btn btn-success me-2" disabled={blur ? 'disabled': ''} type="submit" onClick={() => navigate('/login')}>Login</button>
                        <button className="btn btn-secondary" disabled={blur ? 'disabled': ''} type="submit" onClick={() => navigate('/signup')}>Sign Up</button>
                    </div>
                }
                {(user && user._id) &&
                    <div className="d-flex ms-auto">
                        <button className="btn btn-success me-2" type="submit" onClick={() => navigate('/profile')}>Profile</button>
                        <button className="btn btn-secondary" type="submit" onClick={() => logout()}>Log Out</button>
                    </div>
                }

            </div>
        </nav>
    )
}

export default Header;