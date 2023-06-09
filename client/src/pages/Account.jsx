import React from "react";
import User from "../user";
import axios from "axios";
import Order from "../components/Order";

const Account = () => {
  const [user, setUser] = React.useState();
  const [orders, setOrders] = React.useState();

  const getUser = async () => {
    try {
      let url = `${import.meta.env.VITE_APP_API_URL}user.php`;
      const { data } = await axios.get(url);
      setUser(data[0]);
    } catch (error) {
      console.error(error);
    }
  };
  const getOrders = async () => {
    try {
      let url = `${import.meta.env.VITE_APP_API_URL}ordersForOne.php?user_id=${
        User.user
      }`;
      const { data } = await axios.get(url);
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };
  const logout = () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
    window.location.href = "/main";
  };

  React.useEffect(() => {
    getUser();
    getOrders();
  }, []);
  return (
    <div>
      <h1 className="mt-[60px] mb-[30px] font-bold font-Comfortaa text-4xl">
        Личный профиль
      </h1>
      {user && (
        <>
          <div>Имя: {user.name}</div>
          <div>Фамилия: {user.surname}</div>
          <div>Номер телефона: {user.numberPhone}</div>
          <button
            className="text-white bg-red-600 px-10 py-4 rounded-2xl font-Comfortaa mt-5"
            onClick={() => logout()}
          >
            Выйти
          </button>
          <h1 className="mt-[140px] mb-[30px] font-bold font-Comfortaa text-4xl">
            Ваши заказы
          </h1>
          <div className="grid grid-cols-2 gap-20">
            {orders &&
              orders.map((e, i) => (
                <Order e={e} key={i} getOrders={getOrders} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
