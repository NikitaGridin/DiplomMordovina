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
      className="fixed flex justify-center items-center w-full h-screen bg-black/30 top-0 left-0 z-20 overflow-auto"
      onClick={() => setModal(false)}
    >
      <form
        className="bg-white px-8 pt-6 pb-8 mb-4 rounded w-full lg:w-1/3 absolute top-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2 text-2xl lg:text-lg">
            Название:
          </label>
          <input
            className="block appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-2xl lg:text-lg"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2 text-2xl lg:text-lg">
            Цена:
          </label>
          <input
            className="block appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-2xl lg:text-lg"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2 text-2xl lg:text-lg">
            Калории:
          </label>
          <input
            className="block appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-2xl lg:text-lg"
            type="number"
            value={ccal}
            onChange={(e) => setCcal(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2 text-2xl lg:text-lg">
            Белки:
          </label>
          <input
            className="block appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-2xl lg:text-lg"
            type="number"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2 text-2xl lg:text-lg">
            Жир:
          </label>
          <input
            className="block appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-2xl lg:text-lg"
            type="number"
            value={tallow}
            onChange={(e) => setTallow(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2 text-2xl lg:text-lg">
            Углеводы:
          </label>
          <input
            className="block appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-2xl lg:text-lg"
            type="number"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2 text-2xl lg:text-lg">
            Вес:
          </label>
          <input
            className="block appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-2xl lg:text-lg"
            type="number"
            value={wt}
            onChange={(e) => setWt(e.target.value)}
          />
        </div>
        <label className="block text-gray-700 font-medium mb-2 text-2xl lg:text-lg">
          Категории:
        </label>{" "}
        <div className="grid grid-cols-2 gap-5">
          {!categories.length && <div>Категорий нет, добавье!</div>}
          {categories.map((e, i) => {
            return (
              <div
                className={`cursor-pointer border py-2 text-center font-bold rounded-lg text-2xl lg:text-lg ${
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
          <label className="block text-gray-700 font-medium mb-2 text-2xl lg:text-lg">
            Информация о продукте:
          </label>
          <textarea
            className="block appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-2xl lg:text-lg"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          ></textarea>
        </div>
        <input
          type="file"
          onChange={(e) => setImg(e.target.files[0])}
          className=""
        />
        <div className="mb-6">
          <button
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-4 rounded-lg focus:outline-none focus:shadow-outline w-full text-2xl lg:text-lg mt-5 lg:py-2"
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
