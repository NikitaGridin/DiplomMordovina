import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/logo.svg";
import Burger from "../assets/burger.svg";
import Close from "../assets/close.svg";
import { Link } from "react-router-dom";
import Menu from "./Menu";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="mb-[100px] border-b-[1px] pb-10 flex justify-between">
      <Link to="/main" className="flex">
        <img src={Logo} alt="logo" className="mr-[12px]" />
        <div>
          <div className="font-Comfortaa font-bold text-[32px]">
            The black doctor
          </div>
          <div className="font-Comfortaa font-medium text-[20px] text-[#898989]">
            самые вкусные сладости во вселенной!
          </div>
        </div>
      </Link>
      <button className="relative" ref={menuRef}>
        {menu && <Menu />}
        {menu ? (
          <img
            src={Close}
            alt="burger"
            className="w-6"
            onClick={() => setMenu(false)}
          />
        ) : (
          <img
            src={Burger}
            alt="burger"
            className="w-6"
            onClick={() => setMenu(true)}
          />
        )}
      </button>
    </div>
  );
};

export default Header;
