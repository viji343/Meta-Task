import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../Reducers";

const middleware = [thunk];

const store = createStore(rootReducer,applyMiddleware(...middleware));

export default store;