import React from "react";
import { Link } from "react-router-dom";
import Vk from "../assets/vk.svg";

const Footer = () => {
  return (
    <div className="mt-[150px] bg-[#F0F0F0] p-10 rounded-3xl">
      <div className="border-b-2 border-[#e4e4e4] pb-2">
        <h1 className="font-bold text-[32px] font-Comfortaa text-[#626262]">
          The black doctor
        </h1>
      </div>
      <div className="mt-6">
        <Link
          to=""
          className="text-lg font-bold text-[#626262] font-Comfortaa mr-8"
        >
          Что продаём
        </Link>
        <Link
          to=""
          className="text-lg font-bold text-[#626262] font-Comfortaa mr-8"
        >
          Вопросы и ответы
        </Link>
        <Link to="" className="text-lg font-bold text-[#626262] font-Comfortaa">
          Как работает
        </Link>
      </div>
      <div className="flex justify-between mt-20">
        <div className="font-Comfortaa text-[#626262]">
          © 2023 ООО «The black doctor»
        </div>
        <Link to="https://vk.com/">
          <img src={Vk} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
