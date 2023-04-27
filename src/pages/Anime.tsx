import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Imovie } from "../types/Imovie";
import { VideoJS } from "../utils/VideoJs";

const Anime = () => {
  const location = useLocation();
  const [movie, setMovie] = useState<Imovie>();
  const [value, setValue] = useState<any>("1");

  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: `https://${movie?.player.host}${movie?.player.playlist[value].hls.hd}`,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
  };

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
          <div className="bg-black/40 backdrop-blur-sm pb-4 h-[80%] rounded-2xl ml-[16px] mr-[16px]">
            <div className="flex flex-col justify-center sm:flex-row h-full pt-6 pl-6 pr-6">
              <div className="flex justify-center min-w-[160px] sm:min-w-[260px]">
                <img
                  className="min-w-[160px] rounded-xl"
                  alt="anime"
                  src={`https://dl-20211030-963.anilib.top/${movie?.posters.medium.url}`}
                />
              </div>
              <div className="pl-4 flex flex-col justify-end text-white">
                <p className="font-bold pb-4">{movie?.names.ru}</p>
                <p className="font-light w-full md:mx-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
                  {movie?.description}
                </p>
              </div>
            </div>
            {playlist.at(-1) ? (
              <div className="p-6">
                <select value={value} onChange={handleChange}>
                  {playlist.map((list: any) => (
                    <option value={list}>{list} серия</option>
                  ))}
                </select>
                <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
              </div>
            ) : (
              <p>Просмотр недоступен</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Anime;
