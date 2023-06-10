import React from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [numberPhone, setNumberPhone] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("password", password);
    formData.append("numberPhone", numberPhone);

    fetch(`${import.meta.env.VITE_APP_API_URL}sign_in.php`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate("/Login", { replace: true });
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <form
      className="w-full max-w-sm mx-auto bg-white px-4 py-8 rounded-lg shadow-lg border"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h2 className="text-4xl text-center font-bold mb-6 text-gray-800">
        Регистрация
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2 text-2xl">
          Имя:
        </label>
        <div className="relative">
          <input
            className="block appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-2xl"
            id="name"
            type="text"
            placeholder="Введите имя"
            required
            maxLength="40"
            pattern="[А-Яа-яЁё\s]*"
            onChange={(e) => setName(e.target.value)}
            title="Введите имя, не более 40 символов, кириллицей!"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2 text-2xl">
          Фамилия:
        </label>
        <div className="relative">
          <input
            className="block appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-2xl"
            id="name"
            type="text"
            placeholder="Введите фамилию"
            required
            maxLength="40"
            pattern="[А-Яа-яЁё\s]*"
            onChange={(e) => setSurname(e.target.value)}
            title="Введите фамилию, не более 40 символов, кириллицей!"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2 text-2xl">
          Номер телефона:
        </label>
        <div className="relative">
          <input
            className="block appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-2xl"
            id="phone"
            type="tel"
            placeholder="8 (___) ___-__-__"
            pattern="^8\d{10}$"
            required
            minLength="11"
            maxLength="11"
            title="Введите номер телефона в формате: 8 (XXX) XXX-XX-XX"
            onChange={(e) => setNumberPhone(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2 text-2xl">
          Пароль
        </label>
        <div className="relative">
          <input
            className="block appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-2xl"
            id="password"
            type="password"
            name="password"
            placeholder="Введите пароль"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button
        className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-4 rounded-lg focus:outline-none focus:shadow-outline w-full text-2xl"
        type="submit"
      >
        Зарегестрироваться
      </button>
      <Link to="/login" className="text-xl mt-5 font-medium block">
        Уже зарегестрированы?
      </Link>
    </form>
  );
};

export default SignIn;
