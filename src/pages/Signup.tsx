import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "./../context/AuthContext";
import { SmartCaptcha } from "@yandex/smart-captcha";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp } = UserAuth();
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full h-full relative">
        <div className="fixed w-full px-4 py-4 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Регистрация</h1>
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
                  Зарегистрироваться{" "}
                </button>
                <p>
                  <span className="text-gray-600">
                    Уже зарегистрирован в Pi-Flix?
                  </span>
                  <Link to="/login"> Войти</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
