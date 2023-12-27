import React, { useContext, useState } from "react";
import PopUpFirst from "./PopUpEditToday/PopUpFirst";
import PopupDescription from "../popup/PopupTaskDescription";
import axios from "axios";
import { UserContext } from "../../UserContext";

const TodosList = ({ todos, setTodos, editTodo, setEditTodo, setReset }) => {
  const [task, setTask] = useState({});
  const user = useContext(UserContext);
  const handleDelete = ({ id }) => {
    axios
      .delete("http://localhost:4000/task/" + id, {
        headers: {
          authorization: user.jwt,
        },
      })
      .then((data) => {
        setReset({});
        // setTodos(todos.filter((todo)=> todo.id !== id))
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleComplete = ({ id, completed }) => {
    axios
      .post(
        "http://localhost:4000/task/status",
        {
          task_id: id,
          status: 1 - completed,
        },
        {
          headers: {
            authorization: user.jwt,
          },
        }
      )
      .then((data) => {
        setReset({});
        // setTodos(todos.filter((todo)=> todo.id !== id))
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [popup1, setPopup1] = useState(false);
  const [openDescriptionPopup, setOpenDecriptionPopup] = useState(false);

  return (
    <div>
      {todos.map((todo) => {
        let item = todo;
        return (
          <div
            className="flex items-center border-b-[1px] border-solid border-gray-200 px-3"
            key={todo.id}
          >
            <div className=" flex items-center grow h-14">
              {/* <hr className='mb-3'/> */}
              <input
                type="checkbox"
                value={todo.title}
                onClick={() => handleComplete(todo)}
                checked={todo.completed}
                // onChange={(event)=>event.preventDefault()}
              />
              <span
                className="pr-20 pl-3"
                style={{
                  fontSize: "18px", // Điều chỉnh giá trị này để thay đổi kích thước của chữ
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            </div>
            <div className="flex-end">
              <button
                className="ui button"
                style={{
                  marginLeft: "5px",
                  background: "blue",
                  color: "white",
                }}
                onClick={() => {
                  setTask(item);
                  setOpenDecriptionPopup(true);
                }}
              >
                View
              </button>
              <button
                className="ui button"
                style={{ marginLeft: "5px", background: "red", color: "white" }}
                onClick={() => handleDelete(item)}
              >
                Delete
              </button>
              <button
                className="ui button"
                style={{
                  marginLeft: "5px",
                  background: "green",
                  color: "white",
                }}
                onClick={() => {
                  setPopup1(true);
                }}
              >
                Edit
              </button>
            </div>
            {/* <div className='flex-none h-14'>    */}
            {/* </div>  */}
            {popup1 && <PopUpFirst setPopup1={setPopup1} />}
            {openDescriptionPopup && (
              <PopupDescription
                back={() => {
                  setOpenDecriptionPopup(false);
                }}
                task={task}
              />
            )}
            {/* <hr/> */}
          </div>
        );
      })}
    </div>
  );
};

export default TodosList;
