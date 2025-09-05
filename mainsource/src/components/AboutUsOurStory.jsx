import React from "react";
import VideoBox1 from "../assets/VideoBox1.png";
import VideoBox2 from "../assets/VideoBox2.png";
import VideoBox3 from "../assets/VideoBox3.png";

import aboutusimg1 from "../assets/aboutusimg1.png";
import aboutusimg2 from "../assets/aboutusimg2.png";
import aboutusimg3 from "../assets/aboutusimg3.png";
import { useNavigate } from "react-router-dom";

function OurStory() {
  let navigate = useNavigate();

  function handleBtnClick() {
    navigate("/login");
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  return (
    <div className="bg-gradient-to-b mt-8 md:mt-20 pb-5 md:pb-20 px-5 md:px-12  lg:px-24  xl:px-32 from-sky-800 to-black ">
      <div className="flex pt-8 md:pt-16 items-center gap-8 w-full md:w-2/3">
        <hr className="w-20 md:w-80 border-white" />

        <div className="flex flex-col gap-3 text-white">
          <p className="tracking-widest font-dmSans">OUR STORY</p>
          <p className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-medium font-dmSans">
            The Journey to Innerpece
          </p>
        </div>
      </div>

      {/* <div className="flex flex-wrap flex-shrink gap-8 items-center justify-center mt-5 md:mt-14">
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

      <div className="flex flex-wrap gap-8 items-center justify-center mt-5 md:mt-14">
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
