import React from "react";
import ContentPostItem from "../PostItems/ContentPostItem";
import '../Profile/profile-main.css';
import './search.css';
import {useSelector} from "react-redux";

const aggregateSearchResults = searchResults => {
    let results = [];
    if (searchResults.albums) {
        results = [...results, ...searchResults.albums.items]
    }
    if (searchResults.artists) {
        results = [...results, ...searchResults.artists.items]
    }
    if (searchResults.tracks) {
        results = [...results, ...searchResults.tracks.items]
    }
    if (searchResults.playlists) {
        results = [...results, ...searchResults.playlists.items]
    }
    return results;
}

const SearchScreen = () => {

    const searchResults = useSelector((state) => state.searchResults);
    const aggregatedResults = aggregateSearchResults(searchResults);

    return(
        <>
            <div className="wd-results-header">Results</div>
            <div className="wd-content-section wd-fg-color-white ps-3 pe-3">
                {
                    aggregatedResults.map(item => <ContentPostItem key={item.id} item={item}/>)
                }
            </div>
        </>
    );
}
export default SearchScreen;