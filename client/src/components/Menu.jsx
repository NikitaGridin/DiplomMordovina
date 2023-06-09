import React from "react";
import { Link } from "react-router-dom";
import user from "../user";

const Menu = () => {
  return (
    <div className="absolute shadow-xl border top-16 right-0 w-52 py-5 rounded-[20px] font-Comfortaa font-medium text-lg bg-white">
      {user.isAuth && (
        <Link to="/account" className="block mb-2">
          Личный аккаунт
        </Link>
      )}
      <Link to="/cart" className="block mb-2">
        Корзина
      </Link>
      {!user.isAuth && (
        <Link to="/login" className="block mb-2">
          Авторизация
        </Link>
      )}
      {user.isAuth && user.role === "admin" && (
        <Link to="/admin" className="block">
          Админ панель
        </Link>
      )}
    </div>
  );
};

export default Menu;
