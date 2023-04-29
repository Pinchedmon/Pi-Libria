import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Imovie } from "../types/Imovie";
import { VideoJS } from "../utils/VideoJs";
import Select from "react-select";

const Anime = () => {
  const location = useLocation();
  const [movie, setMovie] = useState<Imovie>();
  const [value, setValue] = useState<any>({ value: "1", label: "1" });

  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: `https://${movie?.player.host}${
          movie?.player.playlist[value.value].hls.hd
        }`,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
  };

  let playlist: any;
  let options: any[] = [];
  if (movie) {
    playlist = Object.keys(movie.player.playlist);
    playlist.map((list: any) => options.push({ value: list, label: list }));
  }

  const handleChange = (e: any) => {
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
                <p className="font-light w-full  text-gray-200">
                  {movie?.description}
                </p>
              </div>
            </div>
            {playlist.at(-1) ? (
              <div className="p-6">
                <Select
                  className="w-[100px] bg-black"
                  options={options}
                  value={value}
                  onChange={setValue}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,

                    colors: {
                      ...theme.colors,
                      primary: "black",
                    },
                  })}
                />

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
