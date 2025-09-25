import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultimg from "../../assets/defaultimg.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const HomePopularStays = () => {
  let navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false); // Add a loading state

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const response = await axios.get(
          "https://backoffice.innerpece.com/api/v1/get-stay-destination"
        );
        setApiData(response.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchProgramData();
  }, []);

  const handleCardClick = (id, stay_title) => {
    // navigate(`/staysdetails/${id}`, {
    //   state: { id },
    // });

    const formattedThemeName = stay_title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

    navigate(`/stayslist/${id}/${formattedThemeName}`, {
      state: { stay_title },
    });

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  const SkeletonCard = ({ index }) => (
    <div
      key={index}
      className=" max-sm:hidden mx-2 h-80 md:h-96  bg-gray-600 flex-grow rounded-2xl animate-pulse"
    ></div>
  );

  const SkeletonCarouselCard = ({ index }) => (
    <div
      key={index}
      className="w-[90vw] sm:w-[70vw] mx-auto h-80 sm:hidden  bg-gray-600   rounded-2xl animate-pulse"
    ></div>
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
      } else if (window.innerWidth >= 1025 && window.innerWidth < 1200) {
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

  const onClickViewAll = () => {
    navigate("/stayslist", {
      state: {
        city_name: "tamil nadu",
      },
    });

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <>
      {loading ? (
        <div className="ms-5 me-5 mt-10 md:ms-16 md:me-16  md:mt-16">
          <p className="text-2xl md:text-3xl  lg:text-4xl  leading-loose text-[#141414]">
            <span className="font-jost font-medium">Popular </span>
            <span className="font-jost font-bold">Stays</span>
          </p>

          <div className="flex items-center flex-1 mt-8 md:mt-10   flex-grow flex-wrap justify-start ">
            {Array(skeltonArrayLength)
              .fill(0)
              .map((_, index) => (
                <SkeletonCard key={index} />
              ))}
          </div>
          {/* <div className="flex items-center flex-1 w-full  mt-5  flex-grow flex-wrap justify-center "> */}
          <div className="flex items-center flex-1   flex-grow flex-wrap justify-center  w-full">
            {Array(1)
              .fill(0)
              .map((_, index) => (
                <SkeletonCarouselCard key={index} />
              ))}
          </div>
        </div>
      ) : (
        <>
          {apiData && apiData.length > 0 && (
            <div className="ms-5 me-5 mt-10 md:ms-16 md:me-16  md:mt-16">
              <p className="text-2xl md:text-3xl  lg:text-4xl  leading-loose text-[#141414]">
                <span className="font-jost font-medium">Popular </span>
                <span className="font-jost font-bold">Stays</span>
              </p>

              <div className="mt-8 md:mt-10">
                {/* <Carousel
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
                  {apiData.map((item, index) => (
                    <div className="flex flex-col flex-grow flex-1 gap-3 h-[320px] w-[320px]  ">
                      <div
                        key={index}
                        onClick={() => handleCardClick(item.id, item.city_name)}
                        // className="relative  flex-grow  cursor-pointer group  rounded-tl-[20%] rounded-tr-md rounded-bl-md rounded-br-[20%]  overflow-hidden "
                          className="relative  flex-grow  cursor-pointer group  h-[320px] w-[320px] rounded-[150%] overflow-hidden "
                      >
                        <div className="absolute -z-20 bg-gradient-to-b from-transparent from-60% to-black h-full w-full"></div>
                        <img
                          src={
                            item.city_image
                              ? `https://backoffice.innerpece.com/${item.city_image}`
                              : defaultimg
                          }
                          alt={item.city_name}
                          className="h-[320px] w-[320px] flex-grow transform transition-transform duration-500 group-hover:scale-125 -z-40 object-cover bg-center absolute inset-0"
                        />
                       
                      </div>
                      <p className=" font-jost font-medium text-wrap  w-full text-center text-xl  text-black  bottom-5">
                          {item.city_name}
                        </p>
                    </div>
                  ))}
                </Carousel> */}

                <Carousel
                  responsive={responsive}
                  infinite={true}
                  autoPlay={true}
                  swipeable={true}
                  draggable={true}
                  showDots={false}
                  keyBoardControl={true}
                  containerClass="carousel-container"
                  itemClass=""
                  customLeftArrow={<CustomLeftArrow />}
                  customRightArrow={<CustomRightArrow />}
                >
                  {apiData.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col  items-center gap-3 "
                    >
                      <div
                        onClick={() => handleCardClick(item.id, item.city_name)}
                        className="relative cursor-pointer group h-[260px] shadow-xl shadow-black/20 w-[260px] rounded-full overflow-hidden  "
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-60% to-black z-10"></div>
                        <img
                          src={
                            item.city_image
                              ? `https://backoffice.innerpece.com/${item.city_image}`
                              : defaultimg
                          }
                          alt={item.city_name}
                          className="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <p className="font-jost font-medium text-center text-xl text-black">
                        {item.city_name}
                      </p>
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
};

export default HomePopularStays;
