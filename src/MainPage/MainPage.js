import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Main.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "../components/Column";
import { useSelector, useDispatch } from "react-redux";
import { createColumnAction, dragAction } from "../Redux/Action";

// const dataset = {
//   columns: [
//     {
//       id: uuidv4(),
//       title: "Сделать",
//     },
//     {
//       id: uuidv4(),
//       title: "В работе",
//     },
//     {
//       id: uuidv4(),
//       title: "Сделано",
//     },
//   ],
//   tasks: [],
//   comments: [],
// };

// export const Context = React.createContext(dataset);

export default function MainPage() {
  const [columnName, setColumnName] = useState("");
  const [addColumnOpen, setAddColumnOpen] = useState(false);

  const dispatch = useDispatch();
  const { columns } = useSelector((state) => state.toDoReducer);

  const colName = (e) => {
    setColumnName(e.target.value);
  };

  const addColumn = (e) => {
    e.preventDefault();
    if (columnName === "") {
      return;
    }
    let newColumn = {
      title: columnName,
      id: uuidv4(),
    };
    dispatch(createColumnAction(newColumn));
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
    const obj = {
      source: source,
      destination: destination,
    };
    dispatch(dragAction(obj));
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="main">
        {columns.map((i) => (
          <Column key={i.id} id={i.id} title={i.title} onClick />
        ))}
        {!addColumnOpen ? (
          <button onClick={() => setAddColumnOpen(true)}>Добавить</button>
        ) : (
          <div className="newColumn">
            <form onSubmit={addColumn}>
              <input autoFocus onChange={colName} />
              <button type="submit">Добавить</button>
            </form>
          </div>
        )}
      </div>
    </DragDropContext>
  );
}
