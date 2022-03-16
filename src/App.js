import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import React from "react";
import MainScreen from "./Main";
import ProfileScreen from "./Profile";
import SearchScreen from "./Search";
import './vendors/bootstrap/css/bootstrap.min.css';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.css';

function App() {
  return (
    <BrowserRouter>
        <div className="container">
            <Routes>
                <Route path="/" element={<MainScreen/>}>
                    <Route path="/profile" element={<ProfileScreen/>}/>
                    <Route path="/search" element={<SearchScreen/>}/>
                </Route>
            </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
