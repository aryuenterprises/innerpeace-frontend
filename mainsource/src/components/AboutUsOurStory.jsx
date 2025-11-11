import React, { useEffect, useState } from "react";
import VideoBox1 from "../assets/VideoBox1.png";
import VideoBox2 from "../assets/VideoBox2.png";
import VideoBox3 from "../assets/VideoBox3.png";

import aboutusimg1 from "../assets/aboutusimg1.png";
import aboutusimg2 from "../assets/aboutusimg2.png";
import aboutusimg3 from "../assets/aboutusimg3.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function OurStory() {
  let navigate = useNavigate();

  function handleBtnClick() {
    navigate("/login");
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [aboutusimg3, aboutusimg2, aboutusimg1];

  // Auto-change image every 3s
  useEffect(() => {
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="bg-gradient-to-b mt-8 md:mt-20 pb-5 md:pb-20 px-5 md:px-12  lg:px-24  xl:px-32 from-sky-800 to-black ">
      <div className="flex pt-8 md:pt-16 items-center gap-8 w-full md:w-2/3">
        <hr className="w-20 md:w-80 hidden sm:block border-white" />

        <div className="flex flex-col gap-3 text-white">
          <p className="tracking-widest font-dmSans">OUR STORY</p>
          <p className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-medium font-dmSans">
            The Journey to Innerpece
          </p>
        </div>
      </div>

      {/* <div className="sm:flex flex-wrap hidden  flex-shrink gap-8 items-center justify-center mt-5 md:mt-14">
        <img
          src={aboutusimg3}
          alt=""
          className="flex-wrap flex-shrink w-1/4 h-56  rounded-lg object-cover flex-grow cursor-pointer  transform transition-transform duration-500 overflow-hidden hover:scale-125"
        />
        <img
          src={aboutusimg1}
          alt=""
          className="flex-wrap flex-shrink w-1/4 h-56  rounded-lg object-cover flex-grow cursor-pointer transform transition-transform duration-500 overflow-hidden hover:scale-125"
        />
        <img
          src={aboutusimg2}
          alt=""
          className="flex-wrap flex-shrink w-1/4 h-56  rounded-lg object-cover flex-grow cursor-pointer transform transition-transform duration-500 overflow-hidden hover:scale-125"
        />
      </div> */}
    
      
      <div className="sm:flex flex-wrap hidden gap-8 items-center justify-center mt-5 md:mt-14">
        {[aboutusimg3,aboutusimg2, aboutusimg1 ].map((img, idx) => (
          <div
            key={idx}
            className="w-1/4 h-56 overflow-hidden flex-grow rounded-lg "
          >
            <img
              src={img}
              alt=""
              className="w-full h-full flex-grow object-cover brightness-90 hover:brightness-100 transform transition-transform duration-500 hover:scale-110"
            />
          </div>
        ))}
      </div>

      {/* <div className="flex flex-wrap gap-8 items-center justify-center mt-5 md:mt-14">
      {images.map((img, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            delay: idx * 0.2, // stagger effect
          }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-full sm:w-1/2 md:w-1/4 h-56 overflow-hidden rounded-xl shadow-lg"
        >
          <motion.img
            src={img}
            alt=""
            className="w-full h-full object-cover brightness-90 hover:brightness-100 transition-transform duration-700 hover:scale-110"
          />
        </motion.div>
      ))}
    </div> */}

      {/* <div className="mt-5 md:mt-14 px-3">
        <motion.div
          className="flex overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-hide"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              className="min-w-[80%] sm:min-w-[45%] md:min-w-[30%] h-60 rounded-2xl overflow-hidden flex-shrink-0 snap-center shadow-lg"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: "easeOut",
                    delay: idx * 0.2,
                  },
                },
              }}
            >
              <motion.img
                src={img}
                alt=""
                className="w-full h-full object-cover brightness-90 hover:brightness-100 transition-transform duration-700 hover:scale-110"
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div> */}

      <div className="relative w-full sm:hidden mt-5 h-52 sm:h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl shadow-md">
        {images?.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={`${image}`}
              alt={`slide-${index}`}
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Optional fade overlay for style */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

        {/* Dots Indicator */}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-8  mt-14">
        <p className="md:w-1/2 text-white/50 font-dmSans">
          At Innerpece, we understand the struggles of anxiety, depression, and
          life’s challenges. Our journey began with a desire to help others find
          peace, not as a destination, but as a transformative journey.
        </p>
        <button
          onClick={handleBtnClick}
          className=" bg-white px-6 py-3 rounded-full h-fit w-fit"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default OurStory;
