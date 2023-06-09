import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import User from "../user";

const Login = () => {
  const navigate = useNavigate();
  const [numberPhone, setNumberPhone] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("numberPhone", numberPhone);
    formData.append("password", password);

    fetch(`${import.meta.env.VITE_APP_API_URL}log_in.php`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const cookies = data.cookie;
          const decodedData = atob(cookies);
          const userData = JSON.parse(decodedData);
          User.setUser(userData.id);
          User.setRole(userData.role);
          document.cookie = `user=${cookies}; path=/`;
          navigate("/main", { replace: true });
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
        Авторизация
      </h1>
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
        Войти
      </button>
      <Link to="/signIn" className="text-lg font-medium block">
        Ещё не зарегестрированы?
      </Link>
    </form>
  );
};

export default Login;
