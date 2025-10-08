import { lazy, Suspense } from "react";
let Header = lazy(() => import("../components/Header"));
let Footer = lazy(() => import("../components/Footer"));
import { useLocation, useNavigate } from "react-router-dom";
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

  const mappedSlicedLocationName = slicedLocationName.map(
    (item) => item[0].toUpperCase() + item.slice(1)
  );
  const upperCasedLocationName = mappedSlicedLocationName.join(" ");

  const slicedLocationid = pathName.split("/")[2];

  useEffect(() => {
    const fetchProgramData = async () => {
      // https://backoffice.innerpece.com/api/v1/get-stays?destination=Ladakh
      try {
        const response = await axios.get(
          "https://backoffice.innerpece.com/api/v1/get-stays",
          {
            params: {
              destination: stay_title ? stay_title : slicedLocationName,
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
      state: { id },
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

  const [sliceCount, setSliceCount] = useState(2);

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

  const SkeletonLoader = () => {
    return (
      <div className="animate-pulse flex flex-col  gap-4  w-full m">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-300  mt-11 justify-between flex flex-col gap-2 lg:flex-row rounded-xl"
          >
            {/* Left section */}
            <div className="rounded-t-xl lg:rounded-s-xl lg:rounded-r-none  h-32 lg:h-52 bg-gray-500 w-full lg:w-1/4 "></div>

            {/* Middle section */}
            <div className="flex flex-col gap-2 md:gap-4 lg:gap-6 md:py-2 flex-1 border-r border-gray-400">
              <div className="w-1/2 lg:w-96 h-10 bg-gray-500 rounded-lg"></div>
              <div className="w-1/4 lg:w-52 h-10 bg-gray-500 rounded-lg"></div>

              <div className="flex gap-8 justify-between md:justify-normal px-5">
                <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
                <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
                <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
              </div>
            </div>

            {/* Right section */}
            <div className="flex lg:flex-col justify-center gap-2 px-5 md:gap-5 pb-2 md:py-2 md:pe-5 rounded-b-lg lg:rounded-l-none  lg:rounded-e-xl">
              <div className="h-8 w-28 bg-gray-500 rounded-lg"></div>
              <div className="h-8 w-28 bg-gray-500 rounded-lg"></div>
              <div className="h-8 w-28 bg-gray-500 rounded-lg"></div>
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
          className={`transition-all duration-500 h-2 rounded-full ${
            active ? "bg-white w-10" : "bg-white/50 w-3"
          }`}
        />
      </li>
    );
  };

  return (
    <div>
      {!filterButtonClicked && (
        <div
          onClick={() => window.open("https://wa.me/6384131642")}
          className="fixed whatsapp z-50 bottom-2 right-2 cursor-pointer flex items-center group"
        >
          <div className="text-black opacity-0 scale-90 translate-x-5 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 bg-white px-2 py-1 rounded-md shadow-md ml-2 transition-all duration-300">
            <p>Whatsapp Enquiry</p>
          </div>
          <img
            src={whatsapp}
            className="h-12 w-12  transition-all duration-500"
          />
        </div>
      )}

      <Suspense
        fallback={
          <div class="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
            <div className="  w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }
      >
                {/* <TopHeader/> */}

        <Header />

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
            {apiData?.districts?.length>0 && (
            <p className="font-PlusJakartaSansMedium font-medium text-lg">
              Explore more places
            </p>
             )} 

            <div className="flex overflow-x-auto gap-2 md:gap-8 xl:gap-16 mt-3  scrollbar-hide">
              {apiData?.districts?.map((item, index) => (
                <div
                  onClick={() => handleStaysClick(item.name)}
                  key={index}
                  className="flex cursor-pointer flex-col items-center justify-start w-20 flex-shrink-0"
                >
                  <div className="w-16 h-16 md:w-20 overflow-hidden md:h-20  border-2  border-[#0F5B92] rounded-full p-0.5">
                    <img
                      src={
                        item.image
                          ? `https://backoffice.innerpece.com${item.image}`
                          : defaultimg
                      }
                      alt="story"
                      className=" rounded-full  hover:scale-125 transition-all duration-300 w-full h-full   object-cover"
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
                    {/* Horizontal Scroll Section */}
                    {/* <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10  py-4"> */}
                    {filteredApiData?.data?.length > 0 ? (
                      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 py-4">
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
                                    <div key={index} className="w-full h-full">
                                      <img
                                        src={
                                          item1
                                            ? `https://backoffice.innerpece.com/${item1}`
                                            : defaultimage
                                        }
                                        alt=""
                                        className="h-64 md:h-72 object-cover w-full"
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

                            <div className="flex px-3 gap-x-5 justify-between flex-wrap font-PlusJakartaSansMedium font-semibold">
                              <p>{item.stay_title}</p>

                              <div className="flex items-center">
                                <FaStar className="text-yellow-500" />
                                <p> 5.0 (2)</p>
                              </div>
                            </div>

                            <p className="text-gray-600 px-3">
                              {item.tag_line}
                            </p>

                            <div className="flex items-center gap-2 pb-2">
                              <del className="font-PlusJakartaSansMedium text-[#7C7C7C] px-3 font-medium">
                                ₹ {Number(item.actual_price).toLocaleString()}
                              </del>

                              <p className="lg:text-xl font-PlusJakartaSansMedium px-3 font-semibold">
                                ₹ {Number(item.discount_price).toLocaleString()}
                              </p>
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
                            className={`px-4 py-2 border-2 rounded text-black ${
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























