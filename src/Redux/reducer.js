import { combineReducers } from "redux";
import { toDoReducer } from "./ToDoReduser";

export default combineReducers({
  toDoReducer: toDoReducer,
});
