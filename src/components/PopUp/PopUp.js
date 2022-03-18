import React from "react";
import './popup.css';

const PopUp = ({
    setShow = () => console.log("setShow is undefined"),
    Content = () => <></>,
    title = "Popup",
    contentParams = {}
}) => {
    return (
        <div className="wd-follow-popup">
            <div className="wd-follow-popup-window">
                <div className="wd-popup-entry-header wd-position-relative ps-3">
                    <button onClick={() => setShow(false)} className="wd-follow-popup-remove-button">
                        <i className="fa fa-remove fa-2x wd-popup-entry-header-icon-pos"/>
                    </button>
                    <div className="wd-popup-entry-header-title-pos">{title}</div>
                </div>
                <div className="mb-0 wd-popup-user-list">
                    {<Content {...contentParams}/>}
                </div>
            </div>
        </div>
    )
}
export default PopUp;