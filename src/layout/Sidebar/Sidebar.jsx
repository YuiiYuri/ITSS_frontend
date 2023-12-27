import React, { useState } from "react";
import avatar from "../../img/avatar.jpg";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { PiRectangleLight } from "react-icons/pi";
import { PiPlus } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import { FcHighPriority } from "react-icons/fc";
import { IoCalendarOutline } from "react-icons/io5";
import { TbCalendarUp } from "react-icons/tb";
import { IoGridOutline } from "react-icons/io5";
import Addtask from "../../container/popup/AddTaskForm";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import AddtaskAdmin from "../../container/popup/AddTaskFormAdmin";

const Sidebar = ({ tab, setTab, isPopupOpen, setPopupOpen }) => {
  const user = useContext(UserContext);
  console.log("side bar reset");
  if (user.role === "user") {
    return (
      <div className="flex flex-col w-[20vw] h-[100vh] bg-ct-sidebar-bg rounded p-2">
        <div className="flex justify-between">
          <div className="flex items-center text-center gap-2">
            <img
              src={avatar}
              alt="/"
              className="w-8 h-auto rounded-full border-4"
            />
            <p className="font-semibold text-lg mb-0">{user.username}</p>
            <IoIosArrowDown
              className="mt-[2px] text-xs font-extralight text-inherit"
              color="#c0c0cd"
            />
          </div>
          <div className="flex items-center text-center gap-2">
            <IoIosNotificationsOutline
              className="font-light text-xl"
              color="#c0c0cd"
            />
            <PiRectangleLight className="font-light text-xl" color="#c0c0cd" />
          </div>
        </div>
        <div
          className="flex items-center justify-center bg-ct-red rounded-sm mt-5 mb-4 cursor-pointer"
          onClick={() => {
            setPopupOpen(true);
          }}
        >
          <PiPlus className="text-sm" color="white" />
          <p className="text-white font-medium text-lg p-1">Add task</p>
        </div>
        {isPopupOpen && <Addtask setPopupOpen={setPopupOpen} />}
        <div
          className={tab === "search" ? "sidebar-item active" : "sidebar-item"}
          onClick={() => {
            setTab("search");
          }}
        >
          <IoSearchOutline className="text-lg ml-2" />
          <p className=" font-medium text-lg p-1">Search</p>
        </div>
        <div
          className={
            tab === "priority" ? "sidebar-item active" : "sidebar-item"
          }
          onClick={() => {
            setTab("priority");
          }}
        >
          <FcHighPriority className="text-lg ml-2" />
          <p className=" font-medium text-lg p-1">Priority</p>
        </div>
        <div
          className={tab === "today" ? "sidebar-item active" : "sidebar-item"}
          onClick={() => {
            setTab("today");
          }}
        >
          <IoCalendarOutline className="text-lg ml-2" color="green" />
          <p className=" font-medium text-lg p-1">Today</p>
        </div>
        <div
          className={
            tab === "upcoming" ? "sidebar-item active" : "sidebar-item"
          }
          onClick={() => {
            setTab("upcoming");
          }}
        >
          <TbCalendarUp className="text-lg font-light ml-2" />
          <p className="font-medium text-lg p-1">Upcoming</p>
        </div>
        <div
          className={tab === "filter" ? "sidebar-item active" : "sidebar-item"}
          onClick={() => {
            setTab("filter");
          }}
        >
          <IoGridOutline className="text-lg ml-2" color="orange" />
          <p className=" font-medium text-lg p-1">Filters & Labels</p>
        </div>
      </div>
    );
  } else if (user.role === "admin") {
    return (
      <div className="flex flex-col w-[20vw] h-[100vh] bg-ct-sidebar-bg rounded p-2">
        <div className="flex justify-between">
          <div className="flex items-center text-center gap-2">
            <img
              src={avatar}
              alt="/"
              className="w-8 h-auto rounded-full border-4"
            />
            <p className="font-semibold text-lg mb-0">{user.username}</p>
            <IoIosArrowDown
              className="mt-[2px] text-xs font-extralight text-inherit"
              color="#c0c0cd"
            />
          </div>
          <div className="flex items-center text-center gap-2">
            <IoIosNotificationsOutline
              className="font-light text-xl"
              color="#c0c0cd"
            />
            <PiRectangleLight className="font-light text-xl" color="#c0c0cd" />
          </div>
        </div>
        <div
          className="flex items-center justify-center bg-ct-red rounded-sm mt-5 mb-4 cursor-pointer"
          onClick={() => {
            setPopupOpen(true);
          }}
        >
          <PiPlus className="text-sm" color="white" />
          <p className="text-white font-medium text-lg p-1">Add task</p>
        </div>
        {isPopupOpen && <AddtaskAdmin setPopupOpen={setPopupOpen} />}
        <div
          className={tab === "search" ? "sidebar-item active" : "sidebar-item"}
          onClick={() => {
            setTab("searchForAdmin");
          }}
        >
          <IoSearchOutline className="text-lg ml-2" />
          <p className=" font-medium text-lg p-1">Search</p>
        </div>
        <div
          className={
            tab === "usermanagement" ? "sidebar-item active" : "sidebar-item"
          }
          onClick={() => {
            setTab("usermanagement");
          }}
        >
          <FcHighPriority className="text-lg ml-2" />
          <p className=" font-medium text-lg p-1">User management</p>
        </div>
        <div
          className={
            tab === "taskmanagement" ? "sidebar-item active" : "sidebar-item"
          }
          onClick={() => {
            setTab("taskmanagement");
          }}
        >
          <TbCalendarUp className="text-lg font-light ml-2" />
          <p className="font-medium text-lg p-1">Task management</p>
        </div>
        <div
          className={tab === "filter" ? "sidebar-item active" : "sidebar-item"}
          onClick={() => {
            setTab("filter");
          }}
        >
          <IoGridOutline className="text-lg ml-2" color="orange" />
          <p className=" font-medium text-lg p-1">Filters & Labels</p>
        </div>
      </div>
    );
  } else {
    console.log(user);
    return <></>;
  }
};

export default Sidebar;
