import React, { useContext, useEffect, useState } from "react";
import Today from "../../container/Today/Today";
import Priority from "../../container/Priority/Priority";
import Upcoming from "../../container/Upcoming/Upcoming";
import Search from "../../container/Search/Search";
import Filter from "../../container/Filter/Filter";
import Usermanagement from "../../container/admin/Usermanagement/Usermanagement";
import Taskmanagement from "../../container/admin/Taskmanagement/Taskmanagement";
import SearchForAdmin from "../../container/admin/searchForAdmin/SearchForAdmin";

const Main = ({ tab, isPopupOpen }) => {
  console.log("reset");
  return (
    <div className="mt-8">
      {tab === "today" && <Today isP={isPopupOpen} />}
      {tab === "priority" && <Priority />}
      {tab === "upcoming" && <Upcoming isP={isPopupOpen} />}
      {tab === "search" && <Search isP={isPopupOpen} />}
      {tab === "filter" && <Filter />}
      {tab === "usermanagement" && <Usermanagement />}
      {tab === "taskmanagement" && <Taskmanagement />}
      {tab === "searchForAdmin" && <SearchForAdmin isP={isPopupOpen} />}
    </div>
  );
};

export default Main;
