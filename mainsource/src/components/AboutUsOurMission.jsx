import React from "react";
import ourmissionimg2 from "../assets/ourmissionimg2.png";
import ourmissionimg1 from "../assets/ourmissionimg1.png";

function OurMission() {
  return (
    <div className="ms-3 me-3 mt-8 md:mt-20 md:ms-6 md:me-6 lg:ms-12 lg:me-12 xl:ms-20 xl:me-20 ">
      <div className="flex flex-col items-center justify-between lg:flex-row  lg:gap-32 xl:gap-48">
        <div className="basis-[50%] lg:basis-[30%] gap-8">
          <p className="text-2xl lg:text-3xl xl:text-5xl font-dmSans font-semibold mt-3">
            Why Choose Innerpece?
          </p>

          <div className="flex flex-col mt-5 md:mt-14 gap-5 md:gap-11 ">
            <div className="flex gap-5">
              <p className="text-[#003061] font-bold font-dmSans text-xl">01</p>
              <div className="flex flex-col gap-2">
                <p className="text-[#003061] font-bold font-dmSans text-xl">
                  Seamless Trip Planning
                </p>
                <p className="text-gray-500 font-dmSans">
                  We handle all aspects of your trip, from logistics to
                  activities, ensuring a well-organized and effortless
                  experience.
                </p>
                <hr className="w-full mt-1 md:mt-6 border-sky-900/20" />
              </div>
            </div>

            <div className="flex gap-5">
              <p className="text-[#003061] font-bold font-dmSans text-xl">02</p>
              <div className="flex flex-col gap-2">
                <p className="text-[#003061] font-bold font-dmSans text-xl">
                  High-Quality Food
                </p>
                <p className="text-gray-500 font-dmSans">
                  Enjoy a variety of gourmet meals during your stay, each
                  prepared with care to enhance your overall getaway experience.
                </p>
                <hr className="w-full mt-1 md:mt-6 border-sky-900/20" />
              </div>
            </div>

            <div className="flex gap-5">
              <p className="text-[#003061] font-bold font-dmSans text-xl">03</p>
              <div className="flex flex-col gap-2">
                <p className="text-[#003061] font-bold font-dmSans text-xl">
                  Personalized Service
                </p>
                <p className="text-gray-500 font-dmSans">
                  Benefit from attentive, individualized support throughout your
                  trip, ensuring all your needs are met for a memorable and
                  enjoyable escape.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative  basis-[20%] mt-8 lg:mt-0 lg:basis-[50%]">
          <img src={ourmissionimg1} alt="" className=" w-full  object-cover " />
          <img
            src={ourmissionimg2}
            alt=""
            className="max-md:hidden  absolute top-36  sm:top-40 sm:-left-14 md:top-44 md:-left-28  lg:top-44 lg:-left-16 xl:top-64 xl:-left-24 bg-contain bg-center "
          />
        </div>
      </div>
    </div>
  );
}

export default OurMission;
