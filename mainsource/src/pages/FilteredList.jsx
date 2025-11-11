// import React from "react";
// import { lazy, Suspense } from "react";
// let Header = lazy(() => import("../components/Header"));
// let Footer = lazy(() => import("../components/Footer"));
// import { Link, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { FaStar } from "react-icons/fa";
// import defaultimage from "../assets/defaultimg.png";
// import { useNavigate } from "react-router-dom";
// import whatsapp from "../assets/whatsapp.svg";
// import sendEnquiry from "../assets/sendenquiry.svg";
// import customerservice from "../assets/customerservice.svg";
// import approve from "../assets/approve.svg";
// import insurance from "../assets/insurance.svg";
// import pricetag from "../assets/pricetag.svg";
// import GoToTop from "../components/GoToTop";
// import { MdOutlineKeyboardArrowRight } from "react-icons/md";
// import dummyImage from "../assets/dummy5.jpeg";

// const FilteredList = () => {
//   let location = useLocation();
//   let navigate = useNavigate();
//   const [apiData, setApiData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [currentItem, setCurrentItem] = useState(1);
//   const [itemsPerPage] = useState(9);
//   const [loading, setLoading] = useState(true); // Add a loading state
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   let filteredData = window.location.pathname.split("/")[2];

//   useEffect(() => {
//     setLoading(true);

//     if (location.state) {
//       setApiData(location.state.value);
//       setLoading(false);
//       console.log("response1", location.state.value);
//     } else {
//       const fetchProgramData = async () => {
//         try {
//           const response = await axios.get(
//             "https://backoffice.innerpece.com/api/v1/get-pricewise-programs",
//             {
//               params: {
//                 price_check: filteredData,
//               },
//             }
//           );
//           console.log("response2", response.data);
//           setApiData(response.data.packages);

//           setLoading(false);
//         } catch (err) {
//           console.log(err);
//           setLoading(false);
//         }
//       };
//       fetchProgramData();
//     }
//   }, [location]);

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     const id = document.getElementById("program");
//     id.scrollIntoView({ behavior: "instant" });
//   };

//   const handleCardClick = (id, title) => {
//     const formattedTitleName = title
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-") // Remove all special characters and replace with hyphen
//       .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
//       .replace(/^-+|-+$/g, ""); // Trim hyphens from the start and end

//     navigate(`/${id}/${formattedTitleName}`, {
//       state: { id, title },
//     });

//     window.scrollTo({
//       top: 0,
//       behavior: "instant",
//     });
//   };

//   useEffect(() => {
//     const currentItems = Array.isArray(apiData)
//       ? apiData.slice(indexOfFirstItem, indexOfLastItem)
//       : [];
//     setCurrentItem(currentItems);
//   }, [apiData]);

//   console.log("currentItem", currentItem);

//   const SkeletonLoader = () => {
//     return (
//       <div className="animate-pulse grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 py-4 w-full">
//         {[...Array(8)].map((_, index) => (
//           <div
//             key={index}
//             className="flex flex-col gap-2 pb-2 font-jakarta border rounded-2xl border-gray-300"
//           >
//             {/* Image skeleton */}
//             <div className="h-64 md:h-72 w-full bg-gray-400 rounded-xl"></div>

//             {/* Title & rating skeleton */}
//             <div className="flex px-3 gap-x-5 justify-between flex-wrap">
//               <div className="w-1/2 h-5 bg-gray-400 rounded-md"></div>
//               <div className="flex items-center gap-2">
//                 <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
//                 <div className="w-16 h-4 bg-gray-400 rounded-md"></div>
//               </div>
//             </div>

//             {/* Location skeleton */}
//             <div className="px-3">
//               <div className="w-3/4 h-4 bg-gray-400 rounded-md"></div>
//             </div>

//             {/* Price skeleton */}
//             <div className="px-3">
//               <div className="w-24 h-5 bg-gray-400 rounded-md"></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div>
//       <GoToTop />

//       {/* <TopHeader/> */}

//       <Header />

//       <div className="flex gap-1 sm:gap-2  px-2 py-0.5  items-center">
//         <Link to="/">
//           <p className="text-xs sm:text-sm">Home</p>
//         </Link>

//         <MdOutlineKeyboardArrowRight className="text-xl" />
//         <p className="text-blue-500 font-medium sm:font-semibold">
//           Filtered List
//         </p>
//       </div>

