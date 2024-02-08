import { applyMiddleware, createStore } from "redux";
import movieReducers from "./reducers/movieReducers";
import { thunk } from "redux-thunk";

export default createStore(movieReducers,applyMiddleware(thunk));