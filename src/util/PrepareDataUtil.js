import {getArtistId, getArtistName,getGenres,getImage,getNumberOfTracksOrEpisodes,getReleaseDate, getTrackDuration} from './GetPostDetails';
export const prepareData = (data, type) => {
    switch(type){
        case 'album':
            return({
                post_id: data.id,
                type: type,
                image_url: getImage(data),
                spotify_url: data.external_urls.spotify,
                name: data.name,
                album_type: data.album_type,
                artist_name: getArtistName(data),
                artist_id: data.artists[0].id,
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
                album_id: data.album.id,
                artist_name: data.artists[0].name,
                artist_id: data.artists[0].id,
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
                popularity: data.popularity
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
                show_name: data.show.name,
                show_id: data.show.id,
                release_date: getReleaseDate(data),
                description: data.description
            })
        default:
    }
}