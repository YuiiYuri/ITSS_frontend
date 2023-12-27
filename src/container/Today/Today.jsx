import React, { useContext, useEffect, useState } from "react";
import { CiCircleList } from "react-icons/ci";
import { Header} from "semantic-ui-react";
import TodosList from "./TodosList";
import TodoForm from "./TodoForm";
import { UserContext } from "../../UserContext";
import axios from "axios";
export const useDate = () => {
  
  const locale = 'en';
  const today = new Date();

  const day = today.toLocaleDateString(locale, { weekday: 'long' });
  const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;

  return {date};
};




const Today = ({isP}) => {
  const {date} = useDate();
  const user = useContext(UserContext);
  const[input, setInput]=useState("");
  const[todos, setTodos]=useState([]);
  const [reset, setReset] = useState({})
  console.log(reset);
  useEffect(()=>{
    axios.get("http://localhost:4000/today-tasks", {
      headers: {
        authorization: user.jwt
      }
    }).then((res)=>{
      let dataRaw = res.data;
      let data = dataRaw.map((item)=>{
        return {
          id: item.task_id,
          title: item.task_name,
          description: item.description,
          label_id: item.label_id,
          filter_id: item.filter_id,
          priority_id: item.priority_id,
          completed: item.is_finished,
          dueDate: item.due_date,
        }
      })
      setTodos(data);
    }).catch((err)=>{
      console.log(err)
    });
  },[isP, reset]);


  return (
  <div>
    <Header className="flex flex-col w-[78vw] h-[10vh] rounded p-10" >
      <div className="flex justify-between">
        <div class="">
          <strong className="font-lagre text-[26px] p-3"> Today </strong> 
          <span style={{color: '#6F6F6F', fontSize:'14px'}}> {date} </span>
        </div>

        <div>
        </div>

        <div className="flex items-center text-center gap-2">
          <CiCircleList className="font-light text-xl "  color="#6F6F6F" />
          <p className=" font-light text-xl " style={{color: '#6F6F6F',fontSize:'14px'}}>View</p>
        </div>
      </div>
    </Header>
    <hr/>
    
      
    <div className="flex flex-col w-[78vw] h-fit  rounded pl-10 p-2">
      <div>
        <TodosList 
          todos={todos}
          setTodos={setTodos}
          setReset = {setReset}
        />
      </div>
    </div>
    <hr />
    <div className="flex flex-col w-[78vw] h-fit  rounded p-2">  
      <div className="border-[1px] rounded border-solid border-gray-200 mt-1 p-4">
      <h3>Add new task</h3>
        <TodoForm 
          input={input}
          setInput={setInput}
          todos={todos}
          setTodos={setTodos}
        />
      </div>
    </div>
  </div>
  );
};

export default Today;
