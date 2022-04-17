import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";

import React from 'react'

const WidgetSm = () => {
    return (

        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">

                <li className="widgetSmListItem">
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">rinshad</span>
                    </div>

                    <button
                        className="widgetSmButton"

                    >
                        <Visibility className="widgetSmIcon" />
                        Display
                    </button>
                </li>

            </ul>
        </div>
    )
}

export default WidgetSm