import React, { useEffect, useState } from "react";
import common_rooms_zostel from "../../assets/mountain.webp";
import { IoStarSharp } from "react-icons/io5";
import call_icon from "../../assets/call-white.svg";
import map_white from "../../assets/map-white.svg";
import group from "../../assets/Group.svg";
import ParallaxImage2 from "../ParallexImage2";
import Marquee from "react-fast-marquee";
import home_Hero_Compass from "../../assets/home-hero-compass.svg";
import home_Hero_image1 from "../../assets/home-hero-image1.webp";
import home_Hero_image2 from "../../assets/home-hero-image2.webp";
import home_Hero_image3 from "../../assets/home-hero-image3.webp";
// import home_Hero_image4 from "../../assets/home-hero-image4.webp";
import home_Hero_image5 from "../../assets/home-hero-image5.webp";
import home_Hero_image6 from "../../assets/home-hero-image6.webp";
import home_Hero_image7 from "../../assets/home-hero-image7.jpg";
import home_Hero_image8 from "../../assets/home-hero-image8.webp";
import home_Hero_image9 from "../../assets/home-hero-image9.jpg";
import home_Hero_image10 from "../../assets/home-hero-image10.webp";
import home_Hero_image11 from "../../assets/home-hero-image11.webp";
import home_Hero_image12 from "../../assets/home-hero-image12.webp";

import HomeHeader from "../HomeHeader";
import axios from "axios";
import { motion } from "framer-motion";

