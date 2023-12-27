import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
function PopupDescriptionAdmin({ taskInfo, back }) {
  let taskId = taskInfo.id;
  const user = useContext(UserContext);
  const [task, setTask] = useState({});
  const [label, setLabel] = useState(null);
  const [filter, setFilter] = useState(null);
  useEffect(() => {
    if (taskInfo.label_id != null) {
      axios
        .get("http://localhost:4000/label/" + taskInfo.label_id, {
          headers: {
            authorization: user.jwt,
          },
        })
        .then((data) => {
          setLabel({
            name: data.data[0].label_name,
            color: data.data[0].color,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (taskInfo.filter_id != null) {
      axios
        .get("http://localhost:4000/filter/" + taskInfo.filter_id, {
          headers: {
            authorization: user.jwt,
          },
        })
        .then((data) => {
          setFilter({
            name: data.data[0].filter_name,
            color: data.data[0].color,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    axios
      .get("http://localhost:4000/admin/task/" + taskId, {
        headers: {
          authorization: user.jwt,
        },
      })
      .then((res) => {
        let data = res.data;
        let user = data.user;
        let task = data.task;
        let date = new Date(task.due_date);
        setTask({
          user: {
            userId: user.user_id,
            userName: user.user_name,
          },
          task: {
            taskName: task.task_name,
            taskDescription: task.description,
            dueDate:
              date.getDate() +
              "-" +
              (date.getMonth() + 1) +
              "-" +
              date.getFullYear(),
            priority: "Priority " + task.priority_id,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const popupContainer = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFF",
    zIndex: 1000,
    padding: "10px",
    borderRadius: "12px",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 4px 4px",
    width: "600px",
    height: "500px",
    padding: "0",
  };
  const popupBackground = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  };
  return (
    <div style={popupBackground}>
      <div style={popupContainer}>
        <button
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            color: "blue",
            padding: "5px",
            border: "1px solid gray",
            borderRadius: "5px",
          }}
          onClick={() => {
            back();
          }}
        >
          Back
        </button>
        {task.task && (
          <div style={{ display: "flex" }}>
            <div
              style={{
                margin: "0",
                width: "400px",
                height: "500px",
                borderRight: "2px solid gray",
                padding: "40px 30px 30px 30px",
              }}
            >
              <h2>{task.task.taskName}</h2>
              <p>{task.task.taskDescription}</p>
            </div>
            <div
              style={{
                marginTop: 0,
                width: "200px",
                background: "#d9d9d9",
                borderRadius: "0px 12px 12px 0px",
                padding: "40px 20px 20px 20px",
              }}
            >
              <span style={{ fontWeight: "bold", color: "blue" }}>
                Due date
              </span>
              <p>{task.task.dueDate}</p>
              <span style={{ fontWeight: "bold", color: "blue" }}>
                Priority
              </span>
              <p>{task.task.priority}</p>
              <span style={{ fontWeight: "bold", color: "blue" }}>Label</span>
              {label == null ? (
                <p className="mt-[4px]">Không có Label</p>
              ) : (
                <p className="mt-[4px]" style={{ color: label.color }}>
                  {label.name}
                </p>
              )}
              <span style={{ fontWeight: "bold", color: "blue" }}>Filter</span>
              {filter == null ? (
                <p className="mt-[4px]">Không có filter</p>
              ) : (
                <p className="mt-[4px]" style={{ color: filter.color }}>
                  {filter.name}
                </p>
              )}
              <span style={{ fontWeight: "bold", color: "blue" }}>User</span>
              <p>{task.user.userName}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PopupDescriptionAdmin;
