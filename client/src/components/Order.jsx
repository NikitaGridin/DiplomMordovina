import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import user from "../user";

const Order = ({ e, getOrders }) => {
  const changeStatus = async (orderId, status) => {
    try {
      let url = `${import.meta.env.VITE_APP_API_URL}changeStatusOrder.php`;
      const { data } = await axios.post(
        url,
        `orderId=${orderId}&status=${status}`
      );
      getOrders();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-gray-200 rounded-3xl relative p-6">
      <div
        className={`w-6 h-6 absolute rounded-full top-5 right-5 ${
          e.status === "wait"
            ? "bg-yellow-400"
            : e.status === "good"
            ? "bg-green-400"
            : "bg-red-400"
        }`}
      ></div>
      <div className="text-2xl font-bold mb-5 lg:text-lg">{e.created_at}</div>
      <div className="text-2xl mb-5 lg:text-lg lg:mb-2">
        Статус:
        {e.status === "wait"
          ? " Ожидает"
          : e.status === "bad"
          ? " Отменён"
          : " Подтверждён"}{" "}
      </div>
      <div className="">
        <div className="text-2xl lg:text-lg">
          Общая стоимость: {e.allprice} р
        </div>
        {user.user && user.role === "admin" && (
          <div className="lg:grid lg:grid-cols-2 lg:gap-10">
            <button
              className="bg-green-500 mb-5 mt-5 font-bold text-white rounded-2xl w-full text-2xl py-4 lg:text-lg lg:py-2"
              onClick={() => changeStatus(e.id, 2)}
            >
              Подтвердить
            </button>
            <button
              className="bg-red-500 mb-5 mt-5 font-bold text-white rounded-2xl w-full text-2xl py-4 lg:text-lg lg:py-2"
              onClick={() => changeStatus(e.id, 3)}
            >
              Отменить
            </button>
          </div>
        )}
      </div>
      <div className="overflow-y-scroll mt-5 lg:overflow-auto max-h-36">
        {e.products.map((e, i) => {
          return (
            <Link to={`/product/${e.id}`} key={i} className="lg:flex">
              <div className="bg-gray-100 rounded-2xl block mb-2 lg:mr-5">
                <img
                  src={`${import.meta.env.VITE_APP_API_URL}${e.img}`}
                  className="w-full rounded-3xl h-32 object-cover lg:h-20 lg:w-20 lg:rounded-2xl"
                />
              </div>
              <div className="">
                <div className="mb-2 text-2xl font-semibold lg:text-lg">
                  {e.name}
                </div>
                <div className="text-2xl lg:text-lg">
                  {e.price}р{" "}
                  <span className="text-gray-400 lg:text-lg">{e.wt} г</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
