import axios from "axios";
import React from "react";

const modaAddProduct = ({ setModal, categories, getItems }) => {
  const styles = {
    labes:
      "block text-gray-700 text-sm font-bold mb-2 block text-gray-700 text-sm font-bold mb-2",
    input:
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    btn: "bg-black w-full text-white font-bold text-xm rounded-lg py-4",
  };

  const [name, setName] = React.useState("");
  const [info, setInfo] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [ccal, setCcal] = React.useState("");
  const [protein, setProtein] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [tallow, setTallow] = React.useState("");
  const [carbs, setCarbs] = React.useState("");
  const [wt, setWt] = React.useState("");
  const [img, setImg] = React.useState(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("info", info);
      formData.append("price", price);
      formData.append("ccal", ccal);
      formData.append("protein", protein);
      formData.append("tallow", tallow);
      formData.append("carbs", carbs);
      formData.append("wt", wt);
      formData.append("category_id", category);
      formData.append("img", img);

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}products.php`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      getItems();
      alert(data);
      setModal(false);
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <div
      className="fixed flex justify-center items-center w-full h-screen bg-black/30 top-0 left-0 z-20"
      onClick={() => setModal(false)}
    >
      <form
        className="bg-white px-8 pt-6 pb-8 mb-4 w-1/3 rounded"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Название:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Цена:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Калории:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            value={ccal}
            onChange={(e) => setCcal(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Белки:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Жир:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            value={tallow}
            onChange={(e) => setTallow(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Углеводы:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Вес:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            value={wt}
            onChange={(e) => setWt(e.target.value)}
          />
        </div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="price"
        >
          Категории:
        </label>{" "}
        <div className="grid grid-cols-4 gap-5">
          {!categories.length && <div>Категорий нет, добавье!</div>}
          {categories.map((e, i) => {
            return (
              <div
                className={`cursor-pointer border py-2 text-center font-bold rounded-lg ${
                  category === e.id ? "bg-blue-500 text-white" : "bg-white"
                }`}
                key={Math.random()}
                onClick={() => setCategory(e.id)}
              >
                {e.name}
              </div>
            );
          })}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="info"
          >
            Информация о продукте:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          ></textarea>
        </div>
        <input type="file" onChange={(e) => setImg(e.target.files[0])} />
        <div className="mb-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={() => handleSubmit()}
          >
            Добавить
          </button>
        </div>
      </form>
    </div>
  );
};

export default modaAddProduct;
