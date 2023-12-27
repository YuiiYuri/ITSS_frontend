import React,{useEffect, useState, useContext, useRef} from "react";
import Modal from "react-responsive-modal";
import { Header, Button, Form } from "semantic-ui-react";
import { IoIosArrowDown } from "react-icons/io";
import { SketchPicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { UserContext } from "../../UserContext";
import { Dropdown } from 'semantic-ui-react';


const Filter = () => {
  const user = useContext(UserContext);
  const [isPopupFilters, setPopupFilters] = useState(false);
  const [fdata, setFdata] = useState([]);
  const colorRef = useRef();

  useEffect(()=>{
    axios.get("http://localhost:4000/filters",{
      headers: {
        authorization: user.jwt
      }}).then((data)=>{
        let tmp = data.data;
        let tmp1 = tmp.map((item)=>{
          return {
            name: item.filter_name,
            color: item.color
          }
        })
        setFdata(tmp1);
      })
  },[])
  
  const colors = ["red","orange","yellow","olive","green","teal","blue","violet","purple","pink","brown","grey","black"];
  const colorList = colors.map((item, index)=>{
    return {
      key: index,
      text: item,
      value: item,
      label: { color: item, empty: true, circular: true},
    }
  })

  const togglePopupFilters = () => {
    setPopupFilters(!isPopupFilters);
  }


  const [isPopupLabels, setPopupLabels] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [label, setLabel] = useState({ name: '', query: '', color: '#ffffff' });
  const [labels, setLabels] = useState([]);
  const [editLabelIndex, setEditLabelIndex] = useState(null);
  useEffect(()=>{
    axios.get("http://localhost:4000/labels",{
      headers: {
        authorization: user.jwt
      }}).then((data)=>{
        let tmp = data.data;
        let tmp1 = tmp.map((item)=>{
          return {
            id: item.label_id,
            name: item.label_name,
            color: item.color
          }
        })
        setLabels(tmp1);
      })
  },[])

  const togglePopupLabels = () => {
    setPopupLabels(!isPopupLabels);
  }


  const onOpenModalLabels = () => {
    setModalOpen(true);
  };

  const onCloseModalLabels = () => {
    setModalOpen(false);
  };

  const handleColorChange = (color) => {
    setLabel((prevLabel) => ({ ...prevLabel, color: color }));
  };

  const addLabel = () => {
    axios.put("http://localhost:4000/label", {
      label_name: label.name,
      color: label.color || "black",
    },{      
      headers: {
      authorization: user.jwt
    }}).then((data)=>{
        if(data.data === "Created label successfully"){
          axios.get("http://localhost:4000/labels",{
            headers: {
              authorization: user.jwt
            }}).then((data)=>{
              let tmp = data.data;
              let tmp1 = tmp.map((item)=>{
                return {
                  id: item.label_id,
                  name: item.label_name,
                  color: item.color
                }
              })
              setLabels(tmp1);
            })
        }
      }).catch((err)=>{
        console.log(err);
      })
    
    setLabel({ name: '', query: '', color: '#ffffff' });
    onCloseModalLabels();
  };


  const updateLabel = () => {
    const updatedLabels = labels.map((l, i) => (i === editLabelIndex ? label : l));
    setLabels(updatedLabels);
    setLabel({ name: '', query: '', color: '#ffffff' });
    setEditLabelIndex(null);
    onCloseModalLabels();
  };

  const deleteLabel = (index) => {
    const updatedLabels = labels.filter((_, i) => i !== index);
    console.log(index+1);
    axios.delete("http://localhost:4000/label/"+(index), {
      headers: {
        authorization: user.jwt
      }
    }).then((res)=>{
      axios.get("http://localhost:4000/labels",{
        headers: {
          authorization: user.jwt
        }}).then((data)=>{
          let tmp = data.data;
          let tmp1 = tmp.map((item)=>{
            return {
              id: item.label_id,
              name: item.label_name,
              color: item.color
            }
          })
          setLabels(tmp1);
        })
    }).catch((err)=>console.log(err));
  };

  const editLabel = (index) => {
    setLabel(labels[index]);
    setEditLabelIndex(index);
    onOpenModalLabels();
  };

  return (
    <div>
      <Header className="flex flex-col w-[80vw] h-[10vh] rounded p-10" >
        <div className="flex justify-between">
          <div class="">
            <strong className="font-lagre text-[26px] p-3"> Filters & Labels </strong> 
          </div>
        </div>
      </Header>
      <hr/>
      
        
      <div className="flex flex-col w-[80vw] h-fit  rounded pl-10 p-2">
        <div className="flex items-center text-center gap-2"
             onClick={togglePopupFilters}>
        <IoIosArrowDown className="font-light text-xl "  color="#6F6F6F" />
        <span className="font-bold text-2xl" >Filters</span>
        </div>
        {isPopupFilters && (
          <div className="flex flex-col w-[75vw] h-fit  rounded pl-5 p-2">
          {fdata.length > 0 && fdata.map((f,index) => (
            <div key={index} className="flex mt-2">
              <div className='grow h-15'>
                <hr className="mb-2" />
                <span style={{color: f.color}} className="flex items-center text-center">
                <FontAwesomeIcon icon={faTag} className="mr-2" />
                <p className="font-bold text-l">{f.name}</p>
                </span>
              </div>

            </div>
          ))}
      </div>
      
        )}
      </div>
      <hr />



      <div className="flex flex-col w-[80vw] h-fit  rounded pl-10 p-2">  
        <div className="flex items-center text-center gap-2"
             onClick={togglePopupLabels}>
        
        <IoIosArrowDown className="font-light text-xl "  color="#6F6F6F" />
        <span className="font-bold text-2xl" >Labels</span>
        
        <div className='flex ml-auto '>   
          <Button className='ui button' color="White" onClick={onOpenModalLabels} ><span>+</span></Button>     
        </div> 

        </div>
        {isPopupLabels && (
          <div className="flex flex-col w-[75vw] h-fit  rounded pl-5 p-2">
            {labels.length > 0 && labels.map((l,index) => (
            <div key={index} className="flex mt-2">
              <div className='grow h-15'>
                <hr className="mb-2" />
                <span className="flex items-center text-center">
                <FontAwesomeIcon icon={faTint} className="mr-2" /> 
                <p className="font-bold text-l" style={{color: l.color}}>{l.name} </p>
                </span>
              </div>
              <div className='flex-none  h-15'>   
                <Button className='ui button' color="red" onClick={() => editLabel(l.id)}><span>Edit</span></Button>
                <Button className='ui button' color="gray" onClick={() => deleteLabel(l.id)}><span>Delete</span></Button>           
              </div> 
              
            </div>
            
          ))}
          
          </div>
        )}
        </div>

      <Modal open={isModalOpen} onClose={onCloseModalLabels} center>
        <h2>Add Label</h2>
        <Form>
          <label  className="font-bold text-xl">Name</label>
          <Form.Input 
            type="text" 
            placeholder="Name Label" 
            name="name"
            value={label.name}
            required
            onChange={(e) => setLabel({ ...label, name: e.target.value })}
          />

          <label className="font-bold text-xl">Color</label>
          <Dropdown 
                className="ml-10"
                clearable 
                placeholder='Choose color'
                options={colorList} 
                defaultValue={colorList[0]}
                ref={colorRef}
                selection   
                onChange={(e, data) => {handleColorChange(data.value)}}
            />
          {/* <SketchPicker presetColors={[{color: "red", title: "red"}]} color={label.color} onChange={handleColorChange} /> */}
          <div className="mt-24"></div>
          <Button className='ui button' color="red" onClick={onCloseModalLabels}>Cancel</Button>
          <Button className='ui button' color="red" onClick={editLabelIndex !== null ? updateLabel : addLabel}>{editLabelIndex !== null ? 'Update' : 'Add'}</Button>
        </Form>
      </Modal>
    </div>
    );
};

export default Filter;
