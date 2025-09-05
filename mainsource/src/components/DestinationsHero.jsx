import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  let navigate = useNavigate();

  return (
    <div className="bg-[url('././assets/destinations2.jpg')]  h-[30vh] md:h-[50vh] w-full bg-no-repeat bg-center bg-cover">
      <div className="flex  flex-col items-center justify-center pt-12 h-full gap-5">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl  font-bold text-[#2D2D2D] font-mulish">
          DESTINATIONS
        </p>
        <div className="flex gap-5 font-mulish">
          <p
            className="text-white cursor-pointer hover:text-black"
            onClick={() => navigate("/")}
          >
            HOME
          </p>
          <p className="text-white font-semibold">DESTINATIONS</p>
        </div>
      </div>
    </div>

//     <div className="relative h-[30vh] md:h-[50vh] w-full">
//   <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent z-30"></div>
//   {/* <div
//     className="absolute z-0 inset-0 bg-[url('././assets/destinations2.jpg')] bg-no-repeat bg-center bg-cover "
//   ></div> */}
//   <div className="relative z-10 flex flex-col items-center justify-center pt-12 h-full gap-5">
//     <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] font-mulish">
//       DESTINATIONS
//     </p>
//     <div className="flex gap-5 font-mulish">
//       <p
//         className="text-sky-800 cursor-pointer hover:text-black"
//         onClick={() => navigate("/")}
//       >
//         HOME
//       </p>
//       <p className="text-sky-800 font-semibold">DESTINATIONS</p>
//     </div>
//   </div>
// </div>

  );
}

export default Hero;
