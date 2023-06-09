import React, { useState } from "react";
import axios from "axios";

const AddCategory = ({ fetchCategories, setModalCategory }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}categories.php`,
        {
          name: name,
        }
      );
      console.log(response.data);
      fetchCategories();
      setName("");
    } catch (error) {
      alert(error?.response?.data.message);
    }
  };

  return (
    <div
      className="w-full h-screen top-0 left-0 fixed bg-black/30 flex justify-center items-center"
      onClick={() => setModalCategory(false)}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-1/4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-medium mb-4">Добавление категории</h2>
        <form className="max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="text-gray-700 block mb-2">
              Название категории
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Введите название категории"
              className="border border-gray-400 rounded-lg px-4 py-2 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Добавить категорию
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
