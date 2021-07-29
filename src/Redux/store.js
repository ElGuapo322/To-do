import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer";

export const store = createStore(rootReducer);
