import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Anime from "./pages/Anime";
import Navbar from "./сomponents/Navbar";
import img from "./assets/image 2.png";
import Collection from "./pages/Collection";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";

function App() {
  return (
    <div className="w-full h-full">
      <img
        className="hidden sm:block fixed w-full h-full object-cover"
        src={img}
        alt="logo"
      />
      <div className="z-5 bg-purple-700 sm:bg-black/50 fixed top-0 left-0 w-full h-screen"></div>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
