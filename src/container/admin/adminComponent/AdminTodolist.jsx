import { useContext, useState } from "react";
import PopupDescriptionAdmin from "../../popup/PopupTaskDescriptionAdmin";
import { UserContext } from "../../../UserContext";
import axios from "axios";
import PopUpFirst from "../../Today/PopUpEditToday/PopUpFirst";

const AdminTodoList = ({
  todos,
  setTodos,
  editTodo,
  setEditTodo,
  setReset,
}) => {
  console.log("Admin");
  console.log(todos);

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
            <span
              style={{
                fontWeight: "bold",
                border: "1px solid gray",
                padding: "4px",
                borderRadius: "8px",
              }}
            >
              {todo.username}
            </span>
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
              <PopupDescriptionAdmin
                back={() => {
                  setOpenDecriptionPopup(false);
                }}
                taskInfo={task}
              />
            )}
            {/* <hr/> */}
          </div>
        );
      })}
    </div>
  );
};

export default AdminTodoList;
