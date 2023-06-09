import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-8xl font-bold text-pink-500 mb-8 font-Comfortaa">
        404
      </h1>
      <h2 className="text-4xl font-medium text-pink-600 mb-8 font-Comfortaa">
        Упс! Страница не найдена
      </h2>
      <Link
        to="/main"
        className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded font-Comfortaa transition-all"
      >
        Вернутся на главную
      </Link>
    </div>
  );
};

export default NotFound;
