import {BrowserRouter,Routes,Route} from "react-router-dom";
import React, {useEffect, useState} from "react";

import './vendors/bootstrap/css/bootstrap.min.css';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.css';
import './App.css';
// import './components/Header/header.css';
import Profile from "./components/Profile/ProfileScreen";
import EditProfile from "./components/Profile/EditProfileScreen";
import {Provider, useSelector} from 'react-redux';
import {createStore, combineReducers} from "redux";
import profileReducer from "./reducers/profileReducer";
import searchReducer from "./reducers/searchReducer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PrivacyPolicy from "./components/PrivacyPolicy";
import {authorize} from "./services/spotify/spotify-service";
import newsReducer from "./reducers/newsReducer";
import userReducer from "./reducers/userReducer";
import DetailsScreen from "./components/DetailsScreen";
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
