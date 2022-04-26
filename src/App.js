import {BrowserRouter,Routes,Route} from "react-router-dom";
import React from "react";

import './vendors/bootstrap/css/bootstrap.min.css';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.css';
import './App.css';
import Profile from "./components/Profile/ProfileScreen";
import EditProfile from "./components/Profile/EditProfileScreen";
import {Provider} from 'react-redux';
import {createStore, combineReducers} from "redux";
import profileReducer from "./reducers/profileReducer";
import searchReducer from "./reducers/searchReducer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PrivacyPolicy from "./components/PrivacyPolicy";
import newsReducer from "./reducers/newsReducer";
import userReducer from "./reducers/userReducer";
import Album from "./components/DetailsScreen/Media/Album";
import Show from "./components/DetailsScreen/Media/Show";
import Episode from "./components/DetailsScreen/Media/Episode";
import Track from "./components/DetailsScreen/Media/Track";
import Playlist from "./components/DetailsScreen/Media/Playlist";
import MainScreen from "./components/Main";
import SearchScreen from "./components/Search";
import NewsFeed from "./components/NewsFeed";
import Header from "./components/Header";
import Artist from "./components/DetailsScreen/Media/Artist";

const reducer = combineReducers(
{
    profile: profileReducer,
    user: userReducer,
    searchResults: searchReducer,
    newsResults: newsReducer
})
const store = createStore(reducer);

// handles specific problem with dependency: https://github.com/wadackel/react-stack-grid/issues/46
// not updated by user, but thread on the github page indicates the warning is harmless

const backup = console.warn;

console.error = function filterWarnings(msg) {
    const supressedWarnings = ['`Infinity` is an invalid value for the `height` css style property'];

    if (!supressedWarnings.some(entry => msg.includes(entry))) {
        backup.apply(console, arguments);
    }
};

function App() {
  return (
    <BrowserRouter>
        <Provider store={store}>
            <Header/>
            <div className="container wd-min-body-width">
                <Routes>
                    <Route path="/" element={<MainScreen/>}>
                        <Route index element={<NewsFeed/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/profile/:_id" element={<Profile/>}/>
                        <Route path="/editProfile" element={<EditProfile/>}/>
                        <Route path="/search/:query" element={<SearchScreen/>}/>
                        <Route path="/album/:postId" element={<Album/>}/>
                        <Route path="/artist/:postId" element={<Artist/>}/>
                        <Route path="/track/:postId" element={<Track/>}/>
                        <Route path="/playlist/:postId" element={<Playlist/>}/>
                        <Route path="/show/:postId" element={<Show/>}/>
                        <Route path="/episode/:postId" element={<Episode/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path="/privacyPolicy" element={<PrivacyPolicy/>}/>
                    </Route>
                </Routes>
            </div>
        </Provider>
    </BrowserRouter>
  );
}

export default App;
