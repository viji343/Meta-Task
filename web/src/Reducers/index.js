import { combineReducers } from "redux";
import ApiReducer from "./ApiReducer";

const appReducer = combineReducers({
    api: ApiReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;