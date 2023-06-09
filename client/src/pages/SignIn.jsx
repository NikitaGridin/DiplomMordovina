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
      action=""
      className="w-1/2 mx-auto border bg-gray-100 p-5 rounded-3xl text-center"
      onSubmit={handleSubmit}
    >
      <h1 className="font-bold font-Comfortaa text-5xl mb-10 py-10">
        Регистрация
      </h1>

      <label htmlFor="">
        Имя
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block mx-auto mb-10 p-3 rounded-3xl"
        />
      </label>
      <label htmlFor="">
        Фамилия
        <input
          type="text"
          name="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="block mx-auto mb-10 p-3 rounded-3xl"
        />
      </label>
      <label htmlFor="">
        Номер телефона
        <input
          type="number"
          name="numberPhone"
          value={numberPhone}
          onChange={(e) => setNumberPhone(e.target.value)}
          className="block mx-auto mb-10 p-3 rounded-3xl"
        />
      </label>
      <label htmlFor="">
        Пароль
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block mx-auto p-3 rounded-3xl"
        />
      </label>
      <button
        className="bg-black/60 text-white px-10 mt-10 py-2 rounded-3xl"
        onClick={(e) => handleSubmit(e)}
      >
        Зарегестрироваться
      </button>
      <Link to="/login" className="text-lg font-medium block">
        Уже зарегестрированы?
      </Link>
    </form>
  );
};

export default SignIn;
