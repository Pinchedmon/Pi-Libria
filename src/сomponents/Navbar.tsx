import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(user);
  return (
    <>
      <div className="relative p-2 flex items-center justify-between  w-full ">
        <Link to="/">
          <h1 className="border ml-0 sm:ml-2 shadow-sm shadow-black border-black bg-blue-200/40 p-2 text-yellow-400 sm:text-black text-4xl font-bold cursor-pointer">
            Pi-Libria
          </h1>
        </Link>

        <div>
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
    </>
  );
}

export default Navbar;
