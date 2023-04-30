import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { UserAuth } from "../context/AuthContext";

function Navbar() {
  //   const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  //   const handleLogOut = async () => {
  //     try {
  //       await logOut();
  //       navigate("/");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  return (
    <>
      <div className="relative p-4 flex items-center justify-between  w-full ">
        <Link to="/">
          <h1 className="text-[#00FFC2] text-4xl font-bold cursor-pointer">
            Pi-Libria
          </h1>
        </Link>

        <div>
          <Link to="collection">
            <button className="text-[#00FFC2] pr-6">Коллекция</button>
          </Link>
          <Link to="signup">
            <button className="text-[#00FFC2] pr-6">Зарегистрироваться</button>
          </Link>
          <Link to="login">
            <button className="text-[#00FFC2] pr-6 rounded cursor-pointe">
              Войти
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
