import React, { useEffect, useLayoutEffect, useState } from "react";
import Sidebar from "../../layout/Sidebar/Sidebar";
import Main from "../../layout/Main/Main";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
const TopPage = () => {
  const [tab, setTab] = useState("today");
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);
  useEffect(()=>{
    if (user.jwt === "") {
      navigate("/login");
    }
    if (user.role == "admin") {
      setTab("searchForAdmin");
    }
  },[user])
    console.log("top page reset");

  return (
    <div className="flex gap-4">
      <Sidebar className="w-1/5" tab={tab} setTab={setTab} isPopupOpen={isPopupOpen} setPopupOpen={(arg)=>{setPopupOpen(arg)}} />
      <Main className="w-4/5 text-blue-400" tab={tab} isPopupOpen={isPopupOpen}/>
    </div> 
  );
};

export default TopPage;
