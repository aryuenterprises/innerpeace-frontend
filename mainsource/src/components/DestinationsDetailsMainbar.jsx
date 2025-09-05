import React from "react";
import { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { PiStarFourFill } from "react-icons/pi";
import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlineChildCare } from "react-icons/md";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { GiHighGrass } from "react-icons/gi";
import { LuWaves } from "react-icons/lu";
import { PiBowlFood } from "react-icons/pi";
import { MdTheaters } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { IoBedSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import defaultimage from "../assets/defaultimg.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DestinationsDetailsMainbar({
  apiData,
  sortBy,
  setApiData,
  city_name,
  setSortBy,
}) {
  const [filterButtonClicked, setFilterButtonClicked] = useState(false);
  let navigate = useNavigate();

  const [sortedData, setSortedData] = useState("");

  function onchangeSelect(e) {
    setSortBy(e.target.value);
  }

  useEffect(() => {
    async function fetchSortedData() {
      if (sortBy) {
        try {
          const response = await axios.post(
            `https://backoffice.innerpece.com/api/sort-destination`,
            { sort_by: sortBy, destination: city_name }
          );
          setSortedData(response.data.data);
          setApiData(""); // clear the unsorted data
        } catch (error) {
          console.error("Error fetching sorted data", error);
        }
      }
    }
    fetchSortedData();
  }, [sortBy, apiData]);

  const handleCardClick = (id, title) => {
    const formattedTitleName = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Remove all special characters and replace with hyphen
      .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
      .replace(/^-+|-+$/g, ""); // Trim hyphens from the start and end

    navigate(`/${id}/${formattedTitleName}`, {
      state: { id, title },
    });

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };


  return (
    <div className=" pb-52 ">
      <p
        onClick={() => setFilterButtonClicked(!filterButtonClicked)}
        className={`mt-10 w-28 text-center py-2 px-2 md:p-2 md:px-6 rounded-lg block md:hidden ${
          filterButtonClicked ? "bg-red-500 text-white" : "bg-gray-300"
        } }`}
      >
        {`${filterButtonClicked ? "Close Filter" : "Filter"}`}
      </p>

      {filterButtonClicked && (
        <div className="mt-5 md:hidden flex border-2 flex-col rounded-lg px-3 py-3 pb-5 gap-5">
          <p className="text-lg">Search By Filter</p>

          <div className="flex flex-wrap gap-5">
            <input type="date" className="border-2 p-1 rounded w-fit" />
            <button className="bg-sky-800 active:bg-gray-600 px-8 rounded text-end py-2 text-white place-items-end w-fit">
              Filter
            </button>
          </div>

          <p className="text-lg">Sort By</p>

          <select
            className="border-2 p-2 rounded outline-none w-fit"
            onChange={onchangeSelect}
          >
            <option value="" disabled selected>
              Select Sort Option
            </option>
            <option value="recent">Recent Event</option>
            <option value="price_low_to_high">Low Price</option>
            <option value="price_high_to_low">High Price</option>
          </select>
        </div>
      )}

      {apiData &&
        apiData.map((item, index) => (
          <div key={index} className="flex flex-col mt-10 ">
            <div
              key={index}
              className="flex w-full flex-grow flex-col lg:flex-row mt-11    "
            >
              <img
                src={
                  item.cover_img
                    ? `https://backoffice.innerpece.com/${item.cover_img}`
                    : defaultimage
                }
                alt=""
                className="object-cover w-full lg:w-72  bg-center  rounded-none"
              />

              <div className="flex flex-wrap flex-grow  flex-col gap-2 border-2 border-gray-300 py-2 px-3 ">
                <p className="font-semibold flex-wrap text-2xl md:text-3xl">
                  {item.title}
                </p>

                <div className="flex  items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <FaLocationDot className="text-sky-800" />
                    <p>{item.location}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <p>
                      <b className="me-1">5</b>of 5
                    </p>
                  </div>
                </div>

                <div className="flex items-center flex-wrap gap-2">
                  <p>Upto 12 guests</p>

                  <div className="flex items-center gap-3">
                    <PiStarFourFill className="text-gray-400" />
                    <p>4 rooms</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <PiStarFourFill className="text-gray-400" />
                    <p>5 baths</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold">Great for:</p>

                  <div className="flex items-center gap-2">
                    <IoPeopleSharp className="text-gray-400" />
                    <p>Senior Citizen</p>
                  </div>

                  <p>|</p>

                  <div className="flex items-center gap-2">
                    <MdOutlineChildCare className="text-gray-400" />
                    <p>Kids</p>
                  </div>
                </div>

                <div className="border-b border-gray-400"></div>

                <div className="flex justify-start mt-1 gap-2 flex-wrap items-start">
                  <div className="flex flex-col  w-14 ">
                    <span className="border-2 p-2 w-9 border-gray-300 rounded-full">
                      {" "}
                      <LiaSwimmingPoolSolid className="text-gray-500" />
                    </span>
                    <p className="text-gray-500 text-xs">Swimming pool</p>
                  </div>

                  <div className="flex flex-col w-14 ">
                    <span className="border-2 p-2 w-9 border-gray-300 rounded-full">
                      {" "}
                      <GiHighGrass className="text-gray-500" />
                    </span>
                    <p className="text-gray-500 text-xs">Lawn</p>
                  </div>

                  <div className="flex flex-col w-14 ">
                    <span className="border-2 p-2 w-9 border-gray-300 rounded-full">
                      {" "}
                      <LuWaves className="text-gray-500 " />
                    </span>
                    <p className="text-gray-500 text-xs">Beach View</p>
                  </div>

                  <div className="flex flex-col w-14 ">
                    <span className="border-2 p-2 w-9 border-gray-300 rounded-full">
                      {" "}
                      <PiBowlFood className="text-gray-500" />
                    </span>
                    <p className="text-gray-500 text-xs">Meals</p>
                  </div>

                  <div className="flex flex-col w-14 ">
                    <span className="border-2 p-2 w-9 border-gray-300 rounded-full">
                      {" "}
                      <MdTheaters className="text-gray-500" />
                    </span>
                    <p className="text-gray-500 text-xs">Home Theatre</p>
                  </div>

                  <p className="text-gray-500">20+</p>
                </div>
              </div>

              <div className="flex flex-wrap  flex-row lg:flex-col items-center justify-between lg:justify-center gap-4  lg:border-s-0 border-t-0 lg:border-t-2 border-2 border-gray-300  px-3 py-2  lg:rounded-lg lg:rounded-s-none rounded-b-none">
                <p className="font-bold text-xl md:text-2xl">
                  ₹{item.actual_price}
                </p>

                <div className="flex border flex-wrap justify-center border-sky-700 py-1 px-4 bg-sky-100/50 rounded-lg  items-center gap-2">
                  <IoBedSharp className="text-xl" />
                  <p className="text-sm">For 4 Rooms</p>
                </div>

                <p className="text-xs text-gray-500">
                  for 32 Nights + Taxes(4 rooms)
                </p>

                <div
                  onClick={() => handleCardClick(item.id, item.title)}
                  className="flex  items-center gap-2 bg-gradient-to-r from-sky-700 to-sky-900 px-5 py-1 lg:px-8 lg:py-2 rounded-lg "
                >
                  <p className="text-white cursor-pointer  md:text-xl font-semibold ">
                    View
                  </p>
                  <FaArrowRight className="text-white" />
                </div>
              </div>
            </div>

            <p className="bg-sky-800/20 w-90vw  text-sm md:text-base rounded-lg py-2 ps-1 md:ps-5 rounded-t-none tracking-widest ">
              RATED BEST FOR ITS AMENITIES AND SERVICE
            </p>
          </div>
        ))}

      {sortedData && Object.keys(sortedData).length > 0 && (
        <div>
          {Object.keys(sortedData).map((key, index) => {
            const card = sortedData[key];

            return (
              <div key={index} className="flex flex-col mt-10 ">
                <div
                  key={index}
                  className="flex  flex-col lg:flex-row mt-11    "
                >
                  <img
                    src={
                      card.cover_img
                        ? `https://backoffice.innerpece.com/${card.cover_img}`
                        : defaultimage
                    }
                    alt=""
                    className="object-cover w-full lg:w-72  bg-center  rounded-none"
                  />

                  <div className="flex flex-wrap flex-grow   flex-col gap-2 border-2 border-gray-300 py-2 px-3 ">
                    <p className="font-semibold flex-wrap text-2xl md:text-3xl">
                      {card.title}
                    </p>

                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <FaLocationDot className="text-sky-800" />
                        <p>{card.location}</p>
                      </div>

                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <p>
                          <b className="me-1">5</b>of 5
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center flex-wrap gap-2">
                      <p>Upto 12 guests</p>

                      <div className="flex items-center gap-3">
                        <PiStarFourFill className="text-gray-400" />
                        <p>4 rooms</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <PiStarFourFill className="text-gray-400" />
                        <p>5 baths</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold">Great for:</p>

                      <div className="flex items-center gap-2">
                        <IoPeopleSharp className="text-gray-400" />
                        <p>Senior Citizen</p>
                      </div>

                      <p>|</p>

                      <div className="flex items-center gap-2">
                        <MdOutlineChildCare className="text-gray-400" />
                        <p>Kids</p>
                      </div>
                    </div>

                    <div className="border-b border-gray-400"></div>

                    <div className="flex justify-start mt-1 gap-2 flex-wrap items-start">
                      <div className="flex flex-col  w-14 ">
                        <span className="border-2 p-2 w-9 border-gray-300 rounded-full">
                          {" "}
                          <LiaSwimmingPoolSolid className="text-gray-500" />
                        </span>
                        <p className="text-gray-500 text-xs">Swimming pool</p>
                      </div>

                      <div className="flex flex-col w-14 ">
                        <span className="border-2 p-2 w-9 border-gray-300 rounded-full">
                          {" "}
                          <GiHighGrass className="text-gray-500" />
                        </span>
                        <p className="text-gray-500 text-xs">Lawn</p>
                      </div>

                      <div className="flex flex-col w-14 ">
                        <span className="border-2 p-2 w-9 border-gray-300 rounded-full">
                          {" "}
                          <LuWaves className="text-gray-500 " />
                        </span>
                        <p className="text-gray-500 text-xs">Beach View</p>
                      </div>

                      <div className="flex flex-col w-14 ">
                        <span className="border-2 p-2 w-9 border-gray-300 rounded-full">
                          {" "}
                          <PiBowlFood className="text-gray-500" />
                        </span>
                        <p className="text-gray-500 text-xs">Meals</p>
                      </div>

                      <div className="flex flex-col w-14 ">
                        <span className="border-2 p-2 w-9 border-gray-300 rounded-full">
                          {" "}
                          <MdTheaters className="text-gray-500" />
                        </span>
                        <p className="text-gray-500 text-xs">Home Theatre</p>
                      </div>

                      <p className="text-gray-500">20+</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap  flex-row lg:flex-col items-center justify-between lg:justify-center gap-4  lg:border-s-0 border-t-0 lg:border-t-2 border-2 border-gray-300  px-3 py-2  lg:rounded-lg lg:rounded-s-none rounded-b-none">
                    <p className="font-bold text-xl md:text-2xl">
                      ₹{card.price}
                    </p>

                    <div className="flex border flex-wrap justify-center border-sky-700 py-1 px-4 bg-sky-100/50 rounded-lg  items-center gap-2">
                      <IoBedSharp className="text-xl" />
                      <p className="text-sm">For 4 Rooms</p>
                    </div>

                    <p className="text-xs text-gray-500">
                      for 32 Nights + Taxes(4 rooms)
                    </p>

                    <div className="flex  items-center gap-2 bg-gradient-to-r from-sky-700 to-sky-900 px-5 py-1 lg:px-8 lg:py-2 rounded-lg ">
                      <p className="text-white cursor-pointer  md:text-xl font-semibold ">
                        View
                      </p>
                      <FaArrowRight className="text-white" />
                    </div>
                  </div>
                </div>

                <p className="bg-sky-800/20 w-90vw  text-sm md:text-base rounded-lg py-2 ps-1 md:ps-5 rounded-t-none tracking-widest ">
                  RATED BEST FOR ITS AMENITIES AND SERVICE
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DestinationsDetailsMainbar;
