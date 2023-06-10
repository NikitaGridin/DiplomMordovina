import axios from "axios";
import React from "react";

const ModalChangeCategory = ({ setModal, id, getItems, getCategories }) => {
  const [name, setName] = React.useState("");

  const getInfo = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}oneCategory.php?id=${id}`
      );
      setName(data[0].name);
    } catch (error) {
      alert(error?.response?.data);
    }
  };

  const changeInfo = async () => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}changeCategory.php`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      getItems();
      getCategories();
      alert("Успешно обновлен!");
      setModal(false);
    } catch (error) {
      alert(error?.response?.data);
    }
  };

  React.useEffect(() => {
    getInfo();
  }, []);

  return (
    <div
      className="fixed flex justify-center items-center w-full h-screen bg-black/30 top-0 left-0 z-20"
      onClick={() => setModal(false)}
    >
      <form
        className="bg-white px-8 pt-6 pb-8 mb-4 rounded w-full lg:w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4">
          <label className="text-gray-700 block mb-2 text-2xl lg:text-lg">
            Название:
          </label>
          <input
            className="border border-gray-400 rounded-lg px-4 py-2 w-full text-2xl lg:text-lg"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 rounded-lg w-full text-2xl lg:text-lg lg:py-2"
            type="button"
            onClick={() => changeInfo()}
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalChangeCategory;
