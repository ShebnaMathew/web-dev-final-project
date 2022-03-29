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
import userProfileReducer from "./reducers/userProfileReducer";
import currentProfileReducer from "./reducers/currentProfileReducer";
import searchReducer from "./reducers/searchReducer";
import Header from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NewsFeed from "./components/NewsFeed";
import {authorize} from "./api/spotify/connector";

const reducer = combineReducers(
{
    userProfile: userProfileReducer,
    currentProfile: currentProfileReducer,
    searchResults: searchReducer
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
                        <Route path="/" element={<NewsFeed/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/profile/:_id" element={<Profile/>}/>
                        <Route path="/editProfile" element={<EditProfile/>}/>
                        <Route path="/search" element={<SearchScreen/>}/> {/* can show a blank no results page once things are set up - or just remove this path?*/}
                        <Route path="/search/:query" element={<SearchScreen/>}/> {/* show results for a specific query*/}
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
