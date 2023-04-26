import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Imovie } from "../types/Imovie";
import { Video } from "../utils/VideoJs";

const Anime = () => {
  const location = useLocation();
  const [movie, setMovie] = useState<Imovie>();
  const [value, setValue] = useState<any>("1");
  const play = {
    fill: true,
    fluid: true,
    autoplay: true,
    controls: true,
    preload: "metadata",
    sources: [
      {
        src: `https://${movie?.player.host}${movie?.player.playlist[value].hls.hd}`,
        type: "application/x-mpegURL",
      },
    ],
  };
  let playlist: any;
  if (movie) {
    playlist = Object.keys(movie.player.playlist);
  }
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };
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
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <div className="relative">
      {movie && (
        <>
          <p> {movie?.names.ru}</p>
          <p>{movie?.description}</p>
          <img
            src={`https://dl-20211030-963.anilib.top${movie?.posters.medium.url}`}
            alt="img"
          />
          {playlist.at(-1) ? (
            <>
              <select value={value} onChange={handleChange}>
                {playlist.map((list: any) => (
                  <option value={list}>{list} серия</option>
                ))}
              </select>
              <Video {...play} />
            </>
          ) : (
            <p>Просмотр недоступен</p>
          )}
        </>
      )}
    </div>
  );
};

export default Anime;
