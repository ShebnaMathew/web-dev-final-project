import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import React from "react";
import MainScreen from "./components/Main";
import SearchScreen from "./components/Search";
import './vendors/bootstrap/css/bootstrap.min.css';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.css';
import Profile from "./components/Profile";
import {Provider} from 'react-redux';
import {createStore, combineReducers} from "redux";
import userProfileReducer from "./reducers/userProfileReducer";
import currentProfileReducer from "./reducers/currentProfileReducer";
import searchReducer from "./reducers/searchReducer";

const reducer = combineReducers({userProfile: userProfileReducer, currentProfile: currentProfileReducer, searchResults: searchReducer})
const store = createStore(reducer);

function App() {
  return (
    <BrowserRouter>
        <Provider store={store}>
            <div className="container wd-min-body-width">
                <Routes>
                    <Route path="/" element={<MainScreen/>}>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/profile/:_id" element={<Profile/>}/>
                        <Route path="/search" element={<SearchScreen/>}/>
                    </Route>
                </Routes>
            </div>
        </Provider>
    </BrowserRouter>
  );
}

export default App;