//       <div
//         id="hero"
//         className="h-64 md:h-80 lg:h-[480px] relative overflow-hidden"
//       >
//         {loading ? (
//           // 🌟 Skeleton Loader Section
//           <div className="absolute inset-0 animate-pulse">
//             <div className="w-full h-full bg-gray-300" />
//             <div className="absolute flex w-full h-full items-center justify-center">
//               <div className="h-[60%] w-[85%] md:w-[65%] lg:w-[60%] rounded-xl bg-gray-400 backdrop-blur-md" />
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* ✅ Actual Image */}
//             <img
//               src={dummyImage}
//               className="absolute inset-0 w-full h-full object-cover object-bottom"
//               alt="Hero Background"
//             />

//             {/* ✅ Overlay Content */}
//             <div className="absolute flex w-full h-full items-center justify-center">
//               <div
//                 id="blur"
//                 className="absolute h-[60%] w-[85%] md:w-[65%] lg:w-[60%] rounded-xl flex flex-col justify-center top-11 md:top-10 lg:top-16 px-3 py-1 md:px-8 md:py-3 bg-black/5 backdrop-blur-2xl"
//               >
//                 <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-rancho tracking-widest text-center lg:text-5xl font-semibold [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)]">
//                   Explore
//                 </h1>
//                 <p className="text-white text-xs sm:text-sm md:text-base mt-2 text-center font-dmSans [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)]">
//                   Find your perfect trip with personalized themes and
//                   destinations to match your preferences
//                 </p>
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Main Section  */}
//       <div className="flex flex-col xl:flex-row gap-2 md:gap-5 lg:gap-7 xl:gap-10  ps-4 pe-4 md:px-7  lg:px-8 xl:px-10 ">
//         {/* Main Section > Mainbar */}

//         <div className="md:mt-10 w-full">
//           {/* ✅ Show skeleton loader while loading */}
//           {loading ? (
//             <SkeletonLoader />
//           ) : currentItem.length > 0 ? (
//             <>
//               {/* ✅ Program Cards */}
//               <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 py-4">
//                 {currentItem.map((item, index) => (
//                   <div
//                     id="program"
//                     key={index}
//                     onClick={() => handleCardClick(item.id, item.title)}
//                     className="flex-shrink-0 flex-1 cursor-pointer flex flex-col pb-2 font-jakarta border rounded-2xl border-gray-300"
//                   >
//                     {/* Cover Image */}
//                     <img
//                       src={
//                         item.cover_img
//                           ? `https://backoffice.innerpece.com/${item.cover_img}`
//                           : defaultimage
//                       }
//                       alt={item.title}
//                       className="h-64 md:h-72 object-cover w-full rounded-xl"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = defaultimage;
//                       }}
//                     />

//                     {/* Content Section */}
//                     <div className="flex flex-col justify-between flex-1">
//                       <div>
//                         <div className="flex px-3 gap-x-5 justify-between flex-wrap font-PlusJakartaSansMedium font-semibold">
//                           <p className="line-clamp-1 text-[#2D2D2D]">
//                             {item.title}
//                           </p>
//                           <div className="flex items-center">
//                             <FaStar className="text-yellow-500" />
//                             <p>5.0 (2)</p>
//                           </div>
//                         </div>

//                         {/* Location */}
//                         {item.current_location &&
//                           item.current_location !== "<p><br></p>" && (
//                             <p
//                               className="text-gray-600 px-3 line-clamp-1"
//                               dangerouslySetInnerHTML={{
//                                 __html: item.current_location,
//                               }}
//                             />
//                           )}
//                       </div>

