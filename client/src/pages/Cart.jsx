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
    <div className="grid grid-cols-2 gap-20">
      <div>
        <h1 className="mb-[30px] font-bold font-Comfortaa text-4xl">Корзина</h1>
        {cartItems.length === 0 ? (
          <p>
            Корзина пуста. <Link to="/main">Перейти к покупкам</Link>
          </p>
        ) : (
          cartItems.map((e, i) => {
            return (
              <div className="flex items-center justify-between mb-10" key={i}>
                <Link
                  to={`/product/${e.id}`}
                  key={i}
                  className="flex items-center"
                >
                  <div className="bg-gray-100 rounded-2xl">
                    <img
                      src={`${import.meta.env.VITE_APP_API_URL}${e.img}`}
                      className="w-20"
                      alt=""
                    />
                  </div>
                  <div className="flex-1 ml-4">
                    <div className="mb-2">{e.name}</div>
                    <div>
                      {e.price}р {e.wt}
                    </div>
                  </div>
                </Link>
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 rounded-full border border-gray-400 mr-2"
                    onClick={() => handleDecrease(i)}
                  >
                    -
                  </button>
                  <span>{e.count}</span>
                  <button
                    className="px-2 py-1 rounded-full border border-gray-400 ml-2"
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
              <p>
                Чтобы оформить заказ, пожалуйста,{" "}
                <Link to="/login">войдите в аккаунт</Link>.
              </p>
            )}
            {User.isAuth && (
              <>
                <h1 className="mb-[30px] font-bold font-Comfortaa text-4xl">
                  Итого
                </h1>
                <p>Количество товаров в корзине: {cartItems.length}</p>
                <p>Общая стоимость: {getTotalPrice()}р</p>
                <button
                  className="px-5 py-2 bg-[#FF7373] text-white rounded-xl"
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
