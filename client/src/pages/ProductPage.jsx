import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      let url = `${import.meta.env.VITE_APP_API_URL}oneProduct.php?id=${id}`;

      const { data } = await axios.get(url);
      setProduct(data[0]);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    fetchProducts();
  }, []);
  const isInCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    return cartItems.some((item) => item.id === product.id);
  };
  const deleteFromCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const newCartItems = cartItems.filter((item) => item.id !== product.id);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    fetchProducts();
  };
  const addToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existItem = cartItems.find((item) => item.id === product.id);
    if (existItem) {
      existItem.qty += 1;
    } else {
      cartItems.push({ ...product, count: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    fetchProducts();
  };
  return (
    <div className="mx-auto lg:w-2/3">
      {product && (
        <div className="lg:grid lg:grid-cols-2 lg:gap-20">
          <img
            src={import.meta.env.VITE_APP_API_URL + product.img}
            alt=""
            className="w-full rounded-3xl mb-5"
          />
          <div>
            <h1 className="mb-[10px] font-bold font-Comfortaa text-2xl">
              {product.name}
            </h1>
            <div className="text-[24px] text-[#ACACAC] mb-10">
              {product.wt} г
            </div>
            <div className="rounded-3xl border p-5  mb-14">
              <div className="text-3xl font-semibold mb-4 text-center">
                {product.price} р
              </div>
              <button
                className="bg-[#FF7373] text-white font-semibold py-4 rounded-3xl w-full text-2xl"
                onClick={() => {
                  if (isInCart(product)) {
                    deleteFromCart(product);
                  } else {
                    addToCart(product);
                  }
                }}
              >
                {isInCart(product) ? "Удалить из корзины" : "В корзину"}
              </button>
            </div>
            <h1 className="border-b text-2xl font-semibold pb-2 mb-5">
              На 100 граммов
            </h1>
            <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
              <div className="text-center">
                <div className="font-medium text-2xl">{product.ccal}</div>
                <div className="text-[#A9A9A9] text-xl">ккал</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-2xl">{product.protein}</div>
                <div className="text-[#A9A9A9] text-xl">белки</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-2xl">{product.tallow}</div>
                <div className="text-[#A9A9A9] text-xl">жиры</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-2xl">{product.carbs}</div>
                <div className="text-[#A9A9A9] text-xl">углеводы</div>
              </div>
            </div>
          </div>
          <div className="col-span-2 mt-20 lg:mt-0">
            <h1 className="border-b text-2xl font-semibold pb-2 mb-5">
              О товаре
            </h1>
            <div className="text-xl font-Inter text-justify break-words">
              {product.info}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
