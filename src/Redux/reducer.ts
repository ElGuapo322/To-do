import { combineReducers } from "redux";
import { toDoReducer } from "./ToDoReduser";

export const rootReducer = combineReducers({
  toDoReducer: toDoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
