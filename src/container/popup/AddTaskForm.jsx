import React,{useContext, useEffect, useRef, useState} from 'react';
import { Button,Form, Dropdown } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { UserContext } from '../../UserContext';
import axios from 'axios';
const Addtask = ({setPopupOpen, date}) => {
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
                console.log(item.color);
                return {
                    key: index,
                    text: item.label_name,
                    value: item.label_id,
                    label: { color: item.color, empty: true, circular: true},
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
                    label: { color: item.color, empty: true, circular: true},
                }
            })
            setFilterList(tmp);
        }).catch((err)=>{
            console.log(err);
        })
      },[]);

    const popupContainer ={
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '500px',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFF',
        zIndex: 1000,
        padding: '20px',
        borderRadius: '12px',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        
    }
    
    const popupBackground = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, .7)',
        zIndex: 1000
      }
    
      const [task, setTask] = useState({name: '', des: '', priority: 1, label: null, filter: null, time: date || null});

      const addNewTask = () =>{
        let today;
        if(task.time === null){
            today = new Date();
        }else{
            today = new Date(task.time);
        }
        axios.put("http://localhost:4000/task",{
            task_name: task.name,
            description: task.des,
            due_date: today.getFullYear().toString() + "-"+(today.getMonth()+1).toString()+"-"+today.getDate().toString()+" "+ today.getHours().toString()+":"+today.getMinutes().toString()+":"+today.getSeconds().toString(),
            priority_id: task.priority,
            label_id: task.label || null,
            filter_id: task.filter || null,
        }, {
            headers: {
                authorization: user.jwt
              },
        }).then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            console.log(err);
        })    
        setPopupOpen(false);
      }

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
    const [selectedDate, setSelectedDate] = useState(date? new Date(date) : new Date());

  return (
    <div style={popupBackground}>
        <div style={popupContainer}> 
        <div className="flex justify-between mb-5">
            <div className="flex items-center text-center gap-2">
                <h3 style={{color: '#6F6F6F'}}> Add new task </h3>
            </div>
            <div className="flex items-center text-center gap-2">
                <Button className='ui button ' color='red' onClick={() => {setPopupOpen(false);}}>X</Button>
            </div>
        </div>
        
        <Form >
            <div className='mb-5'>
            <div className="flex items-center text-center gap-2">
                <h4 > Task name </h4>
            </div>
            <Form.Input 
                type="text" 
                placeholder="Task name" 
                name="name"
                value={task.name}
                required
                onChange={(e) => setTask({...task,name: e.target.value})}
            />
            </div>
            <div className='mb-5'>
            <div className="flex items-center text-center gap-2">
                <h4 > Desciption </h4>
            </div>
            <Form.Input 
                type="text" 
                placeholder="Description" 
                name='des'
                value={task.des}
                required
                onChange={(e) => setTask({...task, des: e.target.value})}
            />
            </div> 

            <div className='flex justify-between mb-5'>
            <div className="flex items-center text-center ">
                <h4 > Priority </h4>
            </div>
            <Dropdown 
                style={{ width: '80%' }}
                className="ml-10"
                clearable 
                placeholder='Choose priority'
                options={lvOptions}
                defaultValue={lvOptions[0].value}  
                selection   
                onChange={(e, data) => setTask({...task, priority: data.value})}
            />
            </div>

            <div className='flex justify-between mb-5'>
            <div className="flex items-center text-center gap-2">
                <h4 > Label </h4>
            </div>
            <Dropdown 
                style={{ width: '80%' }}
                className="ml-10"
                clearable 
                placeholder='Choose Label'
                options={labelList} 
                selection   
                onChange={(e, data) => setTask({...task, label: data.value})}
            />
            </div>

            <div className='flex justify-between mb-5'>
            <div className="flex items-center text-center gap-2">
                <h4 > Filter </h4>
            </div>
            <Dropdown 
                style={{ width: '80%' }}
                className="ml-10"
                clearable 
                placeholder='Choose filter'
                options={filterList} 
                selection   
                onChange={(e, data) => setTask({...task, filter: data.value})}
            />
            </div>
            
            <div className='flex  mb-5'>
            <div className="flex items-center text-center gap-2 mr-10">
                <h4 className='mr-10' > Time </h4>
            </div>
            <DatePicker
                toggleCalendarOnIconClick
                selected={selectedDate}
                dateFormat="dd/MM/yyyy"
                style={{ width: '80%'}}
                onChange={(date) => {
                    setSelectedDate(date);
                    setTask({ ...task, time: date });
                  }}
            />
            </div> 

            <div className='flex flex-row mt-5'>
            <Button className="ui button " style ={{ width: '50%' }} color="gray" onClick={() => {setPopupOpen(false)}}>Cancel</Button>
            <Button className="ui button " style ={{ width: '50%' }} color="red" onClick={() => addNewTask()} >Add</Button>
            </div>

        </Form>
        
        
      </div>
    </div>
  );
};

export default Addtask;
