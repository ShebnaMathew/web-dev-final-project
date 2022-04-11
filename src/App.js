import {BrowserRouter,Routes,Route} from "react-router-dom";
import React from "react";
import MainScreen from "./components/Main";
import SearchScreen from "./components/Search";
import './vendors/bootstrap/css/bootstrap.min.css';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.css';
import './App.css';
import './components/Header/header.css';
import Profile from "./components/Profile/ProfileScreen";
import EditProfile from "./components/Profile/EditProfileScreen";
import {Provider} from 'react-redux';
import {createStore, combineReducers} from "redux";
import profileReducer from "./reducers/profileReducer";
import searchReducer from "./reducers/searchReducer";
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NewsFeed from "./components/NewsFeed";
import {authorize} from "./services/spotify/spotify-service";
import newsReducer from "./reducers/newsReducer";
import userReducer from "./reducers/userReducer";
import Post from "./components/NewsFeed/Post";
import DetailsScreen from "./components/DetailsScreen";
import Album from "./components/DetailsScreen/Media/Album";
import Show from "./components/DetailsScreen/Media/Show";
import Episode from "./components/DetailsScreen/Media/Episode";
import Track from "./components/DetailsScreen/Media/Track";
import Playlist from "./components/DetailsScreen/Media/Playlist";

const reducer = combineReducers(
{
    profile: profileReducer,
    user: userReducer,
    searchResults: searchReducer,
    newsResults: newsReducer
})
const store = createStore(reducer);

authorize();

function App() {
  return (
    <BrowserRouter>
        <Provider store={store}>
            <Header/>
            <div className="container wd-min-body-width">
                <Routes>
                    <Route path="/" element={<MainScreen/>}>
                        <Route index element={<NewsFeed/>}/>
                        <Route path="/post" element={<Post/>}/>
                        <Route path="/post/:_id" element={<Post/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/profile/:_id" element={<Profile/>}/>
                        <Route path="/editProfile" element={<EditProfile/>}/>
                        <Route path="/search/:query" element={<SearchScreen/>}/>
                        <Route path="/details" element={<DetailsScreen/>}/>
                        <Route path="/album/:_id" element={<Album/>}/>
                        <Route path="/show/:_id" element={<Show/>}/>
                        <Route path="/episode/:_id" element={<Episode/>}/>
                        <Route path="/track/_:d" element={<Track/>}/>
                        <Route path="/playlist/_:d" element={<Playlist/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                    </Route>
                </Routes>
            </div>
        </Provider>
    </BrowserRouter>
  );
}

export default App;
