import React from "react";
import ourvalueimg1 from "../assets/ourvalueimg1.png";
import ourvalueimg2 from "../assets/ourvalueimg2.png";
import ourvalueimg3 from "../assets/ourvalueimg3.png";

function OurValue() {
  return (
    <div className="ms-3 me-3 mt-8 md:mt-20 md:ms-6 md:me-6 lg:ms-12 lg:me-12 xl:ms-20 xl:me-20 ">
      <p className="text-2xl lg:text-3xl xl:text-5xl font-dmSans font-semibold">OUR VALUE</p>
     

      <div className="flex flex-col mt-5 gap-3 md:mt-14 items-center font-dmSans ">
        <div className="flex flex-col lg:flex-row flex-wrap items-center gap-2 md:gap-8 justify-between">
          <div className="flex items-center  gap-5 basis-[20%]">
            <hr className="border-[#D0DBFF] w-12" />
            <p className="text-xl md:text-2xl font-semibold text-[#003061] w-full ">Individual Impact</p>
          </div>

          <img src={ourvalueimg1} alt="" className="basis-[30%] flex-wrap " />

          <div className="flex flex-col basis-[30%] gap-8 flex-wrap">
            <p className="text-[#828284] md:text-lg font-medium">
            At Innerpece, your well-being is our passion. We understand the challenges of anxiety, depression, and the constant pressure to balance work and life. We're here to help you slow down, make space for self-time, and embrace peace, clarity, and joy—guiding you toward your happiest self.

            </p>
          </div>
        </div>

        <hr className="w-full mt-5 mb-5  md:mt-14 md:mb-14 border-sky-800/20" />

        <div className="flex flex-col lg:flex-row flex-wrap items-center gap-2 md:gap-8 justify-between">
          <div className="flex items-center  gap-5 basis-[20%]">
            <hr className="border-[#D0DBFF] w-12" />
            <p className="text-xl md:text-2xl font-semibold text-[#003061]">
            Social Impact
            </p>
          </div>

          <img src={ourvalueimg2} alt="" className="basis-[30%] flex-wrap" />

          <div className="flex flex-col basis-[30%] gap-8 flex-wrap">
            <p className="text-[#828284] md:text-lg font-medium">
            We are empowering local communities by turning locals into hosts and onboarding homestays to create more job opportunities. Additionally, we prioritize the safety of women travelers, ensuring secure and reliable travel experiences.

            </p>
          </div>
        </div>

        <hr className="w-full mt-5 mb-5 md:mt-14 md:mb-14 border-sky-800/20" />

        <div className="flex flex-col lg:flex-row flex-wrap items-center gap-2 md:gap-8 justify-between">
          <div className="flex items-center  gap-5 basis-[20%]">
            <hr className="border-[#D0DBFF] w-12" />
            <p className="text-xl md:text-2xl font-semibold text-[#003061]">
            Industry Impact
            </p>
          </div>

          <img src={ourvalueimg3} alt="" className="basis-[30%] flex-wrap" />

          <div className="flex flex-col basis-[30%] gap-8 flex-wrap">
            <p className="text-[#828284] md:text-lg font-medium">
            We don’t stop at individual well-being; our passion extends to workplaces. By fostering a positive environment, we help businesses unlock their potential, driving innovation, productivity, and a wave of positivity across the industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurValue;
