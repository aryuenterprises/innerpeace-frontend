import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultimg from "../assets/defaultimg.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const StaysTamilnadu = () => {
  let navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false); // Add a loading state

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const response = await axios.get(
          "https://backoffice.innerpece.com/api/v1/get-stays",
          {
            params: {
              destination: "Himachal Pradesh",
            },
          }
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

    navigate(`/staysdetails/${id}`, {
      state: { id },
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
    handleResize();
    window.addEventListener("resize", handleResize);
    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {loading ? (
        <div className="ms-5 me-5 mt-10 md:ms-16 md:me-16  md:mt-16">
          <p className="text-2xl md:text-3xl  lg:text-4xl  leading-loose text-[#141414]">
            <span className="font-jost font-medium">Popular Stays in </span>
            <span className="font-jost font-bold">Himachal Pradesh</span>
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
              <p className="text-2xl md:text-3xl leading-tight  lg:text-4xl  leading-loose text-[#141414]">
                <span className="font-jost font-medium">Popular Stays in </span>
                <span className="font-jost font-bold">Himachal Pradesh</span>
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
                  {apiData.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col flex-grow flex-1  h-[380px]  "
                    >
                      <div
                        onClick={() =>
                          handleCardClick(item.id, item.stay_title)
                        }
                        className="relative  flex-grow  cursor-pointer group  rounded-t-2xl  overflow-hidden "
                      >
                        <div className="absolute  -z-20 bg-gradient-to-b from-transparent from-60% to-black h-full w-full"></div>
                        <img
                          src={
                            item.images[0]
                              ? `https://backoffice.innerpece.com/${item.images[0]}`
                              : defaultimg
                          }
                          alt={item.stay_title}
                          className="w-full h-[362px] flex-grow transform transition-transform duration-500 group-hover:scale-125 -z-40 object-cover bg-center absolute inset-0"
                        />
                        {/* <p className="absolute font-jost font-medium  w-full  ps-5 text-3xl  text-white  bottom-5"></p>
                        <p className="absolute font-jost font-medium  w-full  ps-5 text-3xl  text-white  bottom-2">
                          {item.stay_title}
                        </p> */}

                        <div className="absolute font-mulish font-medium  w-full  ps-5 text-2xl  text-white  bottom-2">
                          <p className="font-semibold">
                            {" "}
                            {item?.stay_title
                              .split(" ")
                              .slice(0, -1)
                              .join(" ")
                              .slice(0, 16)}
                            ....
                          </p>
                          <p className="font-jost text-[18px] font-medium">
                            {" "}
                            {item.stay_title.split(" ").slice(-1)[0]}
                          </p>
                        </div>
                      </div>

                      {/* <p className="font-jost font-medium  w-full text-center text-3xl  text-black  bottom-5">
                         {item.stay_title}
                       </p> */}
                      <div className="border border-[#CCCCCC] border-t-0 p-3 mb-1 rounded-2xl rounded-t-none ">
                        {item.tag_line && <p>{item.tag_line}</p>}
                        <div className="flex gap-5">
                          {item.actual_price && (
                            <del className=" text-xl text-[#7C7C7C]">
                              ₹ {Number(item.actual_price).toLocaleString()}
                            </del>
                          )}
                          <p className="font-bold text-xl">
                            {/* ₹{item.discount_price} */}₹{" "}
                            {Number(item.discount_price).toLocaleString()}
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
};

export default StaysTamilnadu;
