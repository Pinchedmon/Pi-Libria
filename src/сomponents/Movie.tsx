import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Imovie } from "../types/Imovie";
interface props {
  item: Imovie;
}
const Movie = ({ item }: props) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  //   const { user } = UserAuth();
  //   const movieId = doc(db, "users", `${user?.email}`);
  //   const saveShow = async () => {
  //     if (user?.email) {
  //       setLike(!like);
  //       setSaved(true);
  //       await updateDoc(movieId, {
  //         savedShows: arrayUnion({
  //           id: item.id,
  //           title: item.title,
  //           img: item.backdrop_path,
  //         }),
  //       });
  //     }
  //   };
  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-auto block"
        src={`https://dl-20211030-963.anilib.top/${item?.posters.medium.url}`}
        alt={item?.names.ru}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {item?.names.ru}
        </p>
        <p>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;
