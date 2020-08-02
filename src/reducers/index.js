import { combineReducers } from "redux";
import { reducer as notifications } from "react-notification-system-redux";

import ui from "./ui";

export default combineReducers({ ui, notifications });
