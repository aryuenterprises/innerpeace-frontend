import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultimg from "../assets/defaultimg.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Destinations() {
  let navigate = useNavigate();
  const [destinationData, setDestinationsData] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    axios
      .get(`https://backoffice.innerpece.com/api/v1/destination`)
      // .get(`https://backoffice.innerpece.com/api/get-combined-data`)
      .then((response) => {
        setDestinationsData(response.data.destination_list);
        setLoading(false); // Set loading to false even if there’s an error
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleCardClick = (id, city_name) => {
    const formattedCityName = city_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Remove all special characters and replace with hyphen
      .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
      .replace(/^-+|-+$/g, ""); // Trim hyphens from the start and end

    navigate(`/populardestinations/${id}/${formattedCityName}`, {
      state: { id, city_name },
    });

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  const SkeletonCard = ({index}) => (
    <div key={index} className=" max-sm:hidden mx-2 h-80 md:h-96  bg-gray-600 flex-grow rounded-2xl animate-pulse"></div>
  );

  const SkeletonCarouselCard = ({index}) => (
    <div key={index} className="w-[90vw] sm:w-[70vw] mx-auto h-80 sm:hidden  bg-gray-600   rounded-2xl animate-pulse"></div>
  );

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1280 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  const CustomLeftArrow = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="absolute left-0 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        {/* <img src="/left-arrow.png" alt="Left" className="w-6 h-6" />
         */}
        <ChevronLeft size={20} />
      </button>
    );
  };

  const CustomRightArrow = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="absolute right-0 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        {/* <img src="/right-arrow.png" alt="Right" className="w-6 h-6" /> */}
        <ChevronRight size={20} />
      </button>
    );
  };

  const [skeltonArrayLength, setSkeletonArraylength] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 3000 && window.innerWidth <= 4000) {
        setSkeletonArraylength(4); // super large desktop
      } else if (window.innerWidth >= 1281 && window.innerWidth < 3000) {
        setSkeletonArraylength(4); // large desktop
      }
      // else if (window.innerWidth >= 1024 && window.innerWidth < 1440) {
      //   setSkeletonArraylength(4); // desktop
      // }
      else if (window.innerWidth >= 1025 && window.innerWidth < 1200) {
        setSkeletonArraylength(3); // small desktop
      } else if (window.innerWidth >= 641 && window.innerWidth <= 1024) {
        setSkeletonArraylength(2); // tablet
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
    <>
      {loading ? (
        <div className="ms-5 me-5 mt-10 md:ms-16 md:me-16  md:mt-16">
          <p className="text-2xl md:text-3xl  lg:text-4xl  leading-loose text-[#141414]">
            <span className="font-jost font-medium">Popular </span>
            <span className="font-jost font-bold">Programs</span>
          </p>
          <div className="flex items-center flex-1 mt-8 md:mt-10   flex-grow flex-wrap justify-start ">
            {Array(skeltonArrayLength)
              .fill(0)
              .map((_, index) => (
                <SkeletonCard  key={index}/>
              ))}
          </div>
          {/* <div className="flex items-center flex-1 w-full  mt-5  flex-grow flex-wrap justify-center "> */}
          <div className="flex items-center flex-1   flex-grow flex-wrap justify-center  w-full">
            {Array(1)
              .fill(0)
              .map((_, index) => (
                <SkeletonCarouselCard key={index}/>
              ))}
          </div>
        </div>
      ) : (
        <>
          {destinationData && destinationData.length > 0 && (
            <div className="ms-5 me-5 mt-10 md:ms-16 md:me-16  md:mt-16">
              <p className="text-2xl md:text-3xl  lg:text-4xl  leading-loose text-[#141414]">
                <span className="font-jost font-medium">Popular </span>
                <span className="font-jost font-bold">Programs</span>
              </p>
              <div className="mt-8 md:mt-10">
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  autoPlay={false}
                  swipeable={true}
                  draggable={true}
                  showDots={false}
                  keyBoardControl={true}
                  containerClass="carousel-container"
                  itemClass="px-2"
                  customLeftArrow={<CustomLeftArrow />}
                  customRightArrow={<CustomRightArrow />}
                >
                  {destinationData.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleCardClick(item.id, item.city_name)}
                      className="relative overflow-hidden rounded-2xl"
                    >
                      <div className="relative h-80 md:h-96  shrink-0 rounded-2xl overflow-hidden  group  cursor-pointer">
                        <img
                          src={
                            item.cities_pic
                              ? `https://backoffice.innerpece.com/${item.cities_pic}`
                              : defaultimg
                          }
                          alt={`trip-${index}`}
                          className="h-full w-full -z-30 absolute object-cover transform transition-transform duration-500 group-hover:scale-125"
                        />
                        <div className="absolute -z-10 bg-gradient-to-b from-transparent from-60% to-black h-full w-full"></div>
                        <div className="absolute bottom-5 z-20 left-0 w-full text-white text-center py-2 px-3">
                          <p className="font-rancho text-2xl md:text-3xl xl:text-4xl">
                            {item.city_name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Destinations;
