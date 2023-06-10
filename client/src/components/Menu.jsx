import React from "react";
import { Link } from "react-router-dom";
import user from "../user";
import Close from "../assets/close.svg";

const Menu = ({ setMenu }) => {
  return (
    <div className="fixed bg-gray-100 text-4xl h-screen px-5 flex justify-center flex-col left-0 top-0 z-50 w-full lg:absolute lg:h-auto lg:top-10 lg:text-xl lg:w-auto lg:py-4 lg:shadow-lg lg:rounded-xl lg:bg-white">
      {user.isAuth && (
        <Link
          to="/account"
          className="block mb-5 font-semibold"
          onClick={() => setMenu(false)}
        >
          Личный аккаунт
        </Link>
      )}
      <Link
        to="/cart"
        className="block mb-5 font-semibold"
        onClick={() => setMenu(false)}
      >
        Корзина
      </Link>
      {!user.isAuth && (
        <Link
          to="/login"
          className="block mb-5 font-semibold"
          onClick={() => setMenu(false)}
        >
          Авторизация
        </Link>
      )}
      {user.isAuth && user.role === "admin" && (
        <Link
          to="/admin"
          className="block font-semibold"
          onClick={() => setMenu(false)}
        >
          Админ панель
        </Link>
      )}
      <img
        src={Close}
        alt="burger"
        className="w-8 absolute top-10 right-5 lg:hidden"
        onClick={() => setMenu(false)}
      />
    </div>
  );
};

export default Menu;
