import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
function PopupDescription({task, back}) {
    const user = useContext(UserContext);
    let date = new Date(task.dueDate);
    let dueDate = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    const [label, setLabel] = useState(null);
    const [filter, setFilter] = useState(null);
    useEffect(()=>{
        if (task.label_id != null) {
            axios.get("http://localhost:4000/label/" + task.label_id,{
                headers: {
                    authorization: user.jwt
                }
            }).then((data)=>{
                setLabel({name: data.data[0].label_name, color: data.data[0].color})
            }).catch((err)=>{
                console.log(err);
            })
        }
        if (task.filter_id != null) {
            axios.get("http://localhost:4000/filter/" + task.filter_id,{
                headers: {
                    authorization: user.jwt
                }
            }).then((data)=>{
                setFilter({name: data.data[0].filter_name, color: data.data[0].color})
            }).catch((err)=>{
                console.log(err);
            })
        }
    },[])
    const popupContainer ={
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFF',
        zIndex: 1000,
        padding: '10px',
        borderRadius: '12px',
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 4px',
        width: "600px",
        height: "500px",
        padding: "0",
        
    }
    const popupBackground = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1000
      }
    return ( 
        <div style={popupBackground}>
            <div style={popupContainer}>
            <div style={{display: "flex"}}>
            <button className="ui button" style={{position:"absolute", top: "10px", left: "10px", color: "blue", border:"1px solid #d9d9d9"}} onClick={()=>{back()}}>Back</button>
                    <div style={{width: "400px", height: "500px", borderRight: "2px solid gray", padding: "40px 30px 30px 30px"}}>
                        <h2 className="text-[24px] mt-[20px] pt-[20px]">{task.title}</h2>
                        <p>{task.description}</p>
                    </div>
                    <div style={{marginTop: 0, width: "200px", background: "#d9d9d9", borderRadius: "0px 12px 12px 0px", padding: "40px 20px 20px 20px"}}>
                        <span style={{fontWeight:"bold", color: "blue"}}>Due date</span>
                        <p className="mt-[4px]">{dueDate}</p>
                        <span style={{fontWeight: "bold", color: "blue"}}>Priority</span>
                        <p className="mt-[4px]">{"Priority "+ task.priority_id}</p>
                        <span style={{fontWeight: "bold", color: "blue"}}>Label</span>
                        {label==null? <p className="mt-[4px]">Không có Label</p>:<p className="mt-[4px]" style={{color: label.color}}>{label.name}</p> }
                        <span style={{fontWeight: "bold", color: "blue"}}>Filter</span>
                        {filter == null ?<p className="mt-[4px]">Không có filter</p>:<p className="mt-[4px]" style={{color: filter.color}}>{filter.name}</p> }
                    </div>
                </div> 
            </div>
        </div>
     );
}

export default PopupDescription;