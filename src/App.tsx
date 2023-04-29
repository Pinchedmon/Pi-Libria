import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Anime from "./pages/Anime";
import Navbar from "./сomponents/Navbar";
import img from "./assets/image 2.png";
import Collection from "./pages/Collection";
function App() {
  return (
    <div className="w-full h-full">
      <img
        className="hidden sm:block fixed w-full h-full object-cover"
        src={img}
        alt="logo"
      />
      <div className="z-5 bg-black/60 fixed top-0 left-0 w-full h-screen"></div>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/anime*" element={<Anime />} />
      </Routes>
    </div>
  );
}

export default App;
