import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Main.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "../components/Column";

const dataset = {
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

export const Context = React.createContext(dataset);

export default function MainPage() {
  const [data, setData] = useState(dataset.columns);

  const [columnName, setColumnName] = useState("");
  const [addColumnOpen, setAddColumnOpen] = useState(false);
  const [tasks, setTasks] = useState(dataset.tasks);
  const [comments, setComments] = useState(dataset.comments);

  const delComment = (targetId) => {
    let newComments = comments.filter((i) => targetId !== i.id);
    setComments(newComments);
  };

  const delTask = (targetId) => {
    let newTasks = tasks.filter((i) => targetId !== i.id);
    setTasks(newTasks);
    let newComments = comments.filter((i) => targetId !== i.parentId);
    setComments(newComments);
  };

  const createComment = (text, parentId, grandId) => {
    const comment = {
      text,
      grandId,
      parentId,
      id: uuidv4(),
    };
    setComments([...comments, comment]);
    console.log("comments", comments);
  };

  const createTask = (title, parentId) => {
    const task = {
      title,
      parentId,
      id: uuidv4(),
    };

    setTasks([...tasks, task]);
    console.log("tasks", tasks);
  };

  const delColumn = (targetId) => {
    let newData = data.filter((i) => targetId !== i.id);
    setData(newData);
    let newTasks = tasks.filter((i) => targetId !== i.parentId);
    setTasks(newTasks);
    let newComments = comments.filter((i) => targetId !== i.grandId);
    setComments(newComments);
  };

  const colName = (e) => {
    setColumnName(e.target.value);
  };

  console.log(data);

  const addColumn = (e) => {
    e.preventDefault();
    let newColumn = {
      title: columnName,
      id: uuidv4(),
    };
    setData([...data, newColumn]);
    setAddColumnOpen(false);
  };

  const handleOnDragEnd = ({ destination, source }) => {
    console.log("from", source);
    console.log("to", destination);

    if (!destination) {
      console.log("not dropped in droppable");
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      console.log("dropped in same place");
      return;
    }
    const itemCopy = tasks[source.index];
    console.log("copy", itemCopy.index);

    itemCopy.parentId = destination.droppableId;
    tasks.splice(source.index, 1);
    tasks.splice(destination.index, 0, itemCopy);
  };

  return (
    <Context.Provider
      value={{
        createTask,
        tasks,
        createComment,
        comments,
        delTask,
        delComment,
        delColumn,
      }}
    >
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="main">
          {data.map((i) => (
            <Column id={i.id} title={i.title} onClick />
          ))}
          {!addColumnOpen ? (
            <button onClick={() => setAddColumnOpen(true)}>Добавить</button>
          ) : (
            <div className="newColumn">
              <form onSubmit={addColumn}>
                <input onChange={colName} />
                <button type="submit">Добавить</button>
              </form>
            </div>
          )}
        </div>
      </DragDropContext>
    </Context.Provider>
  );
}
