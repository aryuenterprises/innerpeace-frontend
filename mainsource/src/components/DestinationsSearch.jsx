import React, { useEffect, useState } from "react";
import axios from "axios";
import defaultimg from "../assets/defaultimg.png";
import { useNavigate } from "react-router-dom";
import dummy1 from "../assets/dummy1.png";

function Search() {
  let navigate = useNavigate();

  const [destinationData, setDestinationsData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://backoffice.innerpece.com/api/v1/destination`)
      // .get(`https://backoffice.innerpece.com/api/get-combined-data`)
      .then((response) => {
        setDestinationsData(response.data.destination_list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCardClick = (id, city_name) => {
    const formattedCityName = city_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Remove all special characters and replace with hyphen
      .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
      .replace(/^-+|-+$/g, ""); // Trim hyphens from the start and end

    // navigate(`/destinationsdetails/${formattedCityName}`, {
    navigate(`/populardestinations/${id}/${formattedCityName}`, {
      state: { id, city_name },
    });

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  // const getSpanClass = (index, array) => {
  //   // if (index % 7 === 0) {
  //   //   return "md:col-span-2 md:row-span-2"; // Large block
  //   // } else if (index % 5 === 0) {
  //   //   return "md:col-span-2"; // Wide
  //   // } else if (index % 3 === 0) {
  //   //   return "md:col-span-2"; // Tall
  //   // } else {
  //   //   return "col-span-1 row-span-1"; // Default
  //   // }
  //   if (index === 0) {
  //     return "md:col-span-1 md:row-span-2"; // Large block
  //   } else if (index % 7 === 0) {
  //     return "md:col-span-1 md:row-span-2"; // Large block
  //   } else {
  //     // return "col-span-1 row-span-1"; // Default
  //     return "md:col-span-1";
  //   }
  // };

  const getSpanClass = (index, array) => {
    const layoutMap = {
      0: `${
        array.length >= 4 ? "md:row-span-4" : "md:col-span-1 md:row-span-2"
      } `,
      3: "md:col-span-2 md:row-span-2",
      4: "md:row-span-2",
      5: "md:row-span-2",
      6: "md:row-span-2",
      7: "md:row-span-2",
      8: "md:row-span-2",
      9: "md:row-span-3",
    };

    return layoutMap[index] || "md:col-span-1 md:row-span-2";
  };

  return (
    <div className="overflow-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ms-3 me-3 md:ms-6 md:me-6 lg:ms-12 lg:me-12 xl:ms-20 xl:me-20 gap-4 auto-rows-[150px] mt-8 md:mt-20">
      {destinationData.map((item, index, array) => {
        const colSpanClass = getSpanClass(index, array);

        return (
          <div
            onClick={() => handleCardClick(item.id, item.city_name)}
            key={index}
            className={`relative rounded-xl cursor-pointer group overflow-hidden w-full h-full ${colSpanClass}`}
          >
            <img
              src={
                item.cities_pic
                  ? `https://backoffice.innerpece.com/${item.cities_pic}`
                  : defaultimg
              }
              alt={`Image ${index + 1}`}
              className="object-cover w-full h-full cursor-pointer rounded-xl bg-center absolute inset-0 -z-30 transform transition-transform duration-500 group-hover:scale-125"
            />
            <div className="absolute inset-0 rounded-xl -z-10 bg-gradient-to-b from-transparent from-60% to-black"></div>
            <div className="absolute bottom-1 z-20 left-0 w-full text-white text-center py-2 px-3">
              <p className="md:text-base font-rancho text-lg xl:text-4xl">
                {item.city_name}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Search;

// <div className="relative w-full h-full">
//   <img
//     key={index}
//     src={
//       item.cities_pic
//         ? `https://backoffice.innerpece.com/${item.cities_pic}`
//         : defaultimg
//     }
//     onClick={() => handleCardClick(item.id, item.city_name)}
//     alt={`Image ${index + 1}`}
//     className={`object-cover w-full cursor-pointer absolute z-10 h-full transform transition duration-700 ease-in-out hover:scale-95 rounded-xl ${
//       index === 0 || index === 7 ? "row-span-2 " : ""
//     }`}
//   />
//   <div className="absolute -z-10 bg-gradient-to-b from-transparent from-60% to-black h-full w-full"></div>
//   <div className="absolute bottom-5 z-20 left-0 w-full text-white text-center py-2 px-3">
//     <p className="md:text-base font-rancho text-lg xl:text-4xl">
//       {item.city_name}
//     </p>
//   </div>
// </div>