function Hero() {
  // let a=useSra
  const [apiImages, setApiImages] = useState([]);

  const placeholders = [
    "Search for Goa...",
    "Search for Manali...",
    "Search for Munnar...",
    "Search for Ladakh...",
    "Search for Tamilnadu...",
    "Search for Kerala...",
  ];

  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    async function getApiData() {
      await axios

        .get(
          `https://backoffice.innerpece.com/api/v1/get-combined-data`
        )
        .then((response) => {
          let apiData = response.data.data.sliders;
          let images = apiData.map((item, index) => item.slider_image);
          setApiImages(images);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getApiData();
  }, []);

  //  Typewriter effect
  useEffect(() => {
    const currentText = placeholders[index];
    let typingSpeed = deleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!deleting && charIndex < currentText.length) {
        setDisplayText(currentText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (deleting && charIndex > 0) {
        setDisplayText(currentText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!deleting && charIndex === currentText.length) {
        setTimeout(() => setDeleting(true), 1500);
      } else if (deleting && charIndex === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % placeholders.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, index]);

  // const heroImages = [
  //   home_Hero_image1,
  //   home_Hero_image2,
  //   home_Hero_image3,
  //   // home_Hero_image4,
  //   home_Hero_image5,
  //   home_Hero_image6,
  //   home_Hero_image7,
  //   home_Hero_image8,
  //   home_Hero_image9,
  //   home_Hero_image10,
  //   home_Hero_image11,
  //   home_Hero_image12,
  // ];


console.log(apiImages)
  useEffect(() => {
    if (apiImages.length === 0) return; // ✅ wait for images to load

    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % apiImages.length);
    }, 7000); // Change every 5 seconds

    return () => clearInterval(interval); // cleanup
  }, [apiImages]); // ✅ only re-run when images change

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimeout(() => {
  //       setCurrentBgIndex((prev) => (prev + 1) % apiImages.length);
  //     }, 600); // Fade duration
  //   }, 1000); // Change image every 5s

  //   return () => clearInterval(interval);
  // }, [currentBgIndex]);

  const textLines = ["The First Offbeat Travel", "Platform In India"];

  // Animation for the whole line (to stagger letters)
  const lineVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07, // delay between each letter
      },
    },
  };

  // Animation for each letter
  const letterVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.6 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="hero-container relative overflow-hidden h-full">
      <div className="relative w-full h-[75vh] md:h-[105vh]">
        {/* Background Image */}
        {/* <ParallaxImage2
          src={common_rooms_zostel}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover overflow-hidden flex-grow transform transition-transform duration-500 group-hover:scale-110 bg-center"
        /> */}
        <div className="absolute w-full h-24 top-0 z-10 bg-gradient-to-b from-black/40 from-0% to-transparent"></div>

        <HomeHeader />

        {apiImages.map((img, i) => (
          <ParallaxImage2
            key={i}
            src={img}
            alt={`Hero Background ${i}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              i === currentBgIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Gradient Overlay */}
        <div className="absolute w-full h-full z-10 bg-gradient-to-b from-transparent from-35% to-black/90"></div>

        {/* Center Text & Search Box */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-5 md:px-20">
          <p
            style={{ textShadow: "3px 3px 5px rgba(0, 0, 0, 0.5)" }}
            className="text-white  font-semibold text-xl sm:text-2xl md:text-3xl font-jost lg:text-4xl xl:text-5xl  mb-1"
          >
            The First Offbeat Travel
          </p>

          <p
            style={{ textShadow: "3px 3px 5px rgba(0, 0, 0, 0.5)" }}
            className="text-white  font-semibold text-xl sm:text-2xl md:text-3xl font-jost lg:text-4xl xl:text-5xl  mb-6"
          >
            Platform In India
          </p>

          {/* {textLines.map((line, i) => (
            <motion.div
              key={i}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              transition={{ delayChildren: i * 0.8 }}
              className="overflow-hidden"
              style={{
                textShadow: "3px 3px 5px rgba(0, 0, 0, 0.5)",
              }}
            >
              {line.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  style={{ display: "inline-block" }}
                  className="text-white font-semibold text-xl sm:text-2xl md:text-3xl font-jost lg:text-4xl xl:text-5xl mb-1"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>
          ))} */}

          {/* 🔍 Search Input with Typewriter Placeholder */}
          {/* <div className=" w-full max-w-sm flex gap-3 px-5 py-3 rounded-2xl bg-transparent backdrop-blur-sm  border-white border-2">
            <img src={home_Hero_Compass} alt="" />
            <input
              type="text"
              placeholder={displayText}
              className="w-full  font-jost text-base md:text-lg text-white placeholder:text-white outline-none transition duration-300 bg-transparent"
            />
          </div> */}
        </div>

        {/*  Bottom Stats (Desktop) */}
        <div className="grid grid-cols-2 max-md:hidden md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-8 absolute w-full z-10 bottom-8 font-jost text-white items-center justify-between px-5 md:px-10">
          {/* Google Rating */}
          <div className="flex gap-2 md:gap-3 items-center justify-center">
            <p className="font-semibold text-lg lg:text-2xl xl:text-3xl">5.0</p>
            <div className="flex flex-col gap-1">
              <p className="font-medium lg:font-semibold text-sm md:text-base lg:text-xl">
                Google Rating
              </p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <IoStarSharp key={i} className="text-yellow-400" />
                ))}
              </div>
            </div>
          </div>

          {/* Trusted By */}
          <div className="flex gap-2 md:gap-3 items-center justify-center">
            <img src={group} alt="" className="h-6 w-6 md:h-8 md:w-8" />
            <div className="flex flex-col gap-1">
              <p className="font-medium lg:font-semibold text-sm md:text-base lg:text-xl">
                Trusted by
              </p>
              <p className="text-xs md:text-sm">10k+ Travellers</p>
            </div>
          </div>

          {/* Customized Trips */}
          <div className="flex gap-2 md:gap-3 items-center justify-center">
            <img src={map_white} alt="" className="h-6 w-6 md:h-8 md:w-8" />
            <div className="flex flex-col gap-1">
              <p className="font-medium lg:font-semibold text-sm md:text-base lg:text-xl">
                Customized Trips
              </p>
              <p className="text-xs md:text-sm">200+ Itineraries</p>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="flex gap-2 md:gap-3 items-center justify-center">
            <img src={call_icon} alt="" className="h-6 w-6 md:h-8 md:w-8" />
            <div className="flex flex-col gap-1">
              <p className="font-medium lg:font-semibold text-sm md:text-base lg:text-xl">
                24/7 Support
              </p>
              <p className="text-xs md:text-sm">Tamil, Hindi & English</p>
            </div>
          </div>

          {/* Incubated At */}
          <div className="gap-2 md:gap-3 flex items-center flex-col justify-center">
            <p className="font-medium lg:font-semibold text-sm md:text-base lg:text-xl">
              Incubated at
            </p>
            <img
              src="https://backoffice.innerpece.com/uploads/settings/official_logo/1724229229_1.PNG"
              alt="Incubation Logo"
              className="bg-cover w-44 h-16"
            />
          </div>
        </div>

        {/*  Mobile Marquee */}
        <div className="block md:hidden absolute bottom-8 w-fit z-10 text-white">
          <Marquee
            pauseOnHover={false}
            gradient={false}
            speed={40}
            loop={0}
            className="flex items-center gap-10 md:hidden absolute bottom-8 z-10 text-white"
          >
            {/* Google Rating */}
            <div className="flex gap-2 items-center justify-center mx-6">
              <p className="font-semibold text-lg">5.0</p>
              <div className="flex flex-col gap-1">
                <p className="text-sm">Google Rating</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <IoStarSharp key={i} className="text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* 24/7 Support */}
            <div className="flex gap-2 items-center justify-center mx-6">
              <img src={call_icon} alt="" className="h-6 w-6" />
              <div className="flex flex-col gap-1">
                <p className="text-sm">24/7 Support</p>
                <p className="text-xs">Tamil, Hindi & English</p>
              </div>
            </div>

            {/* Incubated At */}
            <div className="flex flex-col items-center justify-center mx-6">
              <p className="text-sm">Incubated at</p>
              <img
                src="https://backoffice.innerpece.com/uploads/settings/official_logo/1724229229_1.PNG"
                alt=""
                className="bg-cover w-32 h-12"
              />
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
}

export default Hero;
