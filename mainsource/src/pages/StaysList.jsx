import { lazy, Suspense } from "react";
let Header = lazy(() => import("../components/Header"));
let Footer = lazy(() => import("../components/Footer"));
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import defaultimage from "../assets/defaultimg.png";
import whatsapp from "../assets/whatsapp.svg";
import sendEnquiry from "../assets/sendenquiry.svg";
import customerservice from "../assets/customerservice.svg";
import approve from "../assets/approve.svg";
import insurance from "../assets/insurance.svg";
import pricetag from "../assets/pricetag.svg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import defaultimg from "../assets/defaultimg.png";
import TopHeader from "../components/TopHeader";
import GoToTop from "../components/GoToTop";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const StaysList = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1, // Show one image at a time inside the card
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    document.title = "Stays List - Innerpece";
  }, []); // Empty dependency array ensures it runs once on mount

  const location = useLocation();
  const { id, stay_title } = location.state || {};
  const [apiData, setApiData] = useState([]);
  const [filteredApiData, setFilteredApiData] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [loading, setLoading] = useState(true); // Add a loading state
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [filterButtonClicked, setFilterButtonClicked] = useState(false);
  let navigate = useNavigate();

  const currentItems = Array.isArray(apiData)
    ? apiData.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);

    const id = document.getElementById("destinations");
    id.scrollIntoView({ behavior: "instant" });
  };

  const pathName = window.location.pathname;
  const slicedLocationName = pathName.split("/")[3]?.split("-");
  const slicedLocationId = pathName.split("/")[2];

  const mappedSlicedLocationName = slicedLocationName.map(
    (item) => item[0].toUpperCase() + item.slice(1)
  );
  const upperCasedLocationName = mappedSlicedLocationName.join(" ");

  useEffect(() => {
    const fetchProgramData = async () => {
      // https://backoffice.innerpece.com/api/v1/get-stays?destination=Ladakh
      try {
        const response = await axios.get(
          "https://backoffice.innerpece.com/api/v1/get-stays",
          {
            params: {
              destination: id ? id : slicedLocationId,
            },
          }
        );

        setApiData(response.data);
        setFilteredApiData(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);

        setLoading(false);
      }
    };
    fetchProgramData();
  }, [pathName]);

  const handleCardClick = (id, stay_title) => {
    navigate(`/staysdetails/${id}`, {
      state: { id, stayCategories: true },
    });

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  useEffect(() => {
    if (filterButtonClicked) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up on component unmount
    return () => document.body.classList.remove("overflow-hidden");
  }, [filterButtonClicked]);

  const SkeletonLoader = () => {
    return (
      <div className="animate-pulse grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 py-4 w-full">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 pb-2 font-jakarta border rounded-2xl border-gray-300"
          >
            {/* Image skeleton */}
            <div className="h-64 md:h-72 w-full bg-gray-300 rounded-xl"></div>

            {/* Title & rating skeleton */}
            <div className="flex px-3 gap-x-5 justify-between flex-wrap">
              <div className="w-1/2 h-5 bg-gray-300 rounded-md"></div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                <div className="w-16 h-4 bg-gray-300 rounded-md"></div>
              </div>
            </div>

            {/* Location skeleton */}
            <div className="px-3">
              <div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
            </div>

            {/* Price skeleton */}
            <div className="px-3">
              <div className="w-24 h-5 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const CustomLeftArrow = ({ onClick }) => {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick(); // move carousel
        }}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10"
      >
        <FaChevronLeft />
      </button>
    );
  };

  const CustomRightArrow = ({ onClick }) => {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick(); // move carousel
        }}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10"
      >
        <FaChevronRight />
      </button>
    );
  };

  const handleStaysClick = (districtName) => {
    let a = apiData.data.filter(
      (item, index) => item.district === districtName
    );

    setFilteredApiData((prev) => ({
      ...prev,
      data: a,
    }));
  };

  const CustomDot = ({ onClick, ...rest }) => {
    const { active } = rest;
    return (
      <li
        onClick={(e) => {
          e.stopPropagation(); // Stop bubbling to card
          onClick?.(); // Trigger dot click
        }}
        className="inline-block mx-1"
      >
        <button
          className={`transition-all duration-500 h-1.5 rounded-full ${
            active ? "bg-white w-8" : "bg-white/50 w-3"
          }`}
        />
      </li>
    );
  };

  // const [filteredDistrict, setFilteredDistrict] = useState([]);

  // useEffect(() => {
  //   if (apiData?.districts && apiData?.data) {
  //     // Get all matching districts where item.name === dataItem.district
  //     const matchedDistricts = apiData.districts.filter((district) =>
  //       apiData.data.some((dataItem) => dataItem.district === district.name)
  //     );

  //     setFilteredDistrict(matchedDistricts);
  //   }
  // }, [apiData]);

  // console.log("api data",apiData)
  // console.log("filtered district",filteredDistrict)

  return (
    <div>
      <GoToTop />

      <Suspense
        fallback={
          <div class="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
            <div className="  w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }
      >
        {/* <TopHeader/> */}

        <Header />

        <div className="flex gap-1 sm:gap-2  px-2 py-0.5  items-center">
          <Link to="/">
            <p className="text-xs sm:text-sm">Home</p>
          </Link>

          <MdOutlineKeyboardArrowRight className="text-xl" />
          <p className="text-blue-500 font-medium sm:font-semibold">
            Stay List
          </p>
        </div>

        {/* Hero Section */}

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
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl  font-rancho tracking-widest text-center  font-semibold [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)]">{` ${
                apiData?.length > 0
                  ? // ? apiData[0]?.destination[0]?.city_name
                    apiData?.data?.[0]?.destination
                  : upperCasedLocationName
              } Stays `}</h1>
              <p className="text-white text-xs sm:text-sm md:text-base mt-2 text-center font-dmSans [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)]">
                Find your perfect trip with personalized themes and destinations
                to match your preferences
              </p>
            </div>
          </div>
        </div>

        {/* main section */}
        <div className="ps-4 pe-4 md:px-7  lg:px-8 xl:px-10 mt-5 ">
          <div>
            {/* Title */}
            {loading ? (
              // Skeleton title loader
              <div className="h-6 w-40 bg-gray-200 rounded-md animate-pulse mb-2"></div>
            ) : (
              apiData.districts?.length > 0 && (
                <p className="font-PlusJakartaSansMedium font-medium text-lg">
                  Explore more places
                </p>
              )
            )}

            <div className="flex overflow-x-auto gap-2 md:gap-8 xl:gap-16 mt-3 scrollbar-hide">
              {loading
                ? // Skeleton loader (show 6 fake items)
                  Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-start w-20 flex-shrink-0"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="h-3 w-12 bg-gray-200 rounded mt-2 animate-pulse"></div>
                    </div>
                  ))
                : // Actual content
                  apiData.districts?.map((item, index) => (
                    <div
                      onClick={() => handleStaysClick(item.name)}
                      key={index}
                      className="flex cursor-pointer flex-col items-center justify-start w-20 flex-shrink-0"
                    >
                      <div className="w-16 h-16 md:w-20 overflow-hidden md:h-20 border-2 border-[#0F5B92] rounded-full p-0.5">
                        <img
                          src={
                            item.image
                              ? `https://backoffice.innerpece.com${item.image}`
                              : defaultimg
                          }
                          alt={item.name}
                          className="rounded-full hover:scale-125 transition-all duration-300 w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs font-PlusJakartaSansMedium font-medium mt-1 text-center">
                        {item.name}
                      </p>
                    </div>
                  ))}
            </div>
          </div>

          <div className="flex flex-col mt-5 md:mt-10 xl:flex-row gap-2 md:gap-5 lg:gap-7 xl:gap-10  ">
            {/* main section > mainBar */}
            <div className="  w-full ">
              {loading ? (
                <SkeletonLoader />
              ) : (
                <>
                  <div className="">
                    {filteredApiData?.data?.length > 0 ? (
                      // grid-cols-[repeat(auto-fill,minmax(280px,1fr))]
                      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))]  gap-5 py-4">
                        {filteredApiData?.data.map((item, outerIndex) => (
                          <div
                            key={outerIndex}
                            onClick={() => handleCardClick(item.id)}
                            className="flex-shrink-0 flex-1 cursor-pointer flex flex-col gap-1 font-jakarta border rounded-2xl border-gray-300"
                          >
                            <div>
                              <Carousel
                                responsive={responsive}
                                infinite
                                swipeable
                                draggable
                                showDots
                                arrows={false}
                                className="rounded-2xl overflow-hidden"
                                customDot={<CustomDot />}
                              >
                                {item?.images.length > 0 ? (
                                  item?.images.map((item1, index) => (
                                    // <div key={index} className="w-full h-full">
                                    //   <img
                                    //     src={
                                    //       item1
                                    //         ? `https://backoffice.innerpece.com/${item1}`
                                    //         : defaultimage
                                    //     }
                                    //     alt=""
                                    //     className="h-64 md:h-72 object-cover w-full"
                                    //   />
                                    // </div>
                                    <div className="h-64 md:h-72 overflow-hidden rounded-xl">
                                      <img
                                        src={
                                          item1
                                            ? `https://backoffice.innerpece.com/${item1}`
                                            : defaultimage
                                        }
                                        alt={item.title}
                                        className=" object-cover w-full h-full rounded-xl hover:scale-105 transition-all duration-300 ease-in-out"
                                      />
                                    </div>
                                  ))
                                ) : (
                                  <div>
                                    <img
                                      src={defaultimage}
                                      alt=""
                                      className="h-64 md:h-72 object-cover w-full"
                                    />
                                  </div>
                                )}
                              </Carousel>
                            </div>

                            <div className="flex flex-col justify-between flex-1">
                              <div>
                                {/* Title + Rating */}
                                <div className="flex px-3 gap-x-5 justify-between flex-wrap font-PlusJakartaSansMedium font-semibold">
                                  <p className="line-clamp-1">
                                    {item.stay_title}
                                  </p>

                                  <div className="flex items-center">
                                    <FaStar className="text-yellow-500" />
                                    <p>5.0 (2)</p>
                                  </div>
                                </div>

                                {/* Tagline */}
                                {item.tag_line && (
                                  <p className="text-gray-600 px-3 line-clamp-1">
                                    {item.tag_line}
                                  </p>
                                )}
                              </div>

                              {/* Price — Always at Bottom */}

                              <div className="flex items-center gap-2 px-3 mt-auto pt-2">
                         {item.actual_price ?    <>
                                <del className="font-PlusJakartaSansMedium text-[#7C7C7C] font-medium">
                                  ₹{" "}
                                  {Number(item.actual_price).toLocaleString(
                                    "en-IN"
                                  )}
                                </del>

                                <p className="lg:text-xl text-sky-800 font-PlusJakartaSansMedium font-semibold">
                                  ₹{" "}
                                  {Number(item.discount_price).toLocaleString(
                                    "en-IN"
                                  )}
                                </p>
                              </> : 
                              <>
                              </>
                              }
                         
                           

                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex justify-center items-center h-96">
                        <p className="text-2xl">No stays available</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              <nav>
                <div className="flex justify-center items-center mt-5">
                  <ul className="flex space-x-2">
                    {Array.from(
                      { length: Math.ceil(apiData.length / itemsPerPage) },
                      (_, i) => (
                        <li key={i + 1} className="relative">
                          <button
                            onClick={() => paginate(i + 1)}
                            className={`px-4 py-2 border-2 rounded-full text-black ${
                              currentPage === i + 1
                                ? "bg-sky-700 border-sky-700 text-white"
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
                <p className="font-bold md:font-bold text-xl font-mulish">
                  Any Questions ?
                </p>
                <p className="text-[#646464] font-medium font-mulish text-center">
                  let our expert suggest the best for you!
                </p>

                <div class="h-[1.5px] w-full bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300 rounded-full"></div>

                <div
                  onClick={() => window.open("https://wa.me/6384131642")}
                  className="cursor-pointer border-2 rounded-xl border-[#00A64D] transition-all duration-300 transform  hover:shadow-md hover:scale-105 flex gap-2 items-center px-5 py-1 w-48"
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
        </div>

        <Footer />
      </Suspense>
    </div>
  );
};

export default StaysList;
