import React, { useRef, useState } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { useContext, useEffect } from "react";
import TodosList from "../Today/TodosList";
import { Button, Form, Dropdown } from "semantic-ui-react";

const Search = ({ isP }) => {
  const user = useContext(UserContext);
  const [task, setTask] = useState({
    priority: undefined,
    label: undefined,
    filter: undefined,
  });
  const [todos, setTodos] = useState([]);
  const [reset, setReset] = useState({});
  const [labelList, setLabelList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const lvOptions = [
    {
      key: "Important",
      text: "Priority 1",
      value: 1,
      label: { color: "red", empty: true, circular: true },
    },
    {
      key: "Less Important",
      text: "Priority 2",
      value: 2,
      label: { color: "yellow", empty: true, circular: true },
    },
    {
      key: "Normal",
      text: "Priority 3",
      value: 3,
      label: { color: "blue", empty: true, circular: true },
    },
    {
      key: "UnImportant",
      text: "Priority 4",
      value: 4,
      label: { color: "", empty: true, circular: true },
    },
  ];
  const searchRef = useRef();
  useEffect(() => {
    axios
      .get("http://localhost:4000/labels", {
        headers: {
          authorization: user.jwt,
        },
      })
      .then((data) => {
        let labels = data.data;
        let tmp = labels.map((item, index) => {
          console.log(item.color);
          return {
            key: index,
            text: item.label_name,
            value: item.label_id,
            label: { color: item.color, empty: true, circular: true },
          };
        });
        setLabelList(tmp);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:4000/filters", {
        headers: {
          authorization: user.jwt,
        },
      })
      .then((data) => {
        let filters = data.data;
        let tmp = filters.map((item, index) => {
          return {
            key: index,
            text: item.filter_name,
            value: item.filter_id,
            label: { color: item.color, empty: true, circular: true },
          };
        });
        setFilterList(tmp);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:4000/upcoming-tasks", {
        headers: {
          authorization: user.jwt,
        },
      })
      .then((res) => {
        let dataRaw = res.data;
        let data = dataRaw.map((item) => {
          return {
            id: item.task_id,
            title: item.task_name,
            description: item.description,
            priority_id: item.priority_id,
            label_id: item.label_id,
            filter_id: item.filter_id,
            dueDate: item.due_date,
            completed: item.is_finished !== 0,
          };
        });
        setTodos(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isP, reset]);
  const search = () => {
    axios
      .get("http://localhost:4000/upcoming-tasks", {
        headers: {
          authorization: user.jwt,
        },
      })
      .then((res) => {
        let dataRaw = res.data;
        let data = dataRaw.map((item) => {
          return {
            id: item.task_id,
            title: item.task_name,
            description: item.description,
            priority_id: item.priority_id,
            label_id: item.label_id,
            filter_id: item.filter_id,
            dueDate: item.due_date,
            completed: item.is_finished !== 0,
          };
        });
        console.log(searchRef.current.value);
        let newTodos = data.filter((item) => {
          console.log(item);
          console.log(searchRef.current.value);
          console.log(task);

          return (
            item.title.includes(searchRef.current.value) &&
            (task.priority === undefined ||
              task.priority === "" ||
              item.priority_id === task.priority) &&
            (task.label === undefined ||
              task.label === "" ||
              item.label_id === task.label) &&
            (task.filter === undefined ||
              task.filter === "" ||
              item.filter_id === task.filter)
          );
        });
        setTodos(newTodos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" flex flex-col w-[78vw]">
      <div className="flex items-center">
        <input
          className=" basis-8/12"
          ref={searchRef}
          style={{
            border: "1px solid gray",
            borderRadius: "5px",
            padding: "10px",
          }}
          type="text"
          placeholder="Search task name"
        />

        <Dropdown
          style={{ maxWidth: "30px" }}
          className="ml-4"
          clearable
          placeholder="Choose priority"
          options={lvOptions}
          selection
          onChange={(e, data) => setTask({ ...task, priority: data.value })}
        />
        <Dropdown
          style={{ width: "30px" }}
          className="ml-4"
          clearable
          placeholder="Choose Label"
          options={labelList}
          selection
          onChange={(e, data) => setTask({ ...task, label: data.value })}
        />
        <Dropdown
          style={{ width: "30px" }}
          className="ml-4"
          clearable
          placeholder="Choose filter"
          options={filterList}
          selection
          onChange={(e, data) => setTask({ ...task, filter: data.value })}
        />
        <button
          className="ui button font-semibold"
          onClick={search}
          style={{
            background: "blue",
            color: "white",
            display: "inline",
            marginLeft: "10px",
          }}
        >
          {" "}
          Search{" "}
        </button>
      </div>
      <div className="result  basis-1/12" style={{ marginTop: "50px" }}>
        {todos.length == 0 ? (
          <p
            style={{
              textAlign: "center",
              fontSize: "20px",
              width: "500px",
              color: "gray",
            }}
          >
            NOT FOUND
          </p>
        ) : (
          <TodosList
            todos={todos}
            setTodos={setTodos}
            editTodo={() => {}}
            setEditTodo={() => {}}
            setReset={setReset}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
