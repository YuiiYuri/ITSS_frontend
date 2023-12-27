import React, {useState} from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { PiArmchairThin } from "react-icons/pi";
import { IoSunnyOutline, IoCalendarOutline, IoExtensionPuzzleOutline, IoBanOutline, IoFlag, IoFlagOutline, IoOptionsOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { MdNextWeek } from "react-icons/md";
import PopUpSecond from './PopUpSecond';





const PopUpFirst = ({setPopup1}) => {
    const popupContainer ={
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
    
    const popupBackground = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, .7)',
        zIndex: 1000
      }


    const [popup2, setPopup2] = useState(false);

  return (
    <div style={popupBackground}>
        <div style={popupContainer}> 
            <div className='flex flex-col  bg-ct-sidebar-bg rounded p-2' >
                <div className="flex justify-between">
                    <div className="flex items-center text-center gap-2">
                        <Button icon labelPosition='left'>
                            <Icon name='edit' />
                            Edit Task
                        </Button>
                    </div>
                    <div className="flex items-center text-center gap-2">
                        <Button className='ui button ' color='red' onClick={() => {setPopup1(false);}}>X</Button>
                    </div>
                </div>
                <hr className='mt-2 mb-2'/>
                <p>Due Today</p>
                <div className='flex flex-row items-center' >
                    <button>
                        <IoCalendarOutline className='p-1' size={40} color='green' />
                    </button>
                    <button>
                        <IoSunnyOutline className='p-1 ' size={40} color='yellow'/>
                    </button>
                    <button>
                        <PiArmchairThin className='p-1 ' size={40} color='blue'/>
                    </button>
                    <button>
                        <MdNextWeek className='p-1 ' size={40} color='purple'/>
                    </button>
                    <button>
                        <IoBanOutline className='p-1 ' size={40} color='black'/>
                    </button>
                    <button className='item' onClick={() => {setPopup2(true);}}>
                        <IoIosMore  className='p-1 ' size={40} color='black'/> 
                    </button>
                    {popup2 && <PopUpSecond setPopup2={setPopup2}  /> }  
                 </div>
                <hr className='mt-2 mb-2'/>
                <p>Priority</p>
                 <div className='flex flex-row items-center' >
                    <button>
                        <IoFlag  className='p-1' size={40} color='red' />
                    </button>
                    <button>
                        <IoFlag   className='p-1 ' size={40} color='yellow'/>
                    </button>
                    <button>
                        <IoFlag  className='p-1 ' size={40} color='blue'/>
                    </button>
                    <button >
                        <IoFlagOutline className='p-1 ' size={40} color='black'/>
                    </button>
                </div>
                <hr className='mt-2 mb-2'/>
                <div className='flex flex-col items-center' >
                    <button className='flex items-center'>
                        <IoOptionsOutline  className='p-1 ' size={40} color='black' />
                        <p className='mr-40 text-[13px]' >Add filter</p>
                    </button>
                    <button className='flex items-center'>
                        <IoExtensionPuzzleOutline   className='p-1 ' size={40} color='black'/>
                        <p className='mr-40 text-[13px]' >Add label</p>
                    </button>
                </div>
                <hr className='mt-2 mb-2'/>
                <div className="flex justify-between">
                    <Button icon labelPosition='left' color='red'>
                        <Icon name='delete' />
                            Delete Task
                    </Button>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default PopUpFirst