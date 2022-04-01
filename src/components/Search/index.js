import React from "react";
import ContentPostItem from "../PostItems/ContentPostItem";
import '../Profile/profile-main.css';
import './search.css';
import {useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import {aggregateSearchResults} from "../../util/AggregateUtil";

const SearchScreen = () => {

    const searchResults = useSelector((state) => state.searchResults);
    const aggregatedResults = aggregateSearchResults(searchResults);
    const {query} = useParams(); // query to be used to filter results

    return(
        <>
            <div className="wd-results-header">Results for '{query}'</div>
            <div className="wd-content-section wd-fg-color-white ps-3 pe-3">
                {
                    aggregatedResults.map(item => <ContentPostItem key={item.id} item={item}/>)
                }
            </div>
        </>
    );
}
export default SearchScreen;