import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { SmartCaptcha } from "@yandex/smart-captcha";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, logIn } = UserAuth();
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (token !== "") {
        await logIn(email, password);
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <>
      <div className="w-full h-full relative">
        <div className=" w-full px-4 py-4 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Вход</h1>
              {error ? <p className="p-3 bg-red-400 my-2"> {error}</p> : null}
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="email"
                  placeholder="Email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  placeholder="Passowrd"
                  autoComplete="current-password"
                />
                <SmartCaptcha
                  sitekey="ysc1_Dx8ZXQ4dBZQLoz0biaUHXsrUe3ypYNQxpX0tcIimf812f6eb"
                  onSuccess={setToken}
                />
                <button className="bg-yellow-600 cursor-pointer sm:bg-[#00FFC2] text-black py-3 my-6 rounded font-bold">
                  Войти
                </button>

                <p className="py-2">
                  <span className="text-gray-600">Новенький?</span>
                  <Link to="/signup"> Зарегистрироваться</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
