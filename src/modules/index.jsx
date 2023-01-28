import {combineReducers} from "redux";
import counter from "./counter";
import sample from "./sample";

const rootReducer = combineReducers({
	sample,
	counter
})

export default rootReducer;