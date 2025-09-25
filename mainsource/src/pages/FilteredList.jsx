import React from "react";
import { lazy, Suspense } from "react";
let Header = lazy(() => import("../components/Header"));
let Footer = lazy(() => import("../components/Footer"));
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { PiStarFourFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import defaultimage from "../assets/defaultimg.png";
import { useNavigate } from "react-router-dom";
import whatsapp from "../assets/whatsapp.svg";
import sendEnquiry from "../assets/sendenquiry.svg";
import customerservice from "../assets/customerservice.svg";
import approve from "../assets/approve.svg";
import insurance from "../assets/insurance.svg";
import pricetag from "../assets/pricetag.svg";
import TopHeader from "../components/TopHeader";

const FilteredList = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [sliceCount, setSliceCount] = useState(2);
  let filteredData = window.location.pathname.split("/")[2];

  const currentItems = Array.isArray(apiData)
    ? apiData.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  useEffect(() => {
    if (location.state) {
      setApiData(location.state.value);
    } else {
      const fetchProgramData = async () => {
        try {
          const response = await axios.get(
            "https://backoffice.innerpece.com/api/v1/get-pricewise-programs",
            {
              params: {
                price_check: filteredData,
              },
            }
          );
          setApiData(response.data.packages);
        } catch (err) {
          console.log(err);
        }
      };
      fetchProgramData();
    }
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1300) {
        setSliceCount(3); // large screens
      } else if (window.innerWidth >= 1024) {
        setSliceCount(3); // large screens
      } else if (window.innerWidth >= 768) {
        setSliceCount(3); // large screens
      } else if (window.innerWidth >= 500) {
        setSliceCount(3); // small screens
      } else {
        setSliceCount(2); // small screens
      }
    };

    // Initial check
    handleResize();

    // Event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const id = document.getElementById("program");
    id.scrollIntoView({ behavior: "instant" });
  };

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1300) {
        setSliceCount(3); // large screens
      } else if (window.innerWidth >= 1024) {
        setSliceCount(3); // large screens
      } else if (window.innerWidth >= 768) {
        setSliceCount(3); // large screens
      } else if (window.innerWidth >= 500) {
        setSliceCount(3); // small screens
      } else {
        setSliceCount(2); // small screens
      }
    };

    // Initial check
    handleResize();

    // Event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
              {/* <TopHeader/> */}

      <Header />

      <div
        id="hero"
        className="h-64 md:h-80 lg:h-[420px]  
 relative bg-[url('././assets/dummy5.jpeg')] bg-cover bg-center bg-no-repeat bg-fixed"
      >
        <div className="absolute flex w-full h-full items-center justify-center">
          <div
            id="blur"
            className="absolute h-[60%] w-[85%] md:w-[65%] lg:w-[60%] rounded-xl flex flex-col justify-center top-11 md:top-10 lg:top-16 px-3 py-1 md:px-8 md:py-3 bg-black/5 backdrop-blur-2xl"
          >
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-rancho tracking-widest text-center lg:text-5xl font-semibold [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)]">
              Explore
            </h1>
            <p className="text-white text-xs sm:text-sm md:text-base mt-2 text-center font-dmSans [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)]">
              Find your perfect trip with personalized themes and destinations
              to match your preferences
            </p>
          </div>
        </div>
      </div>

      {/* Main Section  */}
      <div className="flex flex-col xl:flex-row gap-2 md:gap-5 lg:gap-7 xl:gap-10  ps-4 pe-4 md:px-7  lg:px-8 xl:px-10 ">
        {/* Main Section > Mainbar */}
        <div className=" md:mt-10 w-full ">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <div
                id="program"
                key={index}
                className="flex flex-col mt-10  overflow-hidden"
              >
                <div
                  key={index}
                  className="flex flex-col group lg:flex-row  overflow-hidden   "
                >
                  <div
                    onClick={() => handleCardClick(item.id, item.title)}
                    className="relative overflow-hidden   w-full lg:w-1/3 rounded-t-xl lg:rounded-s-xl lg:rounded-r-none"
                  >
                    <img
                      src={
                        item.cover_img
                          ? `https://backoffice.innerpece.com/${item.cover_img}`
                          : defaultimage
                      }
                      alt={item.title}
                      className="w-full h-44 sm:h-60   object-cover object-center transform transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                    />
                  </div>

                  <div
                    onClick={() => handleCardClick(item.id, item.title)}
                    className="flex flex-wrap flex-grow overflow-hidden lg:w-3/4  flex-col gap-1 md:gap-2 border lg:border-l-0 cursor-pointer border-[#BABABA]  py-2 px-2 md:px-3 "
                  >
                    <p className="font-semibold text-[#2D2D2D] flex-wrap text-xl md:text-3xl font-jost">
                      {/* {item.title.includes("-") ? item.title : item.title} */}
                      {item.title}
                    </p>

                    {item.current_location &&
                      item.current_location !== "<p><br></p>" && (
                        <div className="flex items-center gap-2">
                          <FaLocationDot className="text-sky-800" />

                          <p
                            className="text-sm sm:text-base"
                            dangerouslySetInnerHTML={{
                              __html: item.current_location,
                            }}
                          />
                        </div>
                      )}

                    {item.amenities && item.amenities.length > 0 && (
                      <div>
                        <div className="flex justify-start mt-3 gap-2 flex-wrap items-start">
                          {item.amenities
                            .slice(0, sliceCount)
                            .map((amenity, index) => (
                              <div
                                key={index}
                                className="flex flex-col justify-center items-center  gap-1 w-20 flex-wrap"
                              >
                                <span className="border-2 p-2  h-9 w-9 border-gray-300 rounded-full">
                                  <img
                                    src={`https://backoffice.innerpece.com/${amenity.amenity_pic}`}
                                    alt=""
                                  />
                                </span>
                                <p className="text-gray-500 flex-wrap text-center text-xs">
                                  {amenity.amenity_name}
                                </p>
                              </div>
                            ))}

                          {/* {item.amenities.length > 3 && (
                                 <p className="text-gray-500">
                                   {item.amenities.length - 3}+
                                 </p>
                               )} */}
                          {item.amenities.length > 3 && (
                            //  <span className="border-2 p-2 w-9 h-9 border-gray-300 rounded-full">

                            // <p className="text-gray-500 text-xs mx-auto">
                            //   +{item.amenities.length - 3}
                            // </p>
                            // </span>
                            <div
                              key={index}
                              className="flex flex-col gap-1 w-20 justify-center items-center flex-wrap"
                            >
                              <span className=" bg-sky-700 p-2 w-9 h-9  rounded-full">
                                <p className="text-white text-xs mx-auto">
                                  +{item.amenities.length - 3}
                                </p>
                              </span>
                              <p className="text-sky-700 flex-wrap text-xs w-fit">
                                More
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap  flex-row lg:flex-col lg:w-1/5 items-center justify-between lg:justify-center gap-2  lg:border-s-0 border-t-0 lg:border-t rounded-b-lg lg:rounded-l-none  lg:rounded-e-xl border border-[#BABABA]  px-2 md:px-3 py-2 font-mulish   ">
                    <div className="flex flex-row lg:flex-col gap-1 lg:gap-3 items-center justify-center">
                      <p className="text-[#001031] text-sm md:text-base text-center mx-auto ">
                        Starting From{" "}
                      </p>
                      <p className="font-bold text-green-700 text-lg sm:text-xl mx-auto">
                        ₹{Number(item.pricing[0]).toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div
                      onClick={() => handleCardClick(item.id, item.title)}
                      className="flex cursor-pointer items-center gap-2 bg-gradient-to-r from-sky-700 to-sky-900 px-2 sm:px-4  lg:px-4.5 py-1 lg:py-2 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md hover:brightness-110"
                    >
                      <p className="text-white md:font-medium md:text-xl text-center">
                        View Detail
                      </p>
                      {/* <FaArrowRight className="text-white h-full" /> */}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex my-20 justify-center w-full h-full">
              <p className="text-xl md:text-3xl font-jost">
                No programs available.
              </p>
            </div>
          )}

          <nav>
            <div className="flex justify-center items-center mt-8">
              <ul className="flex space-x-2">
                {Array.from(
                  { length: Math.ceil(apiData.length / itemsPerPage) },
                  (_, i) => (
                    <li key={i + 1} className="relative">
                      <button
                        onClick={() => paginate(i + 1)}
                        className={`px-5 py-2 border-2 rounded text-black ${
                          currentPage === i + 1
                            ? "bg-sky-800 border-sky-800 text-white"
                            : "hover:bg-sky-700 hover:border-sky-700"
                        }`}
                      >
                        {i + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          </nav>
        </div>

        {/* Main Section > Sidebar */}
        <div className="mt-10 lg:mt-20  sticky top-5 h-fit flex-grow flex flex-col md:flex-row xl:flex-col gap-4   xl:basis-[24%] ">
          <div className="flex w-full md:w-1/2 xl:w-auto flex-col gap-3 items-center flex-grow  py-5 px-5 shadow-md shadow-black/10 rounded-xl">
            <p className="font-semibold md:font-bold text-xl font-mulish">
              Any Questions ?
            </p>
            <p className="text-[#646464] font-medium font-mulish text-center">
              let our expert suggest the best for you!
            </p>

            <div className="h-[1.5px] w-full bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300 rounded-full"></div>

            <div
              onClick={() => window.open("https://wa.me/6384131642")}
              className="cursor-pointer border-2 rounded-xl border-[#00A64D] flex gap-2 items-center px-5 py-1 w-48 transition-all duration-300 transform  hover:shadow-md hover:scale-105"
            >
              <img
                src={whatsapp}
                className="h-10 w-10  transition-all duration-500"
              />
              <p className="text-[#2D2D2D] font-semibold md:font-bold font-mulish">
                Whatsapp
              </p>
            </div>

            <div
              onClick={() => {
                window.scrollTo(0, 0);
                navigate("/sendenquiry");
              }}
              className="cursor-pointer border-2 rounded-xl border-[#EC3B63] flex items-center gap-4 px-5 py-2 w-48 transition-all duration-300 transform  hover:shadow-md hover:scale-105"
            >
              <img
                src={sendEnquiry}
                className="h-8 w-7  transition-all duration-500"
              />
              <p className="text-[#2D2D2D] font-semibold md:font-bold font-mulish">
                Customization Enquiry
              </p>
            </div>
          </div>

          <div className="shadow-md w-full md:w-1/2 xl:w-auto mt-5  bg-white py-4 flex-grow flex flex-col items-center  shadow-black/10 rounded-xl">
            <div className="flex gap-4  w-full lg:justify-center ms-3 text-lg">
              <p className="text-sky-800">|</p>
              <p className="font-semibold">Book With Confidence</p>
            </div>

            <div className="flex flex-wrap  items-start  justify-between lg:flex-col  px-5 pt-5   gap-y-4 gap-2">
              <div className="flex gap-4 items-center">
                <img src={customerservice} alt="" />
                <p className="text-sm font-medium text-[#44454F]">
                  Customer care available 24/7
                </p>
              </div>

              <div className="flex gap-4 items-center">
                <img src={approve} alt="" />
                <p className="text-sm font-medium text-[#44454F]">
                  Hand-picked Tours & Activities
                </p>
              </div>

              <div className="flex gap-4 items-center">
                <img src={insurance} alt="" />
                <p className="text-sm font-medium text-[#44454F]">
                  Women-Friendly Environments
                </p>
              </div>

              <div className="flex gap-4 items-center">
                <img src={pricetag} alt="" />
                <p className="text-sm font-medium text-[#44454F]">
                  No-hassle best price guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FilteredList;
