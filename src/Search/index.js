import React from "react";
import ContentPostItem from "../PostItems/ContentPostItem";
import '../Profile/profile-main.css';
import './search.css';

const SearchScreen = () => {
    return(
        <>
            <div className="wd-results-header">Results</div>
            <div className="wd-content-section wd-fg-color-white ps-3 pe-3">
                <ContentPostItem/>
                <ContentPostItem/>
                <ContentPostItem/>
                <ContentPostItem/>
                <ContentPostItem/>
                <ContentPostItem/>
                <ContentPostItem/>
                <ContentPostItem/>
                <ContentPostItem/>
                <ContentPostItem/>
                <ContentPostItem/>
                <ContentPostItem/>
            </div>
        </>
    );
}
export default SearchScreen;