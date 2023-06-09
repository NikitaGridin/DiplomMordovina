import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import user from "../user";
import AddCategory from "./addCategory";
import AddProduct from "./AddProduct";
import ModalChangeCategory from "./ModalChangeCategory";
import ModalChangeProduct from "./ModalChangeProduct";

const Catalog = () => {
  const [categories, setCategories] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [selectCategory, setSelectCategory] = React.useState("");
  const [pages, setPages] = React.useState();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [modalCategory, setModalCategory] = React.useState(false);
  const [modalAddProduct, setModalAddProduct] = React.useState(false);
  const [modalChangeCategory, setModalChangeCategory] = React.useState(false);
  const [modalChangeProduct, setModalChangeProduct] = React.useState(false);
  const [selectedChangeCategory, setSelectedChangeCategory] = React.useState();
  const [selectedChangeProduct, setSelectedChangeProduct] = React.useState();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/categories.php`
      );
      setCategories(data);
    } catch (error) {
      setCategories([]);
      console.error(error);
    }
  };
  const [sort, setSort] = React.useState("");
  const [order, setOrder] = React.useState("");
  const fetchProducts = async () => {
    try {
      let url = `${
        import.meta.env.VITE_APP_API_URL
      }products.php?category=${selectCategory}&sort=${sort}&order=${order}&page=${currentPage}`;
      if (selectCategory !== null) {
        url += `?category=${selectCategory}&page=${currentPage}`;
      }
      const { data } = await axios.get(url);
      setProducts(data.data);
      setPages(data.pages);
    } catch (error) {
      setProducts([]);
      console.error(error);
    }
  };

  const setActiveCategory = (i) => {
    setSelectCategory(i);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectCategory, currentPage]);

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
  const isInCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    return cartItems.some((item) => item.id === product.id);
  };
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Вы уверены, что хотите удалить этот товар?"
    );
    if (confirmed) {
      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_APP_API_URL}products.php?id=${id}`
        );
        alert(data);
        fetchProducts();
      } catch (error) {
        alert(error?.response?.data);
      }
    }
  };
  const handleDeleteCategory = async (id) => {
    const confirmed = window.confirm(
      "Вы уверены, что хотите удалить категорию?"
    );
    if (confirmed) {
      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_APP_API_URL}categories.php?id=${id}`
        );
        alert(data);
        fetchCategories();
        fetchProducts();
      } catch (error) {
        alert(error?.response?.data);
      }
    }
  };
  const handleChangeCategory = async (id) => {
    setSelectedChangeCategory(id);
    setModalChangeCategory(!modalChangeCategory);
  };
  const handleChangeProduct = async (id) => {
    setSelectedChangeProduct(id);
    setModalChangeProduct(!modalChangeProduct);
  };
  return (
    <div>
      {modalChangeProduct && (
        <ModalChangeProduct
          setModal={setModalChangeProduct}
          getItems={fetchProducts}
          id={selectedChangeProduct}
          categories={categories}
        />
      )}
      {modalChangeCategory && (
        <ModalChangeCategory
          setModal={setModalChangeCategory}
          getCategories={fetchCategories}
          getItems={fetchProducts}
          id={selectedChangeCategory}
        />
      )}
      {modalCategory && (
        <AddCategory
          fetchCategories={fetchCategories}
          setModalCategory={setModalCategory}
        />
      )}
      {modalAddProduct && (
        <AddProduct
          getItems={fetchProducts}
          setModal={setModalAddProduct}
          categories={categories}
        />
      )}
      <div className="flex">
        <button
          className={`bg-[#F1F1F1] px-6 py-4 rounded-full mr-5 ${
            !selectCategory ? "bg-[#282828] text-white" : ""
          }`}
          onClick={() => setActiveCategory("")}
        >
          Все
        </button>
        {categories.map((category, i) => (
          <div className="flex" key={i}>
            {user.isAuth && user.role === "admin" && (
              <div className="">
                <div
                  className="p-2 bg-red-500 rounded-xl text-center cursor-pointer text-white"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  х
                </div>
                <div
                  className="p-2 bg-blue-500 rounded-xl text-center cursor-pointer text-white"
                  onClick={() => handleChangeCategory(category.id)}
                >
                  ...
                </div>
              </div>
            )}
            <button
              key={category.id}
              className={`bg-[#F1F1F1] px-6 py-4 rounded-full mr-5 ${
                selectCategory === category.id ? "bg-[#282828] text-white" : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          </div>
        ))}
        {user.isAuth && user.role === "admin" && (
          <button
            className="bg-gray-300 rounded-2xl px-5"
            onClick={() => setModalCategory(!modalCategory)}
          >
            Добавить категорию
          </button>
        )}
      </div>
      <h1 className="mt-[60px] mb-[30px] font-bold font-Comfortaa text-4xl">
        Все сладости
      </h1>
      {user.isAuth && user.role === "admin" && (
        <button
          className="bg-gray-300 rounded-2xl px-5 py-2"
          onClick={() => setModalAddProduct(!modalCategory)}
        >
          Добавить продукт
        </button>
      )}
      <div className="grid grid-cols-4 gap-24">
        {products.map((product) => (
          <div
            className="bg-[#F6F6F6] block rounded-3xl transition-all hover:shadow-md"
            key={product.id}
          >
            {user.isAuth && user.role === "admin" && (
              <div className="grid grid-cols-2 gap-5">
                <div
                  className="py-2 bg-red-500 rounded-xl text-center cursor-pointer text-white"
                  onClick={() => handleDelete(product.id)}
                >
                  Удалить
                </div>
                <div
                  className="py-2 bg-blue-500 rounded-xl text-center cursor-pointer text-white"
                  onClick={() => handleChangeProduct(product.id)}
                >
                  Редактировать
                </div>
              </div>
            )}
            <Link to={`/product/${product.id}`} key={product.id}>
              <img
                src={`${import.meta.env.VITE_APP_API_URL}${product.img}`}
                className="w-full h-80 object-cover rounded-3xl mb-5"
                alt=""
              />
              <div className="px-5">
                <div className="mb-2 font-Inter text-xl">{product.price} р</div>
                <div className="font-Inter text-lg font-light mb-1">
                  {product.info}
                </div>
                <div className="font-Inter text-gray-400 font-medium">
                  {product.wt} г
                </div>
              </div>
            </Link>
            <div className="px-5 pb-5 mt-5">
              <button
                className="w-full text-center shadow-sm bg-white rounded-3xl transition-all font-Comfortaa py-5"
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
          </div>
        ))}
      </div>
      {pages && (
        <div className="flex justify-center">
          {[...Array(pages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`bg-gray-100 py-3 px-5 mr-5 rounded-full ${
                currentPage === i + 1 ? "bg-black/60 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
