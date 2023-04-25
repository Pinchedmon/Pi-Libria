import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Imovie } from "../types/Imovie";

const Anime = () => {
  const location = useLocation();
  const [movie, setMovie] = useState<Imovie>();

  useEffect(() => {
    axios
      .get(
        `https://api.anilibria.tv/v2/getTitle?id=${location.search.slice(
          4,
          location.search.length
        )}`
      )
      .then((response) => {
        setMovie(response.data);
      });
  }, []);

  return (
    <div className="relative">
      <p> {movie?.names.ru}</p>
      <p>{movie?.description}</p>
      <img
        src={`https://dl-20211030-963.anilib.top${movie?.posters.medium.url}`}
        alt="img"
      />
      =
      <video width="100%" height="100%" controls>
        <source
          src="https://cache.libria.fun/videos/media/ts/9362/1/720/fef0b136205e783e3844d31e4f1d3a8b.m3u8"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default Anime;
