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
    <div className="mb-[100px] border-b-[1px] pb-10 relative">
      <Link to="/" className="text-center block">
        <img src={Logo} alt="logo" className="w-20 mb-2 mx-auto" />
        <div>
          <div className="font-Comfortaa font-bold text-[32px] mb-2 lg:text-2xl">
            The black doctor
          </div>
          <div className="font-Comfortaa font-medium text-[22px] w-full text-[#898989] lg:text-xl">
            самые вкусные сладости во вселенной!
          </div>
        </div>
      </Link>
      <button className="absolute top-10 right-6" ref={menuRef}>
        {menu && <Menu setMenu={setMenu} />}
        {menu ? (
          <img
            src={Close}
            alt="burger"
            className="w-8 lg:w-6"
            onClick={() => setMenu(false)}
          />
        ) : (
          <img
            src={Burger}
            alt="burger"
            className="w-8 lg:w-6"
            onClick={() => setMenu(true)}
          />
        )}
      </button>
    </div>
  );
};

export default Header;
