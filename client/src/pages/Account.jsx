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
    window.location.href = "/";
  };

  React.useEffect(() => {
    getUser();
    getOrders();
  }, []);
  return (
    <div>
      <h1 className="mt-[60px] mb-[40px] font-bold font-Comfortaa text-4xl text-center lg:text-start lg:mb-[20px]">
        Личный профиль
      </h1>
      {user && (
        <>
          <div className="text-3xl mb-5 lg:mb-3 lg:text-lg">
            <strong>Имя: </strong>
            {user.name}
          </div>
          <div className="text-3xl mb-5 lg:mb-3 lg:text-lg">
            <strong>Фамилия:</strong> {user.surname}
          </div>
          <div className="text-3xl lg:text-lg">
            <strong>Номер телефона:</strong> {user.numberPhone}
          </div>
          <button
            className="text-white bg-red-600 py-4 rounded-2xl font-Comfortaa mt-5 w-full text-2xl font-bold lg:text-lg lg:w-auto lg:px-5 lg:py-2"
            onClick={() => logout()}
          >
            Выйти
          </button>
          <h1 className="mt-[140px] mb-[30px] font-bold font-Comfortaa text-4xl text-center lg:text-left">
            Ваши заказы
          </h1>
          {orders && !orders.length && (
            <div className="text-center font-bold text-3xl">Заказов нет</div>
          )}
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
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
