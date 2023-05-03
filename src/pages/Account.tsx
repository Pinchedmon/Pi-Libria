import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

const Account = () => {
  const { user } = UserAuth();
  const [data, setData] = useState<any>();
  const getCollection = async () => {
    const citiesRef = collection(db, "users");
    const docsSnap = await getDocs(citiesRef);
    docsSnap.forEach((doc) => {
      setData(doc.data());
    });
  };
  useEffect(() => {
    getCollection();
  }, []);
  console.log(data);

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row mr-4">
        <div className="ml-2 mb-2 sm:mb-4 bg-blue-200/40 backdrop-blur-lg border border-black w-full h-full">
          <div className="p-4 shadow-sm shadow-black ">
            <div className="font-bold text-2xl text-black">
              Аккаунт: {user.email}
            </div>
            {data ? (
              <>
                {" "}
                <div className="text-gray-200 ">
                  Просмотрено: {Object.keys(data.watchedShows).length}
                </div>
                <div className="text-gray-200">
                  Отложено: {Object.keys(data.futureShows).length}
                </div>
                <div className="text-gray-200">
                  В любимых: {Object.keys(data.likedShows).length}
                </div>
              </>
            ) : (
              ""
            )}
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
