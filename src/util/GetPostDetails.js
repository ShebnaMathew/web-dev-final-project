export const getArtistName = (post) => {
    switch (post.type) {
        case "album":
        case "track":
            return post.artists[0].name;
        case "artist":
        case "episode":
            return "";
        case "playlist":
            return post.owner.display_name;
        case "show":
            return post.publisher;
        default:
            return "";
    }
}

export const getArtistId = (post) => {
    if (post.type === "album" || post.type === "track") {
        return post.artists[0].id;
    } else if (post.type === "artist") {
        return post.id;
    } else {
        return null;
    }
}

export const getImage = (post) => {
    if (post.images && post.images.length > 0) {
        return post.images[0].url;
    } else if (post.type === 'track' && post.album.images.length > 0){
        return post.album.images[0].url;
    }else {
        return "/images/unavailable-image.jpg"
    }
}

export const getReleaseDate = (post) => {
    if (post.type === "album" || post.type === "episode") {
        return post.release_date;
    } else if (post.type === "track") {
        return post.album.release_date;
    } else {
        return null;
    }
}

export const getNumberOfTracksOrEpisodes = (post) => {
    if (post.type === "album") {
        return post.total_tracks;
    } else if (post.type === "show") {
        return post.total_episodes;
    } else if (post.type === "playlist") {
        return post.tracks.total;
    } else {
        return null;
    }
}