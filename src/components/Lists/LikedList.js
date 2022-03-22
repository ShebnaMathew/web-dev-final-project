import React from "react";
import ContentPostItem from "../PostItems/ContentPostItem";
import ListCommentItem from "../PostItems/ListCommentItem";

const LikedList = (likes = {likes:[]}) => {
    const likeContent = likes.likes;
    return(
        <>
            {
                likeContent.map((content) => {
                    if (content.contentType === "comment") {
                        return <ListCommentItem key={content.id} comment={content}/>
                    } else if (content.contentType === "music") {
                        return <ContentPostItem key={content.id} item={content}/>
                    }
                })
            }
        </>
    )
}
export default LikedList;