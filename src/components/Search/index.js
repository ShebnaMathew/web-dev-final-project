import React, {useEffect, useState} from "react";
import '../Profile/profile-main.css';
import './search.css';
import {useParams} from "react-router-dom";
import {searchAction} from "../../actions/search-actions";
import {useDispatch, useSelector} from "react-redux";
import SearchList from "./SearchList";
import '../NewsFeed/newsfeed.css';

const SearchScreen = () => {

    const params = useParams()
    const dispatch = useDispatch();
    const results = useSelector((state) => state.searchResults.results);
    const [ready, setReady] = useState(false);

    const query = params.query;

    useEffect(async () => {
        setReady(false);
        await searchAction(dispatch, query);
        setReady(true);
    }, [query, dispatch])

    return(
        <>
            <h4 className="mt-4 ms-2 wd-fg-grey">Results for "{query}"</h4>
            {ready && results.albums.items.length > 0 &&
                <SearchList posts={results.albums.items} media="Albums"/>
            }
            {ready && results.artists.items.length > 0 &&
                <SearchList posts={results.artists.items} media="Artists"/>
            }
            {ready && results.tracks.items.length > 0 &&
                <SearchList posts={results.tracks.items} media="Tracks"/>
            }
            {ready && results.playlists.items.length > 0 &&
                <SearchList posts={results.playlists.items} media="Playlists"/>
            }
            {ready && results.shows.items.length > 0 &&
                <SearchList posts={results.shows.items} media="Shows"/>
            }
            {ready && results.episodes.items.length > 0 &&
                <SearchList posts={results.episodes.items} media="Episodes"/>
            }
            {!ready &&
                <i className="fa wd-spinner-pos fa-3x fa-spinner fa-spin"/>
            }
            </>
    );
}
export default SearchScreen;