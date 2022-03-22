import React from "react";
import ContentPostItem from "../PostItems/ContentPostItem";

const MusicList = (music = {music: []}) => {
    const musicContents = music.music;
    return (
        <>
            {
                musicContents.map(content => <ContentPostItem key={content.id} item={content}/>)
            }
        </>
    );
}
export default MusicList;