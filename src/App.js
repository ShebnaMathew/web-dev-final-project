import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import React from "react";
import MainScreen from "./Main";
import SearchScreen from "./Search";
import './vendors/bootstrap/css/bootstrap.min.css';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.css';
import Profile from "./Profile";
import {Provider} from 'react-redux';
import {createStore, combineReducers} from "redux";
import profileReducer from "./reducers/profileReducer";

const reducer = combineReducers({profile: profileReducer})
const store = createStore(reducer);

function App() {
  return (
    <BrowserRouter>
        <Provider store={store}>
            <div className="container wd-min-body-width">
                <Routes>
                    <Route path="/" element={<MainScreen/>}>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/search" element={<SearchScreen/>}/>
                    </Route>
                </Routes>
            </div>
        </Provider>
    </BrowserRouter>
  );
}

export default App;
