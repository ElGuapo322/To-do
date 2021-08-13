import { v4 as uuidv4 } from "uuid";

const initialState = {
  columns: [
    {
      id: uuidv4(),
      title: "Сделать",
    },
    {
      id: uuidv4(),
      title: "В работе",
    },
    {
      id: uuidv4(),
      title: "Сделано",
    },
  ],
  tasks: [],
  comments: [],
};

export const toDoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_COLUMN":
      console.log(state);
      return {
        ...state,
        columns: [...state.columns, action.payload],
      };
    case "DELETE_COLUMN":
      const checkTasks = state.tasks.filter(
        (i) => i.parentId === action.payload
      );
      if (checkTasks.length === 0) {
        const newColumns = state.columns.filter((i) => action.payload !== i.id);
        console.log("колонны", newColumns);
        return {
          ...state,
          columns: [...newColumns],
        };
      } else return state;

    case "CREATE_TASK":
      console.log("таски", state.tasks);
      console.log(action.payload);
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "DELETE_TASK":
      const newTasks = state.tasks.filter((i) => action.payload !== i.id);
      return {
        ...state,
        tasks: [...newTasks],
      };
    case "CREATE_COMMENT":
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case "DELETE_COMMENT":
      const newComments = state.comments.filter((i) => action.payload !== i.id);
      return {
        ...state,
        comments: [...newComments],
      };
    case "DRAG":
      console.log(action.payload);
      const taskCopy = state.tasks[action.payload.source.index];
      taskCopy.parentId = action.payload.destination.droppableId;
      state.tasks.splice(action.payload.source.index, 1);
      state.tasks.splice(action.payload.destination.index, 0, taskCopy);

    default:
      return state;
  }
};
