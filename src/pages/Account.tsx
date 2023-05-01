import React from "react";
import { UserAuth } from "../context/AuthContext";

const Account = () => {
  const { user, logOut } = UserAuth();
  console.log(user);

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row mr-4">
        <div className="ml-2 mb-2 sm:mb-4 bg-blue-200/40 backdrop-blur-lg border border-black w-full h-full">
          <div className="p-4 shadow-sm shadow-black ">
            <div className="font-bold text-2xl text-black">
              Аккаунт: {user.email}
            </div>
            <div className="text-gray-200 ">Просмотрено: 0</div>
            <div className="text-gray-200">Отложено: 0</div>
            <div className="text-gray-200">В любимых: 0</div>
          </div>
        </div>

        <div className=" w-full h-full flex flex-wrap">
          <div className="w-[200px] h-[300px] ml-2 mr-2 mb-4 bg-yellow-400/40"></div>
          <div className="w-[200px] h-[300px] ml-2 mr-2 mb-4 bg-yellow-400/40"></div>
          <div className="w-[200px] h-[300px] ml-2 mr-2 mb-4 bg-yellow-400/40"></div>
          <div className="w-[200px] h-[300px] ml-2 mr-2 mb-4 bg-yellow-400/40"></div>
          <div className="w-[200px] h-[300px] ml-2 mr-2 mb-4 bg-yellow-400/40"></div>
        </div>
      </div>
    </div>
  );
};

export default Account;
