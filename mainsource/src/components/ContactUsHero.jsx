import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  let navigate = useNavigate();
  return (
    <div className="bg-[url('././assets/contactushero.png')] h-[30vh] md:h-[50vh] w-full bg-no-repeat bg-center bg-cover">
      <div className="flex  flex-col items-center justify-center h-full gap-5">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] font-mulish">
          CONTACT US
        </p>
        <div className="flex gap-5 font-mulish">
          <p
            className="text-sky-800 cursor-pointer hover:text-sky-800"
            onClick={() => navigate("/")}
          >
            HOME
          </p>
          <p className="text-sky-800 font-semibold">CONTACT US</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
