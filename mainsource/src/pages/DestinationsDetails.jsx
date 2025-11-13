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
import TopHeader from "../components/TopHeader";
import GoToTop from "../components/GoToTop";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Carousel } from "react-responsive-carousel";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import defaultimg from "../assets/defaultimg.png";
import dummyImage from "../assets/dummy5.jpeg";
import ParallexImage from "../components/ParallexImage";

function DestinationsDetails() {
  useEffect(() => {
    document.title = "Destination Details - Innerpece";
  }, []); // Empty dependency array ensures it runs once on mount
  const location = useLocation();
  const { id, city_name } = location.state || {};
  const [apiData, setApiData] = useState([]);
  const [filteredApiData, setFilteredApiData] = useState([]);
  const [apiDistrictData, setApiDistrictData] = useState([]);
  const [apiDataBannerImage, setApiDataBannerImage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [loading, setLoading] = useState(true); // Add a loading state
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [filterButtonClicked, setFilterButtonClicked] = useState(false);
  let navigate = useNavigate();

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);

    const id = document.getElementById("destinations");
    id.scrollIntoView({ behavior: "instant" });
  };

  const pathName = window.location.pathname;
  const slicedPathName = pathName.split("/")[2];
  const slicedLocationName = pathName.split("/")[3]?.split("-");
  const mappedSlicedLocationName = slicedLocationName.map(
    (item) => item[0].toUpperCase() + item.slice(1)
  );
  const upperCasedLocationName = mappedSlicedLocationName.join(" ");

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const response = await axios.post(
          "https://backoffice.innerpece.com/api/v1/get-program",
          {
            destination: id ? id : slicedPathName,
          }
        );

        setCurrentPage(1);
        setApiDistrictData(response.data.districtsData);
        setApiDataBannerImage(response.data.city_details.cities_pic);
        setApiData(response.data.data);
        setFilteredApiData(response.data.data);
        setLoading(false);

        const firstProgram = response.data.data[0];
        const metaOgTitle = document.querySelector("meta[property='og:title']");
        if (metaOgTitle) {
          metaOgTitle.setAttribute(
            "content",
            firstProgram.title || "Default Title"
          );
        }

        const metaOgDescription = document.querySelector(
          "meta[property='og:description']"
        );
        if (metaOgDescription) {
          metaOgDescription.setAttribute(
            "content",
            firstProgram.category || "Default description"
          );
        }

        const metaOgImage = document.querySelector("meta[property='og:image']");
        if (metaOgImage) {
          metaOgImage.setAttribute(
            "content",
            `https://backoffice.innerpece.com/${firstProgram.cover_img}` || ""
          );
        }
      } catch (err) {
        setLoading(false);
      }
    };
    fetchProgramData();
  }, [id]);

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

  // let a = apiData?.destination_name?.filter(
  //   (item, index) => item === districtName
  // );

  const handleStaysClick = (districtName) => {
    // Filter apiData to include only objects that contain the districtName

    const filtered = apiData.filter((item) =>
      item.destination_name.includes(districtName)
    );

    setFilteredApiData(filtered);
  };

  const currentItems = Array.isArray(filteredApiData)
    ? filteredApiData.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  // pagination pending

  return (
    <div>
      {/* <div
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
        </div> */}
      <GoToTop />

      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }
      >
        <Header />

        {/* <div className="flex gap-1 sm:gap-2  px-2 py-0.5  items-center">
          <Link to="/">
            <p className="text-xs sm:text-sm">Home</p>
          </Link>
          <MdOutlineKeyboardArrowRight className="text-xl" />
          <p className="text-blue-500 font-medium sm:font-semibold">
            Popular Programs
          </p>
        </div> */}

        <div className="flex gap-1 sm:gap-2 px-2 py-0.5 items-center">
          <Link to="/">
            <p className="text-xs sm:text-sm">Home</p>
          </Link>
          <MdOutlineKeyboardArrowRight className="text-xl" />
          <p className="text-blue-500 font-medium sm:font-semibold">
            Popular Programs
          </p>
        </div>

        {/* Hero Section */}
        <div
          id="hero"
          className="relative h-64 md:h-80 lg:h-[480px] overflow-hidden"
        >
          {loading ? (
            // 🌟 Skeleton Loader
            <div className="absolute inset-0 animate-pulse">
              <div className="w-full h-full bg-gray-300" />
              <div className="absolute flex w-full h-full items-center justify-center">
                <div className="h-[60%] w-[85%] md:w-[65%] lg:w-[60%] rounded-xl bg-gray-400 backdrop-blur-md" />
              </div>
            </div>
          ) : (
            <>
              {/* ✅ Actual Background Image */}
              <ParallexImage
                src={
                  apiData[0]?.theme[0]?.image
                    ? `https://backoffice.innerpece.com/${apiDataBannerImage}`
                    : dummyImage
                }
                className="absolute inset-0 w-full h-full object-cover object-bottom"
                alt="Hero Background"
              />

              {/* ✅ Overlay Content */}
              <div className="absolute flex w-full h-full items-center justify-center">
                <div
                  id="blur"
                  className="absolute h-[60%] w-[85%] md:w-[65%] lg:w-[60%] rounded-xl flex flex-col justify-center top-11 md:top-10 lg:top-16 px-3 py-1 md:px-8 md:py-3 bg-black/5 backdrop-blur-xl"
                >
                  <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-rancho tracking-widest text-center font-semibold [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)]">
                    {`Explore ${
                      apiData?.length > 0
                        ? apiData[0]?.destination
                        : upperCasedLocationName
                    }`}
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

        {/* main section */}
        <div className="ps-4 pe-4 md:px-7 lg:px-8 xl:px-10 mt-5">
          {/* --- Title or Title Skeleton --- */}
          {loading ? (
            <div className="h-6 w-40 bg-gray-300 rounded animate-pulse" />
          ) : (
            apiDistrictData?.length > 0 && (
              <p className="font-PlusJakartaSansMedium font-medium text-lg">
                Explore more places
              </p>
            )
          )}

          {/* --- Loader or Data --- */}
          <div className="flex overflow-x-auto gap-2 md:gap-8 xl:gap-16 mt-3 scrollbar-hide">
            {loading
              ? // Skeleton cards
                Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-start w-20 flex-shrink-0 animate-pulse"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-300" />
                    <div className="w-12 h-3 bg-gray-300 rounded mt-2" />
                  </div>
                ))
              : // Actual content
                apiDistrictData?.map((item, index) => (
                  <div
                    key={index}
                    className="flex cursor-pointer flex-col items-center justify-start w-20 flex-shrink-0"
                    onClick={() => handleStaysClick(item.destination)}
                  >
                    <div className="w-16 h-16 md:w-20 overflow-hidden md:h-20 border-2 border-[#0F5B92] rounded-full p-0.5">
                      <img
                        src={
                          item.image_path
                            ? `https://backoffice.innerpece.com/${item.image_path}`
                            : defaultimg
                        }
                        alt={item.destination}
                        className="rounded-full hover:scale-125 transition-all duration-300 w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs font-PlusJakartaSansMedium font-medium mt-1 text-center">
                      {item.destination}
                    </p>
                  </div>
                ))}
          </div>
        </div>

        <div className="relative">
          <div className="bg-image-behind"></div>

          <div className="absolute w-full h-full bg-gradient-to-b from-white  via-transparent to-white -z-10"></div>
          <div className="flex flex-col xl:flex-row gap-2 md:gap-5 lg:gap-7 xl:gap-10  ps-4 pe-4 md:px-7  lg:px-8 xl:px-10 ">
            {/* main section > mainBar */}
            <div id="destinations" className="w-full md:mt-10">
              {loading ? (
                <SkeletonLoader />
              ) : currentItems?.length > 0 ? (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 py-4">
                  {currentItems?.map((item, outerIndex) => (
                    <div
                      key={outerIndex}
                      onClick={() => handleCardClick(item.id, item.title)}
                      className="flex-shrink-0 flex-1  cursor-pointer flex flex-col pb-2 font-jakarta border rounded-2xl border-gray-300"
                    >
                      {/* Cover Image */}

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

                      {/* Content Section */}
                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          {/* Title + Rating */}
                          <div className="flex px-3 gap-x-5 justify-between flex-wrap font-PlusJakartaSansMedium font-semibold">
                            <p className="line-clamp-1">{item.title}</p>

                            <div className="flex items-center">
                              <FaStar className="text-yellow-500" />
                              <p>
                                {item.average_rating} ( {item.reviews.length} )
                              </p>
                            </div>
                          </div>

                          {/* Location */}
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

                        {/* Price — Always at Bottom */}
                        <div className="flex px-3 gap-3 mt-auto pt-2">
                          <p>Starting from</p>
                          <p className="lg:text-xl text-sky-800 font-PlusJakartaSansMedium px-3 font-semibold">
                            ₹ {Number(item.pricing[0]).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex my-20  justify-center w-full h-full">
                  <p className="text-2xl  font-jost">No programs available.</p>
                </div>
              )}

              {filteredApiData.length > 8 && (
                <nav>
                  <div className="flex justify-center items-center mt-5">
                    <ul className="flex space-x-2">
                      {Array.from(
                        {
                          length: Math.ceil(
                            filteredApiData.length / itemsPerPage
                          ),
                        },
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
              )}
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
                  onClick={() => window.open("https://wa.me/8807343642")}
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
}

export default DestinationsDetails;
