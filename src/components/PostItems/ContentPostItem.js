import React from "react";
import './post-items.css';

const renderPrimary = item => {
    switch (item.type) {
        case "album":
        case "track":
            let name = "";
            for (let i = 0; i < item.artists.length; ++i) {
                name = name + item.artists[i].name + ", "
            }
            name = name.slice(0, name.length - 2);
            return "Artist: " + name;
        case "artist":
            return "Artist: " + item.name;
        case "playlist":
            return "Owner: " + item.owner.display_name;
        case "show":
            return "Podcast: " + item.name;
        case "episode":
            return "Episode: " + item.name;
    }
}

const renderSecondary = item => {
    switch(item.type) {
        case "album":
            return item.album_type.slice(0, 1).toUpperCase() + item.album_type.slice(1, item.album_type.length) + ": " + item.name;
        case "artist":
        case "show":
            return <br/>;
        case "track":
            return "Track: " + item.name;
        case "playlist":
            return "Playlist: " + item.name;
        case "episode":
            return item.description;
    }
}

const renderImage = item => {
    if (item.images && item.images.length > 0) {
        return item.images[0].url;
    }
    else if (item.type === "track" && item.album && item.album.images && item.album.images.length > 0){
        return item.album.images[0].url;
    } else {
        return '/images/is-this-it.png';
    }
}

const ContentPostItem = ({
    item = {
        "album_type": "album",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/0epOFNiUfyON9EYx7Tpr6V"
                },
                "href": "https://api.spotify.com/v1/artists/0epOFNiUfyON9EYx7Tpr6V",
                "id": "0epOFNiUfyON9EYx7Tpr6V",
                "name": "The Strokes",
                "type": "artist",
                "uri": "spotify:artist:0epOFNiUfyON9EYx7Tpr6V"
            }
        ],
        "href": "https://api.spotify.com/v1/albums/2xkZV2Hl1Omi8rk2D7t5lN",
        "id": "2xkZV2Hl1Omi8rk2D7t5lN",
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273bfa99afb5ef0d26d5064b23b",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02bfa99afb5ef0d26d5064b23b",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851bfa99afb5ef0d26d5064b23b",
                "width": 64
            }
        ],
        "name": "The New Abnormal",
        "release_date": "2020-04-10",
        "release_date_precision": "day",
        "total_tracks": 9,
        "type": "album",
        "uri": "spotify:album:2xkZV2Hl1Omi8rk2D7t5lN"
    }
}) => {
    return (
        <div className="pt-2 pb-2 wd-display-flex">
            <div className="wd-display-inline-block">
                <img src={renderImage(item)} alt="" className="img-fluid wd-post-image-dims wd-circle-image"/>
            </div>
            <div className="wd-post-data-dims ps-3">
                <div>
                    <a href='/' className="wd-post-href">View Comment Page</a>
                </div>
                <div>
                    {renderPrimary(item)}
                </div>
                <div className="wd-liked-comment">
                    {renderSecondary(item)}
                </div>
                <div>
                    <i className="fa fa-comment"/>
                    <span> 11</span>
                    <i className="fa fa-heart ps-2"/>
                    <span> 12</span>
                </div>
            </div>
        </div>
    )
}

export default ContentPostItem;