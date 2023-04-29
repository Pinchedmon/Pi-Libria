import axios from "axios";
import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper";
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
    <div className="relative h-full ">
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="w-full h-[100px] bg-purple-400/10 "
      >
        {genres.map((item: any, index) => (
          <SwiperSlide
            onClick={() => setSelectedGenre(item)}
            key={index}
            className="cursor-pointer flex h-[50px ]justify-center text-white items-center"
          >
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex"></div>
      {movies.map((movie: any, index) => (
        <>
          <Movie item={movie} />
        </>
      ))}
    </div>
  );
};

export default Collection;
