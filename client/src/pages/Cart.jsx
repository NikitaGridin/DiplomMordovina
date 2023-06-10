import { Link } from "react-router-dom";
import React from "react";
import User from "../user";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = React.useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
  };
  const handleDecrease = (i) => {
    const newCartItems = [...cartItems];
    newCartItems[i].count -= 1;
    if (newCartItems[i].count < 1) {
      newCartItems.splice(i, 1);
    }
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    setCartItems(newCartItems);
  };

  const handleIncrease = (i) => {
    const newCartItems = [...cartItems];
    newCartItems[i].count += 1;
    if (newCartItems[i].count < 1) {
      newCartItems[i].count = 1;
    }
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    setCartItems(newCartItems);
  };

  const handleSubmit = () => {
    const userId = User.user;
    const productIds = cartItems.map((item) => ({
      id: item.id,
      count: item.count,
    }));
    axios
      .post(`${import.meta.env.VITE_APP_API_URL}/orders.php`, {
        userId,
        productIds,
      })
      .then((response) => {
        alert("Заказ оформлен, ожидайте звонка!");
        setCartItems([]);
        localStorage.clear();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
      <div>
        <h1 className="mb-[30px] font-bold font-Comfortaa text-4xl text-center">
          Корзина
        </h1>
        {cartItems.length === 0 ? (
          <div className="text-3xl text-center font-semibold">
            Корзина пуста.{" "}
            <Link
              to="/main"
              className="px-5 bg-[#FF7373] text-white rounded-xl w-full py-5 text-2xl font-bold font-Inter block mt-5"
            >
              Перейти к покупкам
            </Link>
          </div>
        ) : (
          cartItems.map((e, i) => {
            return (
              <div
                className="mb-10 lg:flex lg:justify-between lg:items-center"
                key={i}
              >
                <Link to={`/product/${e.id}`} key={i} className="lg:flex">
                  <div className="bg-gray-100 rounded-2xl block mb-2 lg:mr-5">
                    <img
                      src={`${import.meta.env.VITE_APP_API_URL}${e.img}`}
                      className="w-full md:h-80 rounded-3xl h-32 object-cover lg:h-20 lg:w-20 lg:rounded-2xl"
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
                <div className="mt-10 flex justify-center lg:mt-0">
                  <button
                    className="px-4 text-3xl py-1 rounded-full border border-gray-400 mr-2 lg:text-lg lg:py-2 lg:px-3"
                    onClick={() => handleDecrease(i)}
                  >
                    -
                  </button>
                  <span className="text-4xl mx-2 lg:text-lg">{e.count}</span>
                  <button
                    className="px-3 text-3xl py-1 rounded-full border border-gray-400 ml-2 lg:text-lg lg:py-2 lg:px-3"
                    onClick={() => handleIncrease(i)}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div>
        {cartItems.length > 0 ? (
          <>
            {!User.isAuth && (
              <div className="text-3xl text-center font-bold">
                Чтобы оформить заказ, пожалуйста,{" "}
                <Link to="/login">войдите в аккаунт</Link>.
              </div>
            )}
            {User.isAuth && (
              <>
                <h1 className="mb-[30px] font-bold font-Comfortaa text-4xl text-center">
                  Итого
                </h1>
                <p className="text-3xl font-medium mb-5 lg:text-xl">
                  Товаров в корзине: {cartItems.length}
                </p>
                <p className="text-3xl font-medium mb-5 lg:text-xl">
                  Общая стоимость: {getTotalPrice()}р
                </p>
                <button
                  className="px-5 bg-[#FF7373] text-white rounded-xl w-full py-5 text-2xl font-bold font-Inter lg:w-auto lg:text-lg lg:py-2"
                  onClick={handleSubmit}
                >
                  Оформить заказ
                </button>
              </>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Cart;
