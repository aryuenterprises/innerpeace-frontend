import React, { useEffect, useState, useCallback } from "react";
import { IoCompassSharp } from "react-icons/io5";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import common_rooms_zostel from "../assets/mountain.webp";
import { IoStarSharp } from "react-icons/io5";
import call_icon from "../assets/call-white.svg";
import map_white from "../assets/map-white.svg";
import group from "../assets/Group.svg";
import india1 from "../assets/india1.png";
import india2 from "../assets/india2.png";

function Hero() {
  const [homeImage, setHomeImage] = useState([]);
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(true); // Add a loading state
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === homeImage.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [homeImage.length]);

  const handleInputChange = (event) => {
    setCityName(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value); // Update date state on change
  };

  const handleSearch = () => {
    if (cityName.trim()) {
      const formattedCityName = cityName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // Replace special characters with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with a single one
        .replace(/^-+|-+$/g, ""); // Trim hyphens from the start and end

      navigate(`/home-filter/${formattedCityName}`, {
        state: { city_name: cityName, date: selectedDate },
      });
    }
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    async function getApiData() {
      await axios

        .get(`https://backoffice.innerpece.com/api/v1/get-combined-data`)
        .then((response) => {
          setHomeImage(response.data.data.sliders);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }

    getApiData();
  }, []);

  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="hero-container relative overflow-hidden">
      <div className="relative w-full h-[75vh] md:h-[93vh] overflow-hidden">
        {/* Parallax Image */}
        <img
          src={common_rooms_zostel}
          alt=""
          className="absolute inset-0 w-full h-full object-cover overflow-hidden"
          style={{ transform: `translateY(${offsetY * 0.3}px)` }}
        />

        {/* Gradient Overlay */}
        <div className="absolute w-full h-full z-10 bg-gradient-to-b from-transparent to-black"></div>

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

          <div className=" gap-2 md:gap-3 hidden md:flex items-center justify-center">
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
