import React, { useContext, useEffect, useRef, useState } from "react";
import {v4 as uuidv4} from "uuid";
import { Form,Button,Dropdown } from 'semantic-ui-react'
import axios from "axios";
import { UserContext } from "../../UserContext";


const TodoForm = ({input,setInput,todos,setTodos}) => {
  const user = useContext(UserContext);
  const [labelList, setLabelList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:4000/labels", {
        headers:{
            authorization: user.jwt
        }
    }).then((data)=>{
        let labels = data.data;
        let tmp = labels.map((item, index)=>{
            return {
                key: index,
                text: item.label_name,
                value: item.label_id,
                color: item.color,
            }
        })
        setLabelList(tmp);
    }).catch((err)=>{
        console.log(err);
    })
    axios.get("http://localhost:4000/filters", {
        headers:{
            authorization: user.jwt
        }
    }).then((data)=>{
        let filters = data.data;
        let tmp = filters.map((item, index)=>{
            return {
                key: index,
                text: item.filter_name,
                value: item.filter_id,
                color: item.color,
            }
        })
        setFilterList(tmp);
    }).catch((err)=>{
        console.log(err);
    })
  },[]);
    const descriptionRef = useRef();
    const priorityRef = useRef();
    const labelRef = useRef();
    const filterRef = useRef();
    const onInputChange =(event) =>{setInput(event.target.value);};
    const onFormSubmit = (event) =>{
        event.preventDefault();

        let today = new Date();
        console.log(priorityRef.current);
        axios.put("http://localhost:4000/task",{
            task_name: input,
            description: descriptionRef.current.value,
            due_date: today.getFullYear().toString() + "-"+(today.getMonth()+1).toString()+"-"+today.getDate().toString()+" "+ today.getHours().toString()+":"+today.getMinutes().toString()+":"+today.getSeconds().toString(),
            priority_id: priorityRef.current.state.value,
            label_id: labelRef.current.state.value || null,
            filter_id: filterRef.current.state.value || null,
        }, {
            headers: {
                authorization: user.jwt
              },
        }).then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            console.log(err);
        })    
        setTodos([...todos,{id:uuidv4(), title:input , completed:false }]);
        setInput(""); 

                 
    };


    const lvOptions = [
        { key: 'Important',
        text: 'Priority 1',
        value: 1,
        label: { color: 'red', empty: true, circular: true},},
        { key: 'Less Important',
        text: 'Priority 2',
        value: 2,
        label: { color: 'yellow', empty: true, circular: true },},
        { key: 'Normal',
        text: 'Priority 3',
        value: 3,
        label: { color: 'blue', empty: true, circular: true },},
        { key: 'UnImportant',
        text: 'Priority 4',
        value: 4,
        label: { color: '', empty: true, circular: true },},
      ];
    
    
      return (
    
        <Form onSubmit={onFormSubmit} >
            <Form.Input 
                type="text" 
                placeholder="Task name" 
                className="task-input"
                value={input}
                required
                onChange={onInputChange}
            />
            <input 
                type="text" 
                placeholder="Description" 
                className="task-input"
                ref={descriptionRef}
            />
            <div className="flex flex-row mt-4 gap-2">
                <Dropdown 
                    className="basis-6/12"
                    clearable 
                    options={lvOptions} 
                    ref={priorityRef}
                    defaultValue={lvOptions[0].value} 
                    selection   
                />
                 <Dropdown 
                    className="basis-6/12"
                    clearable 
                    placeholder="Choose Label"
                    options={labelList} 
                    ref={labelRef}
                    selection   
                />
                 <Dropdown 
                    className="basis-6/12"
                    clearable 
                    placeholder="Choose Filter"
                    options={filterList} 
                    ref={filterRef}
                    selection   
                />
            
                <Button className="ui button basis-1/12" style={{padding:'5px'}} color="gray" >Cancel</Button>
                <Button className="ui button basis-1/12" style={{padding:'5px'}} color="red" type="submit" >Add</Button>

            </div>
           
        </Form>
    )
}

export default TodoForm