import React from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function DestinationsDetailsHero({ apiData }) {

  let navigate = useNavigate();

  return (
    <div className="mt-4 md:mt-7 ms-3 me-3 md:ms-10 md:me-10 ">
      <div className="gap-3 mt-4 items-center justify-between inline-flex bg-sky-100/80 font-semibold text-sky-800 p-2 rounded-lg">
        <p onClick={() => navigate("/")} className="cursor-pointer">
          Home
        </p>
        <b>{">"}</b>

        <p className="">{`Explore ${
          apiData.length > 0 ? apiData[0].title : ""
        }`}</p>
      </div>

      <div
        id="hero"
        className="h-64 md:h-80  lg:h-[380px] rounded-lg mt-8 md:mt-10 lg:mt-16 relative bg-[url('././assets/explorepopularpackagehero.jpg')] bg-cover bg-center"
      >
        <div
          id="blur"
          className="absolute h-[60%] w-[85%] md:w-[65%] lg:w-[60%] rounded-lg flex flex-col justify-center top-11 md:top-10 lg:top-16 left-6 md:left-10 lg:left-16 px-3 py-1 md:px-8 md:py-3 bg-[url('././assets/blurbg.png')] bg-cover bg-center"
        >
          <h1 className="text-white text-lg md:text-2xl lg:text-4xl font-semibold">{`Explore ${
            apiData.length > 0 ? apiData[0].title : ""
          }`}</h1>
          <p className="text-white text-sm md:text-base mt-2 ">
            Find your perfect tour with personalized themes and destinations to
            match your preferences
          </p>
        </div>

        <div className="w-[180px] h-[40px] md:h-auto md:w-[250px] lg:w-[270px] absolute rounded top-[160px] flex items-center justify-between flex-shrink left-16 mt-3 sm:top-40 md:top-48 md:left-24 lg:top-60 xl:top-60 lg:left-36 bg-white  gap-1  md:gap-3 p-1 py-1">
          <span className="ms-3">
            {" "}
            <IoIosSearch className="md:text-2xl" />
          </span>

          <input
            type="text"
            className="outline-none w-[50px] md:w-[80px] lg:w-[100px]"
            placeholder="Search Events "
          />

          <button
            style={{ background: "#283D74" }}
            className=" text-white px-1 py-1  md:px-6 md:py-2 rounded font-semibold"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default DestinationsDetailsHero;
