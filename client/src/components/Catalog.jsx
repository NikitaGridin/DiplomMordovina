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
      <div className="flex w-full overflow-scroll">
        <button
          className={`px-6 py-3 text-2xl font-medium font-Inter rounded-3xl mr-5 lg:py-2 lg:px-4 lg:text-lg ${
            !selectCategory ? "bg-[#2e2e2e] text-white" : "border"
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
                  className="lg:px-2 lg:py-0 py-4 px-4 bg-red-500 rounded-lg text-center cursor-pointer text-white"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  х
                </div>
                <div
                  className="lg:px-2 lg:py-0 py-4 px-4 rounded-lg bg-blue-500 text-center cursor-pointer text-white"
                  onClick={() => handleChangeCategory(category.id)}
                >
                  ...
                </div>
              </div>
            )}
            <button
              key={category.id}
              className={`px-6 py-3 text-2xl font-medium font-Inter rounded-full mr-5 lg:py-2 lg:px-4 lg:text-lg  ${
                selectCategory === category.id
                  ? "bg-[#2e2e2e] text-white"
                  : "border"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          </div>
        ))}
      </div>
      {user.isAuth && user.role === "admin" && (
        <button
          className="bg-gray-300 rounded-2xl px-5 py-5 text-2xl mt-5 w-full md:w-auto lg:text-lg lg:py-3"
          onClick={() => setModalCategory(!modalCategory)}
        >
          Добавить категорию
        </button>
      )}
      <h1 className="mt-[80px] mb-[20px] font-bold font-Comfortaa text-4xl text-center lg:text-left lg:mt-[100px]">
        Все сладости
      </h1>
      {user.isAuth && user.role === "admin" && (
        <button
          className="bg-gray-300 rounded-2xl px-5 py-5 text-2xl mt-5 w-full md:w-auto lg:text-lg lg:py-3"
          onClick={() => setModalAddProduct(!modalCategory)}
        >
          Добавить продукт
        </button>
      )}
      {!products.length && (
        <div className="text-center font-medium text-2xl mt-10">
          Товары кончились ;(
        </div>
      )}
      <div className="grid grid-cols-1 gap-24 mt-10 sm:grid-cols-2 xl:grid-cols-4">
        {products &&
          products.map((product) => (
            <div
              className="bg-[#F6F6F6] block rounded-3xl transition-all hover:shadow-md"
              key={product.id}
            >
              {user.isAuth && user.role === "admin" && (
                <div className="grid grid-cols-1 gap-5 mb-5 lg:grid-cols-2">
                  <div
                    className="bg-red-500 rounded-xl text-center cursor-pointer text-white text-2xl py-4 lg:py-2 lg:text-lg"
                    onClick={() => handleDelete(product.id)}
                  >
                    Удалить
                  </div>
                  <div
                    className="bg-blue-500 rounded-xl text-center cursor-pointer text-white text-2xl py-4 lg:py-2 lg:text-lg"
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
                  <div className="mb-4 font-Inter text-3xl md:text-2xl lg:text-lg">
                    {product.price} р
                  </div>
                  <div className="font-Inter text-2xl font-medium mb-1 md:text-xl lg:text-lg">
                    {product.name}
                  </div>
                  <div className="font-Inter text-gray-400 text-2xl font-medium md:text-xl lg:text-lg">
                    {product.wt} г
                  </div>
                </div>
              </Link>
              <div className="px-5 pb-5 mt-5">
                <button
                  className="w-full text-center text-3xl shadow-sm bg-white rounded-3xl transition-all font-Comfortaa py-5 md:text-2xl lg:text-lg lg:py-4"
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
        <div className="flex justify-center mt-10">
          {[...Array(pages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`py-5 px-7 mr-5 rounded-full text-2xl font-bold md:py-3 md:px-5 lg:text-lg lg:py-2 lg:px-4 ${
                currentPage === i + 1 ? "bg-[#2e2e2e] text-white" : ""
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