//                       {/* Price — Always at Bottom */}
//                       <div className="flex px-3 gap-2 mt-auto pt-2">
//                         <p>Starting from</p>
//                         <p className="lg:text-xl text-sky-800 font-PlusJakartaSansMedium px-3 font-semibold">
//                           ₹ {Number(item.pricing[0]).toLocaleString("en-IN")}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* ✅ Pagination Section */}
//               <nav>
//                 <div className="flex justify-center items-center mt-8">
//                   <ul className="flex space-x-2">
//                     {Array.from(
//                       { length: Math.ceil(apiData.length / itemsPerPage) },
//                       (_, i) => (
//                         <li key={i + 1} className="relative">
//                           <button
//                             onClick={() => paginate(i + 1)}
//                             className={`px-5 py-2 border-2 rounded text-black transition-all duration-200 ${
//                               currentPage === i + 1
//                                 ? "bg-sky-800 border-sky-800 text-white"
//                                 : "hover:bg-sky-700 hover:border-sky-700"
//                             }`}
//                           >
//                             {i + 1}
//                           </button>
//                         </li>
//                       )
//                     )}
//                   </ul>
//                 </div>
//               </nav>
//             </>
//           ) : (
//             // ✅ No Data Found
//             <div className="flex my-20 justify-center w-full h-full">
//               <p className="text-xl md:text-3xl font-jost">
//                 No programs available.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Main Section > Sidebar */}
//         <div className="mt-10 lg:mt-20  sticky top-5 h-fit flex-grow flex flex-col md:flex-row xl:flex-col gap-4   xl:basis-[24%] ">
//           <div className="flex w-full md:w-1/2 xl:w-auto flex-col gap-3 items-center flex-grow  py-5 px-5 shadow-md shadow-black/10 rounded-xl">
//             <p className="font-semibold md:font-bold text-xl font-mulish">
//               Any Questions ?
//             </p>
//             <p className="text-[#646464] font-medium font-mulish text-center">
//               let our expert suggest the best for you!
//             </p>

//             <div className="h-[1.5px] w-full bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300 rounded-full"></div>

//             <div
//               onClick={() => window.open("https://wa.me/6384131642")}
//               className="cursor-pointer border-2 rounded-xl border-[#00A64D] flex gap-2 items-center px-5 py-1 w-48 transition-all duration-300 transform  hover:shadow-md hover:scale-105"
//             >
//               <img
//                 src={whatsapp}
//                 className="h-10 w-10  transition-all duration-500"
//               />
//               <p className="text-[#2D2D2D] font-semibold md:font-bold font-mulish">
//                 Whatsapp
//               </p>
//             </div>

//             <div
//               onClick={() => {
//                 window.scrollTo(0, 0);
//                 navigate("/sendenquiry");
//               }}
//               className="cursor-pointer border-2 rounded-xl border-[#EC3B63] flex items-center gap-4 px-5 py-2 w-48 transition-all duration-300 transform  hover:shadow-md hover:scale-105"
//             >
//               <img
//                 src={sendEnquiry}
//                 className="h-8 w-7  transition-all duration-500"
//               />
//               <p className="text-[#2D2D2D] font-semibold md:font-bold font-mulish">
//                 Customization Enquiry
//               </p>
//             </div>
//           </div>

//           <div className="shadow-md w-full md:w-1/2 xl:w-auto mt-5  bg-white py-4 flex-grow flex flex-col items-center  shadow-black/10 rounded-xl">
//             <div className="flex gap-4  w-full lg:justify-center ms-3 text-lg">
//               <p className="text-sky-800">|</p>
//               <p className="font-semibold">Book With Confidence</p>
//             </div>

//             <div className="flex flex-wrap  items-start  justify-between lg:flex-col  px-5 pt-5   gap-y-4 gap-2">
//               <div className="flex gap-4 items-center">
//                 <img src={customerservice} alt="" />
//                 <p className="text-sm font-medium text-[#44454F]">
//                   Customer care available 24/7
//                 </p>
//               </div>

//               <div className="flex gap-4 items-center">
//                 <img src={approve} alt="" />
//                 <p className="text-sm font-medium text-[#44454F]">
//                   Hand-picked Tours & Activities
//                 </p>
//               </div>

//               <div className="flex gap-4 items-center">
//                 <img src={insurance} alt="" />
//                 <p className="text-sm font-medium text-[#44454F]">
//                   Women-Friendly Environments
//                 </p>
//               </div>

//               <div className="flex gap-4 items-center">
//                 <img src={pricetag} alt="" />
//                 <p className="text-sm font-medium text-[#44454F]">
//                   No-hassle best price guarantee
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default FilteredList;

