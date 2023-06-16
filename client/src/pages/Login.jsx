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
          navigate("/", { replace: true });
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
        Вход
      </h2>
      <div className="mb-6">
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
      <div className="mb-8">
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
        Войти
      </button>
      <Link to="/signIn" className="text-xl mt-5 font-medium block">
        Ещё не зарегестрированы?
      </Link>
    </form>
  );
};

export default Login;
