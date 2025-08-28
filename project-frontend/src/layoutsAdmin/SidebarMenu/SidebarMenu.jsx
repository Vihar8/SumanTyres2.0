import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import classes from "./SidebarMenu.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { styled, Tooltip, tooltipClasses } from "@mui/material";
import homeIcon from "/assets/adminIcons/homeIcon.svg";
import brandIcon from "/assets/adminIcons/brandIcon.svg";
import appIcon from "/assets/adminIcons/appIcon.svg";
import subverify from "/assets/adminIcons/subverify.svg";
import reportIcon from "/assets/adminIcons/reportIcon.svg";
import cmsIcon from "/assets/adminIcons/cmsIcon.svg";
import tyres from "/assets/adminIcons/wheel.png";
import engineIcon from "/assets/adminIcons/fuel.png";
import batteryIcon from "/assets/adminIcons/battery.png";
import useAuth from "../../hooks/useAuth";
import { userTypes } from "../../utils/commonEnum";

const SidebarMenu = ({ menuCollapse }) => {
    const { user } = useAuth();
    const [toggled, setToggled] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();
    let fullDashboardMenu;

    const defaultMenu = [
        {
            menusName: "Dashboard",
            path: "dashboard",
            icons: <img src={homeIcon} className={`${classes.iconSize}`} />,
        },
    ];

    const adminMenu = [
        {
            menusName: "Dashboard",
            path: "dashboard",
            icons: <img src={homeIcon} className={`${classes.iconSize}`} />,
        },
        {
          menusName: "Tyre",
          path: "tyre-list",
          icons: <img src={tyres} className={`${classes.iconSize}`} />,
        },
        {
            menusName: "Engine Oil",
            path: "engineoil-list",
            icons: <img src={engineIcon} className={`${classes.iconSize}`} />,
        },
        {
            menusName: "Battery",
            path: "battery-list",
            icons: <img src={batteryIcon} className={`${classes.iconSize}`} />,
        },
    ];

    // const consumerMenu = [
    //     {
    //         menusName: "Dashboard",
    //         path: "dashboard",
    //         icons: <img src={homeIcon} className={`${classes.iconSize}`} />,
    //     },
    //     {
    //         menusName: "Ticket",
    //         path: "ticket",
    //         icons: <img src={brandIcon} className={`${classes.iconSize}`} />,
    //     },
    // ];

    // const agentMenu = [
    //     {
    //         menusName: "Dashboard",
    //         path: "dashboard",
    //         icons: <img src={homeIcon} className={`${classes.iconSize}`} />,
    //     },
    //     {
    //         menusName: "Ticket",
    //         path: "ticket",
    //         icons: <img src={brandIcon} className={`${classes.iconSize}`} />,
    //     },
    // ];

    const menuItemStyles = {
        root: {
        fontSize: "13px",
        fontWeight: 400,
        },
        label: ({ open }) => ({
        fontWeight: open ? 700 : undefined,
        }),
    };

    switch (user?.role) {
        case userTypes.adminLogin:
            fullDashboardMenu = adminMenu;
            break;
        case userTypes.agentsLogin:
            fullDashboardMenu = agentMenu;
            break;
        case userTypes.consumersLogin:
            fullDashboardMenu = consumerMenu;
            break;
        default:
            // fullDashboardMenu = defaultMenu;
            fullDashboardMenu = adminMenu;
    }

    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "rgba(31, 70, 125, 1)",
        color: "#ffffff",
        boxShadow: theme.shadows[1],
        fontSize: 14,
        padding: "5px 15px",
        },
    }));
//   useEffect(() => {
//     // Automatically open the submenu based on the current path
//     if (currentPath.startsWith("/master")) {
//       setOpenSubMenu("MASTER");
//     } else if (currentPath.startsWith("/settings")) {
//       setOpenSubMenu("Settings");
//     } else {
//       setOpenSubMenu(null);
//     }
//   }, [currentPath]);

//   const handleSubMenuClick = (menuName) => {
//     setOpenSubMenu(openSubMenu === menuName ? null : menuName); // Toggle submenu
//   };

  return (
    <div className={`${classes.sidebarSection}`}>
      <Sidebar
        className={`${classes.sidebarMain} ${menuCollapse ? "sidebarCollapse" : "sidebarNotCollapse"}`}
        collapsed={menuCollapse}
        toggled={toggled}
        width={menuCollapse ? "76px" : "205px"}
        onBackdropClick={() => setToggled(false)}
        breakPoint="sm"
      >
        <div className={`${classes.sidebarCard}`}>
          <Menu menuItemStyles={menuItemStyles}>
            {/* Dashboard menu */}
            {menuCollapse ? (
              <>
                {fullDashboardMenu.map((item, index) => (
                  <LightTooltip
                    key={index}
                    title={item.menusName}
                    placement="right"
                  >
                    <MenuItem
                      icon={item.icons}
                      onClick={() => navigate(`/${item.path}`)}
                      className={`sidebarsMenu sidebarHideSubMenu ${currentPath === `/${item.path}` ? "activeMainMenuItem" : ""}`}
                    >
                      {item.menusName}
                    </MenuItem>
                  </LightTooltip>
                ))}
              </>
            ) : (
              <>
                {fullDashboardMenu.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => navigate(`/${item.path}`)}
                    icon={item.icons}
                    className={`sidebarsMenu ${currentPath === `/${item.path}` ? "activeMainMenuItem" : ""}`}
                  >
                    {item.menusName}
                  </MenuItem>
                ))}
              </>
            )}

            {/* master menu */}
            {/* {user?.user_type === userTypes?.adminLogin && (
              <>
              {menuCollapse ? (
                <LightTooltip title="Masters" placement="right">
                  <SubMenu
                    label="Masters"
                    icon={<img src={appIcon} className={`${classes.iconSize}`} />}
                    className={`sidebarsMenu ${menuCollapse ? "sidebarHideSubMenu" : ""} ${currentPath.startsWith("/master") ? "activeMainMenuItem" : ""}`}
                  >
                    {masterSubMenu?.length && masterSubMenu.map((item, index) => {
                      const isActive = new RegExp(`^/master/${item.path}`).test(currentPath);
                      return (
                          <MenuItem key={index} onClick={() => navigate(`/master/${item.path}`)} className={`sidebarSubMenu ${isActive ? "activeMenuItem" : ""}`}>
                            {item.menusName}
                          </MenuItem>
                      );
                    })}
                  </SubMenu>
                </LightTooltip>
              ) : (
                <SubMenu
                  label="Masters"
                  icon={<img src={appIcon} className={`${classes.iconSize}`} />}
                  open={openSubMenu === "MASTER"}
                  onClick={() => handleSubMenuClick("MASTER")}
                  className={`sidebarsMenu ${menuCollapse ? "sidebarHideSubMenu" : ""} ${currentPath.startsWith("/master") ? "activeMainMenuItem" : ""}`}
                >
                  {masterSubMenu.map((item, index) => {
                    const isActive = new RegExp(`^/master/${item.path}`).test(currentPath);
                    return (
                        <MenuItem key={index} onClick={() => navigate(`/master/${item.path}`)} className={`sidebarSubMenu ${isActive ? "activeMenuItem" : ""}`}>
                          {item.menusName}
                        </MenuItem>
                    );
                  })}
                </SubMenu>
              )}
            </>)} */}
          </Menu>
        </div>
      </Sidebar>
    </div>
  );
};

export default SidebarMenu;
