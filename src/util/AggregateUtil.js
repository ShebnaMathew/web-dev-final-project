export const aggregateSearchResults = searchResults => {
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
    if (searchResults.shows) {
        results = [...results, ...searchResults.shows.items]
    }
    if (searchResults.episodes) {
        results = [...results, ...searchResults.episodes.items]
    }

    return results;
}