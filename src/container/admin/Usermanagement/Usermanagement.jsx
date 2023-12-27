import React, {useEffect, useRef, useState} from "react";
import SearchBar from "./ComSearchBar/SearchBar";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Button, Form, Header } from "semantic-ui-react";
import { FaPlus } from "react-icons/fa6";
import { UserContext } from "../../../UserContext";
import { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
const Usermanagement = () => {
  const [userdata, setUserdata] = useState([]);
  const [userVisible, setUserVisible] = useState([]);
  const user = useContext(UserContext);
  useEffect(()=>{
    axios.get("http://localhost:4000/admin/all-tasks",{
      headers: {
        authorization: user.jwt
      }
    }).then((res)=>{
      let dataRaw = res.data;
      let data = [];
      while(dataRaw.length != 0){
        let dataItem = {
          username: dataRaw[0].user_name,
          todoList: [],
        };
        for (let i = 0; i < dataRaw.length; i++) {
          const element = dataRaw[i];
          if (dataItem.username === element.user_name) {
            dataItem.todoList.push(element);
            dataRaw.splice(i, 1);
            i = i-1;
          }
        }
        data.push(dataItem);
        const userList = data.map((item)=>{
          return {
            name: item.username,
            task: item.todoList.length,
          }
        })
        setUserdata(userList);
        setUserVisible(userList);
      }
    }).catch((err)=>{
      console.log(err);
    })
  },[])


  const deleteUser = (index) => {
    const newusers = userdata.filter((x,i) => {return i !== index});
    setUserdata(newusers);
  }

  const searchBarStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px'
    
  };

  const inputStyle = {
    width: '100%',
    padding: '5px',
    color: 'black', 
    border: 'none',
    outline: 'none'
  };

  const iconStyle = {
    marginRight: '5px', // Adjust the margin as needed
  };
  const inputRef = useRef();
  const handleSearch = () => {
    let data = userdata.filter((item)=>{
      return item.name.includes(inputRef.current.value);
    })
    setUserVisible(data);
  };
  return (
    
    <div >
      <div style={searchBarStyle}>
      <FaSearch id="search-icon" style={iconStyle} />
      <input
        type="text"
        placeholder="Search..."
        icon="search"
        ref = {inputRef}
        onChange={handleSearch}
        style={inputStyle}
      />
      </div>
      <hr/>
      
      <div className="flex flex-col w-[78vw] h-fit rounded px-3 pl-3 p-2">
          {userVisible.length > 0 && userVisible.map((user,index) => (
            <div key={index} className="flex items-center p-[10px] border-solid border-gray-300 border-b-[1px]">
              <div className='grow h-15 border-none'>
                <span>
                <h3>{user.name}</h3>
                {user.task} tasks
                </span>
              </div>
              <div className='flex-none'>   
                <button style={{background: "blue", color:"white", marginLeft:"5px"}} className='ui button' color="red"><span>View</span></button>
                <button style={{marginLeft:"5px", background: "red", color: "white"}} className='ui button' color="blue"><span>Edit</span></button>
                <button style={{marginLeft:"5px", background: "green", color:"white"}} className='ui button' color="gray"><span>Delete</span></button>           
              </div> 
              {/* <hr className="mt-[1px]"/> */}
            </div>    
          ))}
          
      </div>
    </div>
  );
};

export default Usermanagement;
