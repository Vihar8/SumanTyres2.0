import React from "react";
import sumantyres_logo from "/assets/sumantyres.png";
import classes from "./Header.module.scss";
import Notification from "./Notification/Notification";
import Accounts from "./Accounts/Accounts";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import ContainerAdmin from "../../commoncomponents/Container/ContainerAdmin";
import AdminTopMenu from "./TopMenu/AdminTopMenu";

const Header = ({ menuCollapse, setMenuCollapse }) => {
  return (
    <header className={`${classes.header}`}>
      <ContainerAdmin classname={`${classes.headerSeparate}`}>
        <div className={`${classes.logoDivide}`}>
          <img className={`${classes.mainlogos}`} alt="Logo" src={sumantyres_logo} />

          <div className='cursor-pointer' onClick={() => setMenuCollapse(!menuCollapse)}>
            {menuCollapse ? 
                <MenuUnfoldOutlined />
              : 
                <MenuFoldOutlined />
            }
          </div>
        </div>

        {/* <AdminTopMenu /> */}

        <div className={`${classes.rightSection}`}>
          {/* notifcation details code */}
          {/* <Notification /> */}

          {/* account details code */}
          <Accounts />
        </div>
      </ContainerAdmin>
    </header>
  );
};

export default Header;
