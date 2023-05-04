import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode } from "swiper";
import Movie from "../сomponents/Movie";

const Collection = () => {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  useEffect(() => {
    axios.get(`https://api.anilibria.tv/v2/getGenres`).then((response: any) => {
      setGenres(response.data);
    });
  }, []);
  useEffect(() => {
    if (selectedGenre) {
      axios
        .get(
          `https://api.anilibria.tv/v2/searchTitles?genres=${selectedGenre}&limit=20`
        )
        .then((response: any) => {
          setMovies(response.data);
          console.log(movies);
        });
    }
  }, [selectedGenre]);
  return (
    <div className="relative h-full  ">
      <Swiper
        slidesPerView={window.screen.width > 700 ? 5 : 3}
        spaceBetween={5}
        freeMode={true}
        modules={[FreeMode]}
        className="w-full h-full py-4 bg-purple-400/10 "
      >
        {genres.map((item: any, index) => (
          <SwiperSlide
            onClick={() => setSelectedGenre(item)}
            key={index}
            className=" border text-sm border-white rounded-xl  cursor-pointer flex justify-center text-white items-center"
          >
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex flex-wrap justify-center">
        {movies.map((movie: any, index) => (
          <>
            <Movie item={movie} />
          </>
        ))}
      </div>
    </div>
  );
};

export default Collection;
