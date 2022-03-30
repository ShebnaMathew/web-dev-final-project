import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {searchNewMusicAction} from "../../actions/search-actions";
import {aggregateSearchResults} from "../../util/AggregateUtil";
import ContentPostItem from "../PostItems/ContentPostItem";


const NewsFeed = () => {

    const news = useSelector((state) => state.newsResults);

    const dispatch = useDispatch();

    useEffect(() => {
        searchNewMusicAction(dispatch);
    }, [])

    const aggregatedResults = aggregateSearchResults(news);

    return(
        <>
            <h1>New Music</h1>

            <div className="wd-content-section wd-fg-color-white ps-3 pe-3">
                {
                    aggregatedResults.map(item => <ContentPostItem key={item.id} item={item}/>)
                }
            </div>
        </>
    )
}

export default NewsFeed;