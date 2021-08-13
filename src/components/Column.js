import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../MainPage/Main.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";
import { useSelector, useDispatch } from "react-redux";
import { createTaskAction, deleteColumnAction } from "../Redux/Action";

export default function Column(props) {
  const [addButtonOpen, setAddButtonOpen] = useState(false);
  const [task, setTask] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskExecutor, setTaskExecutor] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.toDoReducer);

  const name = (e) => {
    setTaskName(e.target.value);
  };
  const description = (e) => {
    setTaskDescription(e.target.value);
  };
  const executor = (e) => {
    setTaskExecutor(e.target.value);
  };
  const date = (e) => {
    setTaskDate(e.target.value);
  };

  const delButton = (e) => {
    let id = e.target.id;

    dispatch(deleteColumnAction(id));
  };

  const submit = (e) => {
    e.preventDefault();
    if (taskName === "") {
      return;
    }

    const task = {
      title: taskName,
      description: taskDescription,
      executor: taskExecutor,
      date: taskDate,
      parentId: props.id,
      id: uuidv4(),
    };
    dispatch(createTaskAction(task));
    setTaskName("");
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
            <form className="task-form" id={props.id} onSubmit={submit}>
              <input placeholder="Имя задачи" autoFocus onChange={name} />
              <input placeholder="Описание задачи" onChange={description} />
              <input placeholder="Исполнитель" onChange={executor} />
              <input placeholder="Срок исполнения" onChange={date} />

              <button id={props.id}>create</button>
            </form>
          )}

          {tasks.map((i, index) =>
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
                      description={i.description}
                      executor={i.executor}
                      date={i.date}
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
