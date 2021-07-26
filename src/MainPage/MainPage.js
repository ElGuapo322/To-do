import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Main.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "../components/Column";

const dataset = [
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
];

export default function MainPage() {
  const [data, setData] = useState(dataset);
  const [addButtonOpen, setAddButtonOpen] = useState(false);
  const [columnName, setColumnName] = useState("");
  const [addColumnOpen, setAddColumnOpen] = useState(false);

  const delButton = (e) => {
    console.log(e.target);
    let newData = data.filter((i) => e.target.id !== i.id);
    setData(newData);
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

  return (
    <div className="main">
      {data.map((i) => (
        <Column id={i.id} title={i.title} onClick={delButton} />
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
  );
}
