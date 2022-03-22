import React from "react";
import {Link, Outlet} from "react-router-dom";
import './main.css';
import {useDispatch, useSelector} from "react-redux";

const MainScreen = () => {

    const userProfile = useSelector((state) => state.userProfile);
    const currentProfile = useSelector((state) => state.currentProfile);
    const dispatch = useDispatch();

    const setCurrentToUser = () => {
        dispatch({
            type: "update-current-user",
            currentUser: userProfile
        })
    }

    const sampleProfile = {
        _id: 124,
        username: "otherUser",
        name: "Jane Doe",
        dob: "1995-06-17",
        email: "janeDoe@example.com",
        website: "janesexample.com",
        joined: "2022-04-21",
        bio: "This is jane doe's sample profile",
        followerCount: 125,
        followingCount: 256,
        profilePicture: "/images/blank-profile-picture.png",
        isArtist: false,
        comments: [
            {
                "content-type": "comment",
                "username": "defaultUsername",
                "likes": 5,
                "itemName": "The Strokes",
                "comment": "Like 'em",
                "image": "/images/is-this-it.jpg",
                "id": 123
            },
            {
                "content-type": "comment",
                "username": "defaultUsername",
                "likes": 6,
                "itemName": "The Clash",
                "comment": "Love London Calling",
                "image": "/images/the-clash.jpg",
                "id": 124
            }
        ],
        "music": [
            {
                "content-type": "music",
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
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/2xkZV2Hl1Omi8rk2D7t5lN"
                },
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
            },
            {
                "content-type": "music",
                "album_type": "single",
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
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/5mRPvdITWYckQAX35a4gRe"
                },
                "href": "https://api.spotify.com/v1/albums/5mRPvdITWYckQAX35a4gRe",
                "id": "5mRPvdITWYckQAX35a4gRe",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/ab67616d0000b273a4a47040a6d6e340b90845fd",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/ab67616d00001e02a4a47040a6d6e340b90845fd",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/ab67616d00004851a4a47040a6d6e340b90845fd",
                        "width": 64
                    }
                ],
                "name": "Hard To Explain/New York City Cops",
                "release_date": "2002-04-30",
                "release_date_precision": "day",
                "total_tracks": 4,
                "type": "album",
                "uri": "spotify:album:5mRPvdITWYckQAX35a4gRe"
            }
        ],
        "likes": [
            {
                "contentType": "comment",
                "username": "JohnSmith",
                "likes": 12,
                "itemName": "The Strokes",
                "comment": "The best band of all time, by far. Even though the last three albums were pretty bad. But those first 2? Gold.",
                "image": "/images/is-this-it.jpg",
                "id": 123
            },
            {
                "contentType": "comment",
                "username": "JaneDoe",
                "likes": 15,
                "itemName": "The Clash",
                "comment": "Iconic band. Big fan.",
                "image": "/images/the-clash.jpg",
                "id": 124
            },
            {
                "contentType": "music",
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
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/2xkZV2Hl1Omi8rk2D7t5lN"
                },
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
            },
            {
                "contentType": "music",
                "album_type": "single",
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
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/5mRPvdITWYckQAX35a4gRe"
                },
                "href": "https://api.spotify.com/v1/albums/5mRPvdITWYckQAX35a4gRe",
                "id": "5mRPvdITWYckQAX35a4gRe",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/ab67616d0000b273a4a47040a6d6e340b90845fd",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/ab67616d00001e02a4a47040a6d6e340b90845fd",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/ab67616d00004851a4a47040a6d6e340b90845fd",
                        "width": 64
                    }
                ],
                "name": "Hard To Explain/New York City Cops",
                "release_date": "2002-04-30",
                "release_date_precision": "day",
                "total_tracks": 4,
                "type": "album",
                "uri": "spotify:album:5mRPvdITWYckQAX35a4gRe"
            }
        ]
    }

    const setExternalUser = () => {
        dispatch({
            type: "update-current-user",
            currentUser: sampleProfile
        })
    }

    return(
        <>
            <div className="row mb-3">
                <div>
                    <h4>One day, I'll be a header</h4>
                    <br/>
                    <Link onClick={() => setCurrentToUser()} to="/profile">User Profile</Link>
                    <span> | </span>
                    <Link onClick={() => setExternalUser()} to={`/profile/${sampleProfile._id}`}>External Profile</Link>
                    <span> | </span>
                    <Link to="/search">Search</Link>
                    <br/>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-xxl-8 col-xl-9 col-lg-10 col-md-12 col-sm-12">
                    <Outlet/>
                </div>
            </div>

        </>
    )
}
export default MainScreen;