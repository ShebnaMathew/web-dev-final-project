import {getArtistId, getArtistName,getGenres,getImage,getNumberOfTracksOrEpisodes,getReleaseDate, getTrackDuration} from './GetPostDetails';
export const prepareData = (data, type, extra = '') => {
    switch(type){
        case 'album':
            return({
                post_id: data.id,
                type: type,
                image_url: getImage(data),
                spotify_url: data.external_urls.spotify,
                name: data.name,
                artist_name: getArtistName(data),
                release_date: getReleaseDate(data),
                total_tracks: getNumberOfTracksOrEpisodes(data)
            })
        case 'track':
            return({
                post_id: data.id,
                type: type,
                image_url: getImage(data),
                spotify_url: data.external_urls.spotify, // change key name to stay consistent
                name: data.name,
                album_name: data.album.name,
                release_date: getReleaseDate(data),
                track_duration: getTrackDuration(data),
                popularity: data.popularity
            })
        case 'playlist':
            return({
                post_id: data.id,
                type: type,
                image_url: getImage(data),
                spotify_url: data.external_urls.spotify,
                name: data.name,
                owner_display_name: data.owner.display_name,
                description: data.description,
                total_tracks: getNumberOfTracksOrEpisodes(data)
            })
        case 'artist':
            return({
                post_id: data.id,
                type: type,
                image_url: getImage(data),
                name: data.name,
                spotify_url: data.external_urls.spotify,
                genres: getGenres(data),
                followers_total: data.followers.total,
                popularity: data.popularity//,
                // artist_present: null // maybe this can be added on the backend
            })
        case 'show':
            return({
                post_id: data.id,
                type: type,
                image_url: getImage(data),
                spotify_url: data.external_urls.spotify,
                name: data.name,
                publisher: data.publisher,
                total_episodes: getNumberOfTracksOrEpisodes(data),
                description: data.description
            })
        case 'episode':
            return({
                post_id: data.id,
                type: type,
                image_url: getImage(data),
                spotify_url: data.external_urls.spotify,
                name: data.name,
                show_name: extra,
                release_date: getReleaseDate(data),
                description: data.description
            })
        default:
    }
}