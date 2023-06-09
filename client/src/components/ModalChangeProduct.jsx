import axios from "axios";
import React from "react";

const ModalChangeCategory = ({ setModal, id, getItems, categories }) => {
  const styles = {
    labes:
      "block text-gray-700 text-sm font-bold mb-2 block text-gray-700 text-sm font-bold mb-2",
    input:
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    btn: "bg-black w-full text-white font-bold text-xm rounded-lg py-4",
  };

  const [name, setName] = React.useState("");
  const [ccal, setCcal] = React.useState("");
  const [protein, setProtein] = React.useState("");
  const [tallow, setTallow] = React.useState("");
  const [carbs, setCarbs] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [info, setInfo] = React.useState("");
  const [wt, setWt] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [category, setCategory] = React.useState("");

  const getInfo = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}oneProduct.php?id=${id}`
      );
      setName(data[0].name);
      setCcal(data[0].ccal);
      setProtein(data[0].protein);
      setTallow(data[0].tallow);
      setCarbs(data[0].carbs);
      setPrice(data[0].price);
      setInfo(data[0].info);
      setWt(data[0].wt);
      setCategory(data[0].categoryId);
    } catch (error) {
      alert(error?.response?.data);
    }
  };

  const changeInfo = async () => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);
      formData.append("ccal", ccal);
      formData.append("protein", protein);
      formData.append("tallow", tallow);
      formData.append("carbs", carbs);
      formData.append("price", price);
      formData.append("info", info);
      formData.append("categoryId", category);
      formData.append("wt", wt);
      if (image) {
        // если пользователь выбрал фотографию, добавляем ее в FormData
        formData.append("image", image);
      }
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}changeProduct.php`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      getItems();
      alert("Успешно обновлен!");
      setModal(false);
    } catch (error) {
      alert(error?.response?.data);
    }
  };

  const handleImageChange = (e) => {
    // обработчик события для выбора фотографии
    setImage(e.target.files[0]);
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
        className="bg-white px-8 pt-6 pb-8 mb-4 w-1/3 rounded"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4">
          <label className={styles.labes} htmlFor="name">
            Название:
          </label>
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className={styles.labes} htmlFor="name">
            Калории:
          </label>
          <input
            className={styles.input}
            type="text"
            value={ccal}
            onChange={(e) => setCcal(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className={styles.labes} htmlFor="name">
            Белок:
          </label>
          <input
            className={styles.input}
            type="text"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className={styles.labes} htmlFor="name">
            Жири:
          </label>
          <input
            className={styles.input}
            type="text"
            value={tallow}
            onChange={(e) => setTallow(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className={styles.labes} htmlFor="name">
            Углеводы:
          </label>
          <input
            className={styles.input}
            type="text"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className={styles.labes} htmlFor="name">
            Цена:
          </label>
          <input
            className={styles.input}
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className={styles.labes} htmlFor="name">
            Информация о продукте:
          </label>
          <input
            className={styles.input}
            type="text"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
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
        <div className="mb-4">
          <label className={styles.labes} htmlFor="name">
            Вес:
          </label>
          <input
            className={styles.input}
            type="text"
            value={wt}
            onChange={(e) => setWt(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className={styles.labes} htmlFor="name">
            Фотография:
          </label>
          <input
            className={styles.input}
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleImageChange} // добавляем обработчик события для выбора фотографии
          />
        </div>
        <div className="mb-6">
          <button
            className={styles.btn}
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
