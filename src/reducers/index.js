import { combineReducers } from "redux";

import movieBrowserReducer from "./movie-browser.reducers";

export default combineReducers({
  movieBrowser: movieBrowserReducer
});
