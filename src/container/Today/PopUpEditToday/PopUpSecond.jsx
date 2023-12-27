import React ,{useState}from 'react'
import { Button} from 'semantic-ui-react';
import { PiArmchairThin } from "react-icons/pi";
import { IoSunnyOutline, IoCalendarOutline,  IoBanOutline } from "react-icons/io5";
import { MdNextWeek } from "react-icons/md";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ReturnDate {
    date: string;
  }
  
export const useDate = (): ReturnDate => {
    const locale = 'en';
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

  
    const day = today.toLocaleDateString(locale, { weekday: 'long' });
    const dayTomorrow = tomorrow.toLocaleDateString(locale, { weekday: 'long' });
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;
  
    const dateNextWeek = `${day}, ${nextWeek.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;
  
    return {date,day,dayTomorrow,dateNextWeek};
  };

const PopUpSecond = ({popup2,setPopup2}) => {
    const popupContainer2 ={
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFF',
        zIndex: 1000,
        padding: '10px',
        borderRadius: '12px',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        

    }
    
    const popupBackground2 = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, .7)',
        zIndex: 1000
      }

    
    const {date,day,dayTomorrow,dateNextWeek} = useDate();

    const [startDate, setStartDate] = useState(new Date())

    return (
    <div style={popupBackground2}>
        <div style={popupContainer2}>
            <div className='flex flex-col  bg-ct-sidebar-bg rounded p-2' >
                <div className="flex justify-between">
                    <div className="flex items-center text-center gap-2">
                        <span style={{color: '#6F6F6F'}}> {date} </span>
                    </div>
                    <div className="flex items-center text-center gap-2">
                        <Button className='ui button ' color='red' onClick={() => {setPopup2(false);}}>X</Button>
                    </div>
                </div>
                <hr className='mt-2 mb-2'/>
                <div className="flex justify-between">
                    <div className="flex items-center text-center gap-2">
                        <button>
                            <IoCalendarOutline className='p-1' size={30} color='green' />
                            
                        </button>
                    </div>
                    <div className="flex items-center text-center gap-2 mr-auto">
                        <p style={{ color: 'green', fontSize: '11px' }}>Today</p>
                    </div>
                    <div className="flex items-center text-center gap-2">
                        <span style={{color: '#6F6F6F', fontSize: '8px'}}> {day} </span>
                    </div>
                </div>  
                <div className="flex justify-between">
                    <div className="flex items-center text-center gap-2">
                        <button>
                        <IoSunnyOutline className='p-1 ' size={40} color='yellow'/>
                        </button>
                    </div>
                    <div className="flex items-center text-center gap-2 mr-auto">
                        <p style={{ color: 'yellow', fontSize: '11px' }}>Tomorrow</p>
                    </div>
                    <div className="flex items-center text-center gap-2">
                        <span style={{color: '#6F6F6F',fontSize: '8px'}}> {dayTomorrow} </span>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center text-center gap-2">
                        <button>
                        <PiArmchairThin className='p-1 ' size={40} color='blue'/>
                        </button>
                    </div>
                    <div className="flex items-center text-center gap-2 mr-auto">
                        <p style={{ color: 'blue', fontSize: '11px' }}>This Weekend</p>
                    </div>
                    <div className="flex items-center text-center gap-2">
                        <span style={{color: '#6F6F6F',fontSize: '8px'}}> Saturday </span>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center text-center gap-2">
                        <button>
                        <MdNextWeek className='p-1 ' size={40} color='purple'/>
                        </button>
                    </div>
                    <div className="flex items-center text-center gap-2 mr-auto">
                        <p style={{ color: 'purple', fontSize: '11px' }}>Next Week</p>
                    </div>
                    <div className="flex items-center text-center gap-2">
                        <span style={{color: '#6F6F6F',fontSize: '8px'}}> {dateNextWeek} </span>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center text-center gap-2">
                        <button>
                        <IoBanOutline className='p-1 ' size={40} color='black'/>
                        </button>
                    </div>
                    <div className="flex items-center text-center gap-2 mr-auto">
                        <p style={{ color: 'Black', fontSize: '11px' }}>No Date</p>
                    </div>
                    <div className="flex items-center text-center gap-2">
                        
                    </div>
                </div>
                <hr className='mt-2 mb-2'/>
                <div>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        inline
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default PopUpSecond