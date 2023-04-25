import React, { useEffect, useState } from "react";
import axios from "axios";
import Row from "../сomponents/Row";

const Home = () => {
  const [movie, setMovie] = useState<any>();
  useEffect(() => {
    axios.get(`https://api.anilibria.tv/v2/getRandomTitle`).then((response) => {
      setMovie(response.data);
      console.log(movie);
    });
  }, []);
  const SliceDesc = (text: string, n: number) => {
    return text?.slice(0, n) + "...";
  };
  return (
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
              {SliceDesc(movie?.description, 200)}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-black/60 rounded-2xl relative ml-12 mr-12 pl-2 pr-2 mt-8 mb-8">
        <Row
          rowId={"1"}
          title={"Последние изменения"}
          fetchURL={"https://api.anilibria.tv/v2/getChanges?limit=10"}
        />
      </div>
    </>
  );
};

export default Home;
