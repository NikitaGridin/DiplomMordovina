import React from "react";
import { Link } from "react-router-dom";
import Vk from "../assets/vk.svg";

const Footer = () => {
  return (
    <div className="mt-[150px] bg-[#F0F0F0] px-4 py-6 rounded-3xl lg:rounded-xl">
      <div className="border-b-2 border-[#e4e4e4] pb-2">
        <h1 className="font-bold text-[32px] font-Comfortaa text-[#626262]">
          The black doctor
        </h1>
      </div>
      <div className="mt-6 lg:flex">
        <Link
          to="/whatWeSell"
          className="text-xl mb-4 font-bold text-[#626262] font-Comfortaa mr-8 block"
        >
          Что продаём
        </Link>
        <Link
          to="/questions"
          className="text-xl mb-4 font-bold text-[#626262] font-Comfortaa mr-8 block"
        >
          Вопросы и ответы
        </Link>
        <Link
          to="/howWork"
          className="text-xl font-bold text-[#626262] font-Comfortaa block"
        >
          Как работаем
        </Link>
      </div>
      <div className="mt-20 lg:mt-5">
        <div className="font-Comfortaa text-[#626262] mb-5 text-xl">
          © 2023 ООО «The black doctor»
        </div>
        <Link to="https://vk.com/">
          <img src={Vk} alt="" className="w-14 lg:w-8" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
