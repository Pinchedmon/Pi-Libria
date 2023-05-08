import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Imovie } from "../types/Imovie";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc, arrayRemove } from "firebase/firestore";
interface props {
  item: Imovie;
}
const Movie = ({ item }: props) => {
  const [like, setLike] = useState(false);

  const navigate = useNavigate();
  const { user, store } = UserAuth();
  const movieId = doc(db, "users", `${user?.email}`);
  useEffect(() => {
    setLike(
      store?.likedShows.find((movie: any) => movie.id === item?.id)?.id ===
        item?.id
    );
  }, [store, item]);

  const likeShow = async () => {
    if (user?.email) {
      setLike(!like);

      !like
        ? await updateDoc(movieId, {
            likedShows: arrayUnion({
              id: item.id,
              title: item.names.ru,
              img: item.posters.medium.url,
            }),
          })
        : await updateDoc(movieId, {
            likedShows: arrayRemove({
              id: item.id,
              title: item.names.ru,
              img: item.posters.medium.url,
            }),
          });
    }
  };

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-auto block"
        src={`https://dl-20211030-963.anilib.top/${item?.posters.medium.url}`}
        alt={item?.names.ru}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p
          onClick={() => navigate(`/anime?id=${item?.id}`)}
          className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center"
        >
          {item?.names.ru}
        </p>
        <p onClick={likeShow}>
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
