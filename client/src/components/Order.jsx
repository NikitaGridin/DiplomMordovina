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
      <div>{e.created_at}</div>
      <div>
        Статус{" "}
        {e.status === "wait"
          ? "Ожидает подтверждения"
          : e.status === "bad"
          ? "Отменён"
          : "Подтверждён"}{" "}
      </div>
      <div className="flex justify-between mt-5">
        <div>Общая стоимость: {e.allprice} р</div>
        {user.user && user.role === "admin" && (
          <div>
            <button
              className="bg-green-500 py-2 px-6 font-bold text-white rounded-2xl"
              onClick={() => changeStatus(e.id, 2)}
            >
              Подтвердить
            </button>{" "}
            <button
              className="bg-red-500 py-2 px-6 font-bold text-white rounded-2xl"
              onClick={() => changeStatus(e.id, 3)}
            >
              Отменить
            </button>
          </div>
        )}
      </div>
      <div className="h-[200px] overflow-y-scroll mt-5">
        {e.products.map((e, i) => {
          return (
            <Link
              to={`/product/${e.id}`}
              key={i}
              className="flex items-center mb-4"
            >
              <div className="bg-gray-100 rounded-2xl">
                <img
                  src={`${import.meta.env.VITE_APP_API_URL}${e.img}`}
                  className="w-16"
                  alt=""
                />
              </div>
              <div className="flex-1 ml-4">
                <div className="mb-2">{e.name}</div>
                <div>
                  {e.price}р {e.wt} кол-во:{e.count}
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
