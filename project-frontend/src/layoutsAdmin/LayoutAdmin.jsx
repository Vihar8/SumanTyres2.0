import React, { useState } from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import SidebarMenu from "./SidebarMenu/SidebarMenu";

const LayoutAdmin = () => {
  const [menuCollapse, setMenuCollapse] = useState(true);

  return (
    <>
      <Header menuCollapse={menuCollapse} setMenuCollapse={setMenuCollapse} />

      <SidebarMenu menuCollapse={menuCollapse} />
      
      <div className={`adminLayout ${menuCollapse ? 'pl-0 md:pl-[76px]' : "pl-0 md:pl-[205px]"}`}>
        <Outlet />
      </div>
    </>
  );
};

export default LayoutAdmin;
