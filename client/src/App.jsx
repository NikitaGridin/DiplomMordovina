import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import { observer } from "mobx-react-lite";
import User from "./user";
import Admin from "./pages/Admin";

const App = observer(() => {
  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const [cookieName, cookieValue] = cookies[i].split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

  React.useEffect(() => {
    const myCookieValue = getCookie("user");
    if (myCookieValue) {
      fetch(
        `${import.meta.env.VITE_APP_API_URL}checkAuth.php?key=${myCookieValue}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            const decodedData = atob(myCookieValue);
            const userData = JSON.parse(decodedData);
            User.setUser(userData.id);
            User.setRole(userData.role);
          } else {
            document.cookie.split(";").forEach((c) => {
              document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
            });
          }
        });
    }
  }, []);
  return (
    <Router>
      <div className="bg-white rounded-[20px] px-16 py-14">
        <Header />
        <Routes>
          <Route path="/main" element={<Main />} />
          {!User.isAuth && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signin" element={<SignIn />} />
            </>
          )}
          {User.isAuth && <Route path="/Account" element={<Account />} />}
          {User.isAuth && User.role === "admin" && (
            <Route path="/admin" element={<Admin />} />
          )}
          <Route path="/cart" element={<Cart />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
});
export default App;
