import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow } from "swiper";
import Movie from "../сomponents/Movie";
import { useNavigate } from "react-router";

const Home = () => {
  const [movie, setMovie] = useState<any>();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios.get(`https://api.anilibria.tv/v2/getRandomTitle`).then((response) => {
      setMovie(response.data);
    });
    axios
      .get(`https://api.anilibria.tv/v2/getChanges?limit=10`)
      .then((response) => {
        setMovies(response.data);
      });
  }, []);
  const SliceDesc = (text: string, n: number) => {
    return text?.slice(0, n) + "...";
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-black/40 backdrop-blur-sm border border-black pb-4 h-[80%]  ml-[16px] mr-[16px]">
        <div className="flex flex-col justify-center sm:flex-row h-full pt-6 pl-6 pr-6">
          <div className="flex justify-center min-w-[160px] sm:min-w-[260px]">
            <img
              className="min-w-[160px] mb-[16px] sm:mb-0 shadow-sm sm:shadow-3xl shadow-white"
              alt="anime"
              onClick={() => navigate(`/anime?id=${movie?.id}`)}
              src={`https://dl-20211030-963.anilib.top/${movie?.posters.medium.url}`}
            />
          </div>
          <div className="pl-4 flex flex-col justify-end text-white">
            <p className="font-bold pb-4">{movie?.names.ru}</p>
            <p className="font-light w-full md:mx-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
              {SliceDesc(movie?.description, 200)}
            </p>
          </div>
        </div>
      </div>
      <div className="  relative sm:mr-6 sm:ml-6 pl-2 pr-2 mt-8 mb-8">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow]}
          className="w-full "
        >
          {movies.map((movie: any, index) => (
            <SwiperSlide key={index} className={`w-[200px] sm:w-[300px] `}>
              <Movie item={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Home;
