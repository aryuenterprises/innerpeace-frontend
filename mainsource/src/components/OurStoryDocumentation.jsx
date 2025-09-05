import React from "react";
import sd1 from "../assets/sd1.jpg";
import sd2 from "../assets/sd2.jpg";
import sd3 from "../assets/sd3.jpg";
import sd4 from "../assets/sd4.jpg";
import sd5 from "../assets/sd5.jpg";
import sd6 from "../assets/sd6.jpg";

function OurStoryDocumentation() {
  return (
    <div className="ms-5 me-5 md:ms-16 md:me-16 mt-16">
      <div className="flex justify-between gap-5 flex-wrap">
        <p className="text-xl md:text-3xl font-semibold">
          Our <span className="text-sky-600">Story Documentation</span>
        </p>
        <button className=" bg-gradient-to-r from-sky-700 to-sky-900 px-5 py-1 md:px-8 md:py-3 text-white font-semibold rounded-lg ">
          See more
        </button>
      </div>

      <div className="flex flex-wrap mt-10 gap-2">
        <img src={sd1} alt="" className="flex-grow transform transition duration-700 ease-in-out hover:scale-95  shadow-black"/>
        <img src={sd2} alt="" className="flex-grow transform transition duration-700 ease-in-out hover:scale-95" />
        <img src={sd3} alt="" className="flex-grow transform transition duration-700 ease-in-out hover:scale-95" />
        <img src={sd4} alt="" className="flex-grow transform transition duration-700 ease-in-out hover:scale-95" />
        <img src={sd5} alt="" className="flex-grow transform transition duration-700 ease-in-out hover:scale-95" />
        <img src={sd6} alt="" className="flex-grow transform transition duration-700 ease-in-out hover:scale-95" />
      </div>
    </div>
  );
}

export default OurStoryDocumentation;
