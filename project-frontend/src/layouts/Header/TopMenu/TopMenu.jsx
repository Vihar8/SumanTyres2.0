import React, { useContext, useEffect, useRef, useState } from "react";
import {
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import JWTContext from "../../../contexts/JWTContext";

const TopMenu = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const dropdownRef1 = useRef(null);
  
  const handleLogin = () => {
    navigate("/login")
  };
   

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      )

      if (
        dropdownRef1.current &&
        !dropdownRef1.current.contains(event.target)
      ) {
        setDropdownOpen1(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="wrapper flex lg:justify-between w-full">
        <nav className="w-full">
          <input type="checkbox" id="show-menu" />
          <label htmlFor="show-menu" className="menu-icon">
            <MenuFoldOutlined className="text-subtitle1" />
          </label>

          <div className="nav-content">
            <ul className="links">
              <li>
                <Link to="/" onClick={() => setDropdownOpen(false)}>Home</Link>
              </li>
              <li>
                <Link to="/tyres" onClick={() => setDropdownOpen(false)}>Tyres</Link>
              </li>
              <li>
                <Link to="/enginoil" onClick={() => setDropdownOpen(false)}>Engine Oil</Link>
              </li>
              <li>
                <Link to="/battery" onClick={() => setDropdownOpen(false)}>Battery</Link>
              </li>

              {/* Mobile View Login Buttons - Hidden on Large Screens */}
              <li className="block lg:!hidden">
                <div className="space-y-1 mt-4 ml-3 mb-2" style={{width: "90%"}}>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={handleLogin}
                    className="btnStyle roundedBtn"
                  >
                    Login
                  </Button>

                 
                  </div>
                  {/* <div className="ml-3" style={{width: "90%"}}>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={() => navigate("/project")}
                    className="btnStyle roundedBtn"
                  >
                    Book 
                  </Button>
                </div> */}
              </li>
            </ul>

            {/* Desktop View Login Buttons - Hidden on Small Screens */}
            <ul className="hidden lg:flex space-x-4 items-center z-10">
              <li className="relative">
                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={handleLogin}
                    className="btnStyle roundedBtn"
                >
                  Login
                </Button>
              </li>
              <li>
                {/* <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => navigate("/project")}
                  className="btnStyle roundedBtn"
                >
                  Book
                </Button> */}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default TopMenu;
