export const createTaskAction = (payload) => {
  return {
    type: "CREATE_TASK",
    payload,
  };
};

export const createCommentAction = (payload) => {
  return {
    type: "CREATE_COMMENT",
    payload,
  };
};

export const createColumnAction = (payload) => {
  return {
    type: "CREATE_COLUMN",
    payload,
  };
};

export const deleteTaskAction = (payload) => {
  return {
    type: "DELETE_TASK",
    payload,
  };
};
export const deleteColumnAction = (payload) => {
  return {
    type: "DELETE_COLUMN",
    payload,
  };
};

export const deleteCommentAction = (payload) => {
  return {
    type: "DELETE_COMMENT",
    payload,
  };
};
export const dragAction = (payload) => {
  return {
    type: "DRAG",
    payload,
  };
};