import React, { lazy, Suspense, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import defaultimage from "../assets/defaultimg.png";
import dummyImage from "../assets/dummy5.jpeg";
import whatsapp from "../assets/whatsapp.svg";
import sendEnquiry from "../assets/sendenquiry.svg";
import customerservice from "../assets/customerservice.svg";
import approve from "../assets/approve.svg";
import insurance from "../assets/insurance.svg";
import pricetag from "../assets/pricetag.svg";
import GoToTop from "../components/GoToTop";

const Header = lazy(() => import("../components/Header"));
const Footer = lazy(() => import("../components/Footer"));

const FilteredList = () => {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItem, setCurrentItem] = useState([]);
  const [itemsPerPage] = useState(9);
  const [loading, setLoading] = useState(true);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = window.location.pathname.split("/")[2];

  // 🔹 Fetch or set data from state
  useEffect(() => {
    setLoading(true);

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
        setCurrentItem([]);
        setCurrentPage(1);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProgramData();
  }, [filteredData]);

  // 🔹 Update displayed items when page changes or data updates
  useEffect(() => {
    if (Array.isArray(apiData)) {
      const currentItems = apiData.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentItem(currentItems);
    }
  }, [apiData, currentPage, indexOfFirstItem, indexOfLastItem]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);

    // window.scrollTo({
    //   top: 500,
    //   behavior: "smooth",
    // });

    const id = document.getElementById("program");
    id.scrollIntoView({ behavior: "instant" });
  };

  const handleCardClick = (id, title) => {
    const formattedTitleName = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

    navigate(`/${id}/${formattedTitleName}`, {
      state: { id, title },
    });

    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // 🔹 Skeleton Loader for loading state
  const SkeletonLoader = () => {
    return (
      <div className="animate-pulse grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 py-4 w-full">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 pb-2 font-jakarta border rounded-2xl border-gray-300"
          >
            <div className="h-64 md:h-72 w-full bg-gray-300 rounded-xl"></div>
            <div className="flex px-3 gap-x-5 justify-between flex-wrap">
              <div className="w-1/2 h-5 bg-gray-300 rounded-md"></div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                <div className="w-16 h-4 bg-gray-300 rounded-md"></div>
              </div>
            </div>
            <div className="px-3">
              <div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
            </div>
            <div className="px-3">
              <div className="w-24 h-5 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };


  return (
    <div>
      <GoToTop />

      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>

      <div className="flex gap-1 sm:gap-2 px-2 py-0.5 items-center">
        <Link to="/">
          <p className="text-xs sm:text-sm">Home</p>
        </Link>
        <MdOutlineKeyboardArrowRight className="text-xl" />
        <p className="text-blue-500 font-medium sm:font-semibold">
          Filtered List
        </p>
      </div>

      {/* 🔹 Hero Section */}
      <div
        id="hero"
        className="h-64 md:h-80 lg:h-[480px] relative overflow-hidden"
      >
        {loading ? (
          <div className="absolute inset-0 animate-pulse">
            <div className="w-full h-full bg-gray-300" />
            <div className="absolute flex w-full h-full items-center justify-center">
              <div className="h-[60%] w-[85%] md:w-[65%] lg:w-[60%] rounded-xl bg-gray-400 backdrop-blur-md" />
            </div>
          </div>
        ) : (
          <>
            <img
              src={dummyImage}
              className="absolute inset-0 w-full h-full object-cover object-bottom"
              alt="Hero Background"
            />
            <div className="absolute flex w-full h-full items-center justify-center">
              <div
                id="blur"
                className="absolute h-[60%] w-[85%] md:w-[65%] lg:w-[60%] rounded-xl flex flex-col justify-center top-11 md:top-10 lg:top-16 px-3 py-1 md:px-8 md:py-3 bg-black/5 backdrop-blur-2xl"
              >
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-rancho tracking-widest text-center lg:text-5xl font-semibold [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)]">
                  Explore
                </h1>
                <p className="text-white text-xs sm:text-sm md:text-base mt-2 text-center font-dmSans [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)]">
                  Find your perfect trip with personalized themes and
                  destinations to match your preferences
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 🔹 Main Section */}
      <div className="flex flex-col xl:flex-row gap-2 md:gap-5 lg:gap-7 xl:gap-10 ps-4 pe-4 md:px-7 lg:px-8 xl:px-10">
        {/* Mainbar */}
        <div id="program" className="md:mt-10 w-full">
          {loading ? (
            <SkeletonLoader />
          ) : currentItem.length > 0 ? (
            <>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 py-4">
                {currentItem.map((item, index) => (
                  <div
                    id="program"
                    key={index}
                    onClick={() => handleCardClick(item.id, item.title)}
                    className="cursor-pointer flex flex-col pb-2 font-jakarta border rounded-2xl border-gray-300"
                  >
                    {/* <img
                      src={
                        item.cover_img
                          ? `https://backoffice.innerpece.com/${item.cover_img}`
                          : defaultimage
                      }
                      alt={item.title}
                      className="h-64 md:h-72 object-cover w-full rounded-xl"
                     
                    /> */}

                    <div className="h-64 md:h-72 overflow-hidden rounded-xl">
                      <img
                        src={
                          item.cover_img
                            ? `https://backoffice.innerpece.com/${item.cover_img}`
                            : defaultimage
                        }
                        alt={item.title}
                        className=" object-cover w-full h-full rounded-xl hover:scale-105 transition-all duration-300 ease-in-out"
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex px-3 gap-x-5 justify-between flex-wrap font-PlusJakartaSansMedium font-semibold">
                          <p className="line-clamp-1 text-[#2D2D2D]">
                            {item.title}
                          </p>
                          <div className="flex items-center">
                            <FaStar className="text-yellow-500" />
                            <p>
                              {item.average_rating} ( {item.reviews.length} )
                            </p>
                          </div>
                        </div>
                        {item.current_location &&
                          item.current_location !== "<p><br></p>" && (
                            <p
                              className="text-gray-600 px-3 line-clamp-1"
                              dangerouslySetInnerHTML={{
                                __html: item.current_location,
                              }}
                            />
                          )}
                      </div>
                      <div className="flex px-3 gap-2 mt-auto pt-2">
                        <p>Starting from</p>
                        <p className="lg:text-xl text-sky-800 font-PlusJakartaSansMedium px-3 font-semibold">
                          ₹ {Number(item.pricing[0]).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <nav>
                <div className="flex justify-center items-center mt-8">
                  <ul className="flex space-x-2">
                    {Array.from(
                      { length: Math.ceil(apiData.length / itemsPerPage) },
                      (_, i) => (
                        <li key={i + 1}>
                          <button
                            onClick={() => paginate(i + 1)}
                            className={`px-4 py-2 border-2 rounded-full text-black transition-all duration-200 ${
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
            </>
          ) : (
            <div className="flex my-20 justify-center w-full h-full">
              <p className="text-xl md:text-3xl font-jost">
                No programs available.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="mt-10 lg:mt-20 sticky top-5 h-fit flex-grow flex flex-col md:flex-row xl:flex-col gap-4 xl:basis-[24%]">
          <div className="flex w-full md:w-1/2 xl:w-auto flex-col gap-3 items-center flex-grow py-5 px-5 shadow-md shadow-black/10 rounded-xl">
            <p className="font-semibold md:font-bold text-xl font-mulish">
              Any Questions ?
            </p>
            <p className="text-[#646464] font-medium font-mulish text-center">
              let our expert suggest the best for you!
            </p>
            <div className="h-[1.5px] w-full bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300 rounded-full"></div>
            <div
              onClick={() => window.open("https://wa.me/6384131642")}
              className="cursor-pointer border-2 rounded-xl border-[#00A64D] flex gap-2 items-center px-5 py-1 w-48 transition-all duration-300 transform hover:shadow-md hover:scale-105"
            >
              <img src={whatsapp} className="h-10 w-10" />
              <p className="text-[#2D2D2D] font-semibold md:font-bold font-mulish">
                Whatsapp
              </p>
            </div>
            <div
              onClick={() => {
                window.scrollTo(0, 0);
                navigate("/sendenquiry");
              }}
              className="cursor-pointer border-2 rounded-xl border-[#EC3B63] flex items-center gap-4 px-5 py-2 w-48 transition-all duration-300 transform hover:shadow-md hover:scale-105"
            >
              <img src={sendEnquiry} className="h-8 w-7" />
              <p className="text-[#2D2D2D] font-semibold md:font-bold font-mulish">
                Customization Enquiry
              </p>
            </div>
          </div>

          <div className="shadow-md w-full md:w-1/2 xl:w-auto mt-5 bg-white py-4 flex-grow flex flex-col items-center shadow-black/10 rounded-xl">
            <div className="flex gap-4 w-full lg:justify-center ms-3 text-lg">
              <p className="text-sky-800">|</p>
              <p className="font-semibold">Book With Confidence</p>
            </div>

            <div className="flex flex-wrap items-start justify-between lg:flex-col px-5 pt-5 gap-y-4 gap-2">
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

      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default FilteredList;
