import React from "react";
import Order from "../components/Order";
import user from "../user";
import axios from "axios";

const Admin = () => {
  const [orders, setOrders] = React.useState();

  const getOrders = async () => {
    try {
      let url = `${import.meta.env.VITE_APP_API_URL}ordersForOne.php?user_id=${
        user.user
      }`;
      const { data } = await axios.get(url);
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      {" "}
      <h1 className="mt-[60px] mb-[30px] font-bold font-Comfortaa text-4xl text-center">
        Все заказы
      </h1>
      <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
        {orders &&
          orders.map((e, i) => <Order e={e} key={i} getOrders={getOrders} />)}
      </div>
    </>
  );
};

export default Admin;
