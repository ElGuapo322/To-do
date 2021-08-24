import React, { HtmlHTMLAttributes, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../MainPage/Main.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";
import { useSelector, useDispatch } from "react-redux";
import { createTaskAction, deleteColumnAction } from "../Redux/Action";
import { UseTypedSelector } from "../hooks/useTypedSelector";

interface ColumnProps {
  //key: string;
  id: string;
  title: string;
}

export default function Column({ id, title }: ColumnProps) {
  const [addButtonOpen, setAddButtonOpen] = useState(false);
  const [task, setTask] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskExecutor, setTaskExecutor] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const dispatch = useDispatch();
  const { tasks } = UseTypedSelector((state) => state.toDoReducer);

  const name = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };
  const description = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.target.value);
  };
  const executor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskExecutor(e.target.value);
  };
  const date = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDate(e.target.value);
  };

  const delButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    let id = e.currentTarget.id;

    dispatch(deleteColumnAction(id));
  };

  const submit = (e: any) => {
    e.preventDefault();
    if (taskName === "") {
      return;
    }

    const task = {
      title: taskName,
      description: taskDescription,
      executor: taskExecutor,
      date: taskDate,
      parentId: id,
      id: uuidv4(),
    };
    dispatch(createTaskAction(task));
    setTaskName("");
    setAddButtonOpen(false);
  };
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          id={id}
          className="column"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className="title">
            {title}
            <button className="delete-button" id={id} onClick={delButton}>
              X
            </button>
          </div>
          {!addButtonOpen ? (
            <button onClick={() => setAddButtonOpen(true)} id={id}>
              AddButton
            </button>
          ) : (
            <form className="task-form" id={id} onSubmit={submit}>
              <input placeholder="Имя задачи" autoFocus onChange={name} />
              <input placeholder="Описание задачи" onChange={description} />
              <input placeholder="Исполнитель" onChange={executor} />
              <input placeholder="Срок исполнения" onChange={date} />

              <button id={id}>create</button>
            </form>
          )}

          {tasks.map((i, index: number) =>
            id === i.parentId ? (
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
                      grandId={id}
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
