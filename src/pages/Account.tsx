import React from "react";
import { UserAuth } from "../context/AuthContext";

import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
const Account = () => {
  const { user, store } = UserAuth();
  const navigate = useNavigate();
  return (
    <div className="relative">
      {store && (
        <>
          <div className="flex flex-col  mr-4">
            <div className="ml-2 mb-2 sm:mb-4 bg-blue-200/40 backdrop-blur-lg border border-black w-full h-full">
              <div className="p-4 shadow-sm shadow-black ">
                <div className="font-bold text-2xl text-black">
                  Аккаунт: {user.email}
                </div>

                <div className="text-gray-200 ">
                  Просмотрено: {Object.keys(store.watchedShows).length}
                </div>
                <div className="text-gray-200">
                  Отложено: {Object.keys(store.futureShows).length}
                </div>
                <div className="text-gray-200">
                  В любимых: {Object.keys(store.likedShows).length}
                </div>
              </div>
            </div>

            <div className=" w-full h-full flex flex-col items-center">
              <p className="p-4 m-2  text-white border">future</p>
              <div className="w-full">
                <Swiper
                  slidesPerView={window.screen.width > 700 ? 5 : 3}
                  spaceBetween={10}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                >
                  {store.futureShows.map((item: any, index: string) => (
                    <SwiperSlide>
                      <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
                        <img
                          className="w-full h-auto block"
                          src={`https://dl-20211030-963.anilib.top/${item?.img}`}
                          alt={item?.title}
                        />
                        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                          <p
                            onClick={() => navigate(`/anime?id=${item?.id}`)}
                            className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center"
                          >
                            {item?.title}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <p className="p-4 m-2 text-white border">watched</p>
              <div className="w-full">
                <Swiper
                  slidesPerView={window.screen.width > 700 ? 5 : 3}
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                >
                  {store.watchedShows.map((item: any, index: string) => (
                    <SwiperSlide>
                      <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
                        <img
                          className="w-full h-auto block"
                          src={`https://dl-20211030-963.anilib.top/${item?.img}`}
                          alt={item?.title}
                        />
                        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                          <p
                            onClick={() => navigate(`/anime?id=${item?.id}`)}
                            className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center"
                          >
                            {item?.title}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <p className="p-4 m-2  text-white border">liked</p>
              <div className="w-full">
                <Swiper
                  slidesPerView={window.screen.width > 700 ? 5 : 3}
                  spaceBetween={0}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                >
                  {store.likedShows.map((item: any, index: string) => (
                    <SwiperSlide>
                      <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
                        <img
                          className="w-full h-auto block"
                          src={`https://dl-20211030-963.anilib.top/${item?.img}`}
                          alt={item?.title}
                        />
                        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                          <p
                            onClick={() => navigate(`/anime?id=${item?.id}`)}
                            className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center"
                          >
                            {item?.title}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
