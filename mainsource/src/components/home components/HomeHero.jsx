import React, { useEffect, useState } from "react";
import common_rooms_zostel from "../../assets/mountain.webp";
import { IoStarSharp } from "react-icons/io5";
import call_icon from "../../assets/call-white.svg";
import map_white from "../../assets/map-white.svg";
import group from "../../assets/Group.svg";
import ParallaxImage2 from "../ParallexImage2";

function Hero() {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="hero-container relative overflow-hidden h-full">
      <div className="relative w-full h-[75vh] md:h-[100vh] ">
        {/* Parallax Image */}
        {/* <img
          src={common_rooms_zostel}
          alt=""
          className="absolute inset-0 w-full h-full object-cover overflow-hidden"
          // style={{ transform: `translateY(${offsetY * 0.3}px)` }}
        /> */}

        {/* <ParallaxImage
          src={common_rooms_zostel}
          alt=""
          className="absolute inset-0 w-full h-full object-cover overflow-hidden   flex-grow transform transition-transform duration-500 group-hover:scale-125   bg-center "
        /> */}

        <ParallaxImage2
          src={common_rooms_zostel}
          alt=""
          // className="inset-0 w-full h-full object-cover"
          className="absolute inset-0 w-full h-full object-cover overflow-hidden   flex-grow transform transition-transform duration-500 group-hover:scale-125   bg-center "
        />

        {/* Gradient Overlay */}
        <div className="absolute w-full h-full z-10 bg-gradient-to-b from-transparent to-black/60"></div>

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center z-10 justify-center px-5 md:px-20">
          <p
            style={{ textShadow: "3px 3px 3px rgba(0, 0, 0, 0.8)" }}
            className="text-white uppercase font-semibold text-center text-xl sm:text-2xl md:text-3xl font-jost lg:text-4xl xl:text-5xl leading-8"
          >
            The first offbeat travel platform In India
          </p>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-8  absolute w-full z-10 bottom-8 font-jost text-white items-center justify-between px-5 md:px-10">
          {/* Google Rating */}
          <div className="flex gap-2 md:gap-3  items-center justify-center  ">
            <p className="font-semibold text-lg lg:text-2xl xl:text-3xl">5.0</p>
            <div className="flex flex-col gap-1">
              <p className="font-medium lg:font-semibold text-sm md:text-base lg:text-xl">
                Google Rating
              </p>
              <div className="flex">
                <IoStarSharp className="text-yellow-400" />
                <IoStarSharp className="text-yellow-400" />
                <IoStarSharp className="text-yellow-400" />
                <IoStarSharp className="text-yellow-400" />
                <IoStarSharp className="text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Trusted By */}
          <div className="flex gap-2 md:gap-3  items-center justify-center">
            <img src={group} alt="" className="h-6 w-6 md:h-8 md:w-8" />
            <div className="flex flex-col gap-1">
              <p className="font-medium lg:font-semibold text-sm md:text-base lg:text-xl">
                Trusted by
              </p>
              <p className="text-xs md:text-sm">10k+ Travellers</p>
            </div>
          </div>

          {/* Customized Trips */}
          <div className="flex gap-2 md:gap-3  items-center justify-center">
            <img src={map_white} alt="" className="h-6 w-6 md:h-8 md:w-8" />
            <div className="flex flex-col gap-1">
              <p className="font-medium lg:font-semibold text-sm md:text-base lg:text-xl">
                Customized Trips
              </p>
              <p className="text-xs md:text-sm">200+ Iteneraries</p>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="flex gap-2 md:gap-3  items-center justify-center">
            <img src={call_icon} alt="" className="h-6 w-6 md:h-8 md:w-8" />
            <div className="flex flex-col gap-1">
              <p className="font-medium lg:font-semibold text-sm md:text-base lg:text-xl">
                24/7 Support
              </p>
              <p className="text-xs md:text-sm">Tamil, Hindi & English</p>
            </div>
          </div>

          {/* incubated at */}
          <div className=" gap-2 md:gap-3 hidden md:flex items-center flex-col justify-center">
            <p className="font-medium lg:font-semibold text-sm md:text-base lg:text-xl">
              Incubated at
            </p>

            <img
              src={`https://backoffice.innerpece.com/uploads/settings/official_logo/1724229229_1.PNG`}
              alt=""
              className="bg-cover w-44 h-16 "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
