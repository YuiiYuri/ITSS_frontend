import React, { useContext, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { PiCaretDoubleLeftBold } from "react-icons/pi";
import { PiCaretDoubleRightBold } from "react-icons/pi";
import { PiCalendarBlankBold } from "react-icons/pi";
import { IoIosFlag } from "react-icons/io";
import axios from "axios";
import { UserContext } from "../../UserContext";
import Addtask from "../popup/AddTaskForm";
const localizer = momentLocalizer(moment);
//   { title: "Task 1", start: new Date(2023, 10, 20), priority: "1" },
const Upcomming = ({isP}) => {
  const [tasks, setTasks] = useState([]);
  const user = useContext(UserContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [date, setDate] = useState(null);
  useEffect(()=>{
    axios.get("http://localhost:4000/all-tasks", {
      headers: {
        authorization: user.jwt
      }
    }).then((res)=>{
      let dataRaw = res.data;
      let data = dataRaw.map((item)=>{
        let date = new Date(item.due_date);
        return{
          id: item.task_id,
          title: item.task_name,
          description: item.description,
          start: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          priority: item.priority_id,
          label: item.label_id,
          completed: item.is_finished,
        }
      })
      setTasks(data);
    }).catch((err)=>{
      console.log(err);
    })
  },[isP, isPopupOpen]);
  const CustomToolbar = (toolbar) => {
    const goToBack = () => {
      toolbar.onNavigate("PREV");
    };

    const goToNext = () => {
      toolbar.onNavigate("NEXT");
    };

    const goToWeek = () => {
      toolbar.onNavigate("DAY");
    };

    return (
      <div className="flex justify-between mb-3 text-red-500">
        <button onClick={goToBack} className="flex items-center">
          <PiCaretDoubleLeftBold color="#a9a9a9" />
          <p className="text-[14px] text-gray-400 ml-1 pb-[2px] font-2">Back</p>
        </button>
        <div className="flex items-center cursor-pointer" onClick={goToWeek}>
          <PiCalendarBlankBold style={{ fontSize: "24px" }} />
          <p className="font-semibold ml-1 pb-[2px] text-[24px]">{toolbar.label}</p>
        </div>
        <button onClick={goToNext} className="flex items-center">
          <p className="text-[14px] text-gray-400 mr-1 mb-0 font-2">Next</p>
          <PiCaretDoubleRightBold color="#a9a9a9" />
        </button>
      </div>
    );
  };

  const events = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    start: task.start,
    end: moment(task.start).add(1, "days").toDate(), // Set end date as one day after start for clarity
    priority: task.priority,
    type: "data",
    completed: task.completed,
  }));
  const now = new Date(Date.now())
  const currentYear = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  for(var i=-175; i < 175; i++){
    events.push({
      start: moment(currentYear).add(i, "days").toDate(),
      end: moment(currentYear).add(i+1, "days").toDate(),
      type: "add",
    })
  }

  const EventComponent = ({ event }) => {
    let priorityColor = "";
    switch (event.priority) {
      case 1:
        priorityColor = "text-red-500"; // Class for priority 1
        break;
      case 2:
        priorityColor = "text-orange-500"; // Class for priority 2
        break;
      case "3":
        priorityColor = "text-blue-500"; // Class for priority 3
        break;
      // default:
      //   priorityColor = "text-gray-500"; // Default color
      //   break;
    }

    const today = moment().add(-1, "days");

    // const tasksCount = countTasksPerDay(tasks, event.start);
    if(event.type === "data"){
      return (
        <div className={event.start < today || event.completed === 1 ? "hidden-event" : ""}>
          <div className="flex mb-2">
            { event.completed === 1? <input type="radio" checked/> : <input type="radio"/>}
            
            <p className="p-1 text-[14px]">{event.title}</p>
          </div>
          <div
            className={
              event.start < today
                ? "hidden-event flex items-center text-[12px] font-medium py-1"
                : `flex items-center text-[12px] font-medium py-1 ${priorityColor}`
            }
          >
            <IoIosFlag color={`${priorityColor}`} />
            <p>Priority {event.priority}</p>
          </div>
        </div>
      );
    }else{
      return(
        <div className="flex items-center justify-center font-semibold" onClick={()=>{setDate(event.start);setIsPopupOpen(true)}}><span style={{color: "red"}}>+</span>{"   "}<span style={{color:"red"}}> Add Task</span></div>
      )
    }
  };

  const countTasksPerDay = (tasks, date) => {
    return tasks.filter((task) => {
      return moment(task.start).isSame(date, "day");
    }).length;
  };

  const dayPropGetter = (date) => {
    const tasksCount = countTasksPerDay(tasks, date);
    return {
      className: tasksCount > 0 ? "has-tasks" : "", // Thêm class 'has-tasks' nếu có tasks
      // Thêm bất kỳ thuộc tính nào khác bạn muốn cho ngày
      
    };
  };

  return (
    <div>
      <style>
        {`
          * {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen","Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",sans-serif;
          }
          .rbc-header {
            font-weight: 600;
            border: none !important;
            padding: 10px 0; 
            border-bottom: 2px solid #a9a9a9  !important;
            margin: 0 4px;
            font-size: 16px;
          }
          .rbc-row-content {
            margin-top: 5px;
          }
          .rbc-event {
            background-color: #ffffff !important;
            margin-top: 8px;
            color: #000000 !important;
            border: 1px solid #a9a9a9 !important;
          }
          .rbc-today {
            color: red;
          }
          .rbc-day-bg {
            border: none !important;
            margin: 0 4px;
          }
          .rbc-row-segment {
            padding : 0 4px;
          }
          .rbc-time-view, .rbc-row-segment , .rbc-row{
            border: none !important;
          }
          .rbc-time-header-content, .rbc-time-header {
            border-left: none;
          }
          .rbc-events-container, .rbc-row {
            border: none !important;
          }
          {/* .rbc-time-header-content > .rbc-time-gutter > * {
            display: none !important;
          } */}
          .rbc-time-header-gutter > :first-child {
            display: none !important;
          }
          .rbc-allday-cell {
            border: none !important;
          }
          div.rbc-time-slot, .rbc-label , .rbc-timeslot-group, .rbc-time-content, .rbc-current-time-indicator {
            display: none !important;
          }
        `}
      </style>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        nowIndicator={false}
        components={{
          toolbar: CustomToolbar,
          // day: DayColumn,
          event: EventComponent,
          agenda: () => null,
          month: () => null,
          day: () => null,
          timeGutterHeader: () => null,
          
        }}
        
        style={{ height: "auto", width: "78vw" }}
        eventPropGetter={(event, start, end, isSelected) => {
          let newStyle = {
            borderRadius: "5px",
            border: "none",
            color: "white",
            // Thêm các thuộc tính khác tùy ý
          };
          return { style: newStyle };
        }}
        dayPropGetter={dayPropGetter}
      />
    {isPopupOpen === true? <Addtask setPopupOpen={setIsPopupOpen} date={date}></Addtask>: <></>}
    </div>
  );
};

export default Upcomming;
