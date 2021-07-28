import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../MainPage/Main.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Context } from "../MainPage/MainPage";
import Task from "./Task";

export default function Column(props) {
  const context = React.useContext(Context);
  const [addButtonOpen, setAddButtonOpen] = useState(false);
  const [task, setTask] = useState([]);
  const [taskName, setTaskName] = useState("имя не выбрано");

  const name = (e) => {
    setTaskName(e.target.value);
  };

  const delButton = (e) => {
    context.delColumn(e.target.id);
  };

  const submit = (e) => {
    e.preventDefault();
    context.createTask(taskName, props.id);
    setTaskName("имя не выбрано");
    setAddButtonOpen(false);
  };
  return (
    <Droppable droppableId={props.id}>
      {(provided) => (
        <div
          id={props.id}
          className="column"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className="title">
            {props.title}
            <button className="delete-button" id={props.id} onClick={delButton}>
              X
            </button>
          </div>
          {!addButtonOpen ? (
            <button onClick={() => setAddButtonOpen(true)} id={props.id}>
              AddButton
            </button>
          ) : (
            <form id={props.id} onSubmit={submit}>
              <input onChange={name} />
              <button id={props.id}>create</button>
            </form>
          )}

          {context.tasks.map((i, index) =>
            props.id === i.parentId ? (
              <Draggable key={i.id} draggableId={i.id} index={index}>
                {(provided) => (
                  <div
                    key={i.id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      grandId={props.id}
                      key={i.id}
                      id={i.id}
                      title={i.title}
                    />
                  </div>
                )}
              </Draggable>
            ) : (
              <></>
            )
          )}
          {provided.placeholder}
          {/* {!addButtonOpen ? (
            <button onClick={() => setAddButtonOpen(true)} id={props.id}>
              AddButton
            </button>
          ) : (
            <form id={props.id} onSubmit={submit}>
              <input onChange={name} />
              <button id={props.id}>create</button>
            </form>
          )} */}
        </div>
      )}
    </Droppable>
  );
}
