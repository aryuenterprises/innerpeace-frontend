// import React from "react";
// import trip1 from "../assets/trip1.png";
// import trip2 from "../assets/trip2.jpeg";
// import trip3 from "../assets/trip3.png";
// import trip4 from "../assets/trip4.png";
// import trip5 from "../assets/trip5.jpeg";

// const TripCategories = () => {
//   return (
//     <div className="ms-5 me-5 mt-10 md:ms-16 md:me-16  md:mt-16">
//       <p className="text-xl md:text-4xl leading-loose text-[#141414]">
//         <span className="font-jost font-medium ">Trip </span>{" "}
//         <span className="font-jost font-bold">Categories</span>
//       </p>

//       <div className="flex gap-5 mt-8 md:mt-10">
//         <img
//           src={trip1}
//           alt=""
//           className="h-80 w-52 object-cover rounded-2xl"
//         />
//         <img
//           src={trip2}
//           alt=""
//           className="h-80 w-52  object-cover rounded-2xl"
//         />
//         <img
//           src={trip3}
//           alt=""
//           className="h-80 w-52  object-cover rounded-2xl"
//         />
//         <img
//           src={trip4}
//           alt=""
//           className="h-80 w-52  object-cover rounded-2xl"
//         />
//         <img
//           src={trip5}
//           alt=""
//           className="h-80 w-52  object-cover rounded-2xl"
//         />
//       </div>
//     </div>
//   );
// };

// export default TripCategories;

import React, { useState } from "react";
import trip1 from "../assets/trip1.png";
import trip2 from "../assets/trip2.jpeg";
import trip3 from "../assets/trip3.png";
import trip4 from "../assets/trip4.png";
import trip5 from "../assets/trip5.jpeg";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { image: trip1, name: "Nomadic Life" },
  { image: trip2, name: "Himachal Trips" },
  { image: trip3, name: "Kerala Trips" },
  { image: trip4, name: "Honeymoon" },
  { image: trip5, name: "Ladakh" },
  { image: trip1, name: "Nomadic Life" },
  { image: trip2, name: "Himachal Trips" },
  { image: trip3, name: "Kerala Trips" },
  { image: trip4, name: "Honeymoon" },
  { image: trip5, name: "Ladakh" },
  { image: trip1, name: "Nomadic Life" },
  { image: trip2, name: "Himachal Trips" },
  { image: trip3, name: "Kerala Trips" },
  { image: trip4, name: "Honeymoon" },
  { image: trip5, name: "Ladakh" },
];

const TripCategories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 3; // Number of images shown at once
  const maxIndex = images.length - visibleItems;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <div className="ms-5 me-5 mt-10 md:ms-16 md:me-16 md:mt-16 overflow-hidden">
      <p className="text-xl md:text-4xl leading-loose text-[#141414]">
        <span className="font-jost font-medium">Most </span>
        <span className="font-jost font-bold">Recommended</span>
      </p>

      <div className="relative mt-8 md:mt-10  ">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Carousel Content */}
        <div className="">
          <div
            className="flex gap-7 transition-transform duration-500 ease-in-out "
            style={{ transform: `translateX(-${currentIndex * 18}rem)` }}
          >
            {images.map((item, index) => (
              <div
                key={index}
                className="relative h-96 w-64 shrink-0 rounded-2xl overflow-hidden transform transition-transform duration-500 hover:-translate-y-2  cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={`trip-${index}`}
                  className="h-full w-full -z-30 absolute object-cover"
                />
                <div className="absolute -z-10 bg-gradient-to-b from-transparent from-60% to-black h-full w-full"></div>
                <div className="absolute bottom-5 z-20  left-0 w-full text-white text-center py-2 px-3">
                  <p className=" md:text-base  font-rancho text-lg xl:text-4xl">
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
    </div>
  );
};

export default TripCategories;
