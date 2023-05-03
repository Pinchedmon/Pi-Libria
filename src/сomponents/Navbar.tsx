import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logOut } = UserAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <nav className="relative flex items-center justify-between flex-wrap p-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6 ">
          <Link to="/">
            <h1 className="border shadow-sm shadow-black border-black bg-blue-200/40 p-2 text-yellow-400 sm:text-black text-4xl font-bold cursor-pointer">
              Pi-Libria
            </h1>
          </Link>
        </div>
        <div className="block sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex border items-center px-3 py-2 rounded text-yellow-300 "
          >
            <svg
              className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
            <svg
              className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
          </button>
        </div>
        <div
          className={`w-full block  sm:flex sm:items-center sm:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="text-sm sm:flex-grow">
            <Link to="collection">
              <button className="text-yellow-400 sm:text-black  mr-6 p-2 border shadow-sm shadow-black border-black bg-blue-200/40">
                Коллекция
              </button>
            </Link>
            {user ? (
              <>
                <Link to="account">
                  <button className="text-yellow-400 sm:text-black mr-6 p-2 border shadow-sm shadow-black border-black bg-blue-200/40">
                    Аккаунт
                  </button>
                </Link>
                <button
                  className="text-yellow-400 sm:text-black mr-2 p-2 border shadow-sm shadow-black border-black bg-red-200/40"
                  onClick={handleLogOut}
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link to="signup">
                  <button className="text-yellow-400 sm:text-black mr-6 p-2 border shadow-sm shadow-black border-black bg-blue-200/40">
                    Зарегистрироваться
                  </button>
                </Link>
                <Link to="login">
                  <button className="text-yellow-400 sm:text-black mr-2 cursor-pointer p-2 border shadow-sm shadow-black border-black bg-blue-200/40">
                    Войти
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
