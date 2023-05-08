import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Imovie } from "../types/Imovie";
import { VideoJS } from "../utils/VideoJs";
import Select from "react-select";
import { UserAuth } from "../context/AuthContext";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Anime = () => {
  const { user, store } = UserAuth();
  const location = useLocation();
  const [movie, setMovie] = useState<Imovie>();
  const [value, setValue] = useState<any>({ value: "1", label: "1" });
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
  const [like, setLike] = useState(false);
  const [future, setFuture] = useState(false);
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    setFuture(
      store?.futureShows.find((item: any) => item.id === movie?.id)?.id ===
        movie?.id
    );
    setWatched(
      store?.watchedShows.find((item: any) => item.id === movie?.id)?.id ===
        movie?.id
    );
    setLike(
      store?.likedShows.find((item: any) => item.id === movie?.id)?.id ===
        movie?.id
    );
  }, [movie, store]);
  const playerRef = React.useRef(null);
  const movieId = doc(db, "users", `${user?.email}`);

  const videoJsOptions = {
    autoplay: false,
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
  const likedShow = async () => {
    if (user?.email) {
      setLike(!like);
      !like
        ? await updateDoc(movieId, {
            likedShows: arrayUnion({
              id: movie?.id,
              title: movie?.names.ru,
              img: movie?.posters.medium.url,
            }),
          })
        : await updateDoc(movieId, {
            likedShows: arrayRemove({
              id: movie?.id,
              title: movie?.names.ru,
              img: movie?.posters.medium.url,
            }),
          });
    }
  };
  const watchedShow = async () => {
    if (user?.email) {
      setWatched(!watched);
      !watched
        ? await updateDoc(movieId, {
            watchedShows: arrayUnion({
              id: movie?.id,
              title: movie?.names.ru,
              img: movie?.posters.medium.url,
            }),
          })
        : await updateDoc(movieId, {
            watchedShows: arrayRemove({
              id: movie?.id,
              title: movie?.names.ru,
              img: movie?.posters.medium.url,
            }),
          });
    }
  };
  const futureShow = async () => {
    if (user?.email) {
      setFuture(!future);
      !future
        ? await updateDoc(movieId, {
            futureShows: arrayUnion({
              id: movie?.id,
              title: movie?.names.ru,
              img: movie?.posters.medium.url,
            }),
          })
        : await updateDoc(movieId, {
            futureShows: arrayRemove({
              id: movie?.id,
              title: movie?.names.ru,
              img: movie?.posters.medium.url,
            }),
          });
    }
  };

  return (
    <div className="relative">
      {movie && store && (
        <>
          <div className="bg-black/40 backdrop-blur-sm pb-4  border border-black ml-[16px] mr-[16px]">
            <div className="flex flex-col justify-center sm:flex-row h-full pt-6 pl-6 pr-6">
              <div className="flex justify-center min-w-[160px] sm:min-w-[260px]">
                <img
                  className="min-w-[160px] mb-6 sm:mb-0 rounded-xl shadow-sm sm:shadow-3xl shadow-white"
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
            <div className="p-6">
              <button
                onClick={likedShow}
                className={`p-2 mr-2 ${
                  like
                    ? "bg-white border-green-400"
                    : "bg-green-400 border-black"
                }  border `}
              >
                лайкнуть
              </button>
              <button
                onClick={futureShow}
                className={`p-2 mr-2 ${
                  future
                    ? "bg-white border-yellow-400"
                    : "bg-yellow-400 border-black"
                }  border `}
              >
                отложить
              </button>
              <button
                onClick={watchedShow}
                className={`p-2 ${
                  watched
                    ? "bg-white border-blue-400"
                    : "bg-blue-400 border-black"
                }  border `}
              >
                просмотрено
              </button>
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
