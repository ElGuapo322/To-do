interface createTask {
  title: string;
  description: string;
  executor: string;
  date: string;
  parentId: string;
  id: string;
}
interface createColumn {
  id: string;
  title: string;
}
interface createComment {
  text: string;
  grandId: string;
  parentId: string;
  id: string;
}

export const createTaskAction = (payload: createTask) => {
  return {
    type: "CREATE_TASK",
    payload,
  };
};

export const createCommentAction = (payload: createComment) => {
  return {
    type: "CREATE_COMMENT",
    payload,
  };
};

export const createColumnAction = (payload: createColumn) => {
  return {
    type: "CREATE_COLUMN",
    payload,
  };
};

export const deleteTaskAction = (payload: string) => {
  return {
    type: "DELETE_TASK",
    payload,
  };
};
export const deleteColumnAction = (payload: string) => {
  return {
    type: "DELETE_COLUMN",
    payload,
  };
};

export const deleteCommentAction = (payload: string) => {
  return {
    type: "DELETE_COMMENT",
    payload,
  };
};
export const dragAction = (payload: any) => {
  return {
    type: "DRAG",
    payload,
  };
};
