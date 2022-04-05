import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {searchAction} from "../../actions/search-actions";

const Header = () => {

    const [searchString, setSearchString] = useState('');

    const user = useSelector((state) => state.user)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleKeypress = async e => {
        if (e.charCode === 13) {
            await searchAction(dispatch, searchString);
            navigate('/search/' + searchString);
            setSearchString('');
        }
    };

    const logout = () => {
        console.log("I'll log people out, one day")
    }

    return(
        <nav className="navbar navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <a href="#" className="navbar-brand" onClick={() => navigate('/')}>I'm the header</a>
                <div className="d-flex wd-header-center">
                    <input onChange={(event) => setSearchString(event.target.value)}
                           onKeyPress={(e) => handleKeypress(e)}
                           className="form-control wd-header-bg-dark wd-header-search-border wd-header-color wd-header-fontAwesome"
                           type="search"
                           placeholder="&#xf002; Search Music"
                           aria-label="Search"
                           value={searchString}
                    />
                </div>
                {!user &&
                    <div className="d-flex ms-auto">
                        <button className="btn btn-success me-2" type="submit" onClick={() => navigate('/login')}>Login</button>
                        <button className="btn btn-secondary" type="submit" onClick={() => navigate('/signup')}>Sign Up</button>
                    </div>
                }
                {user &&
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