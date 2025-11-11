import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { Swiper, SwiperSlide } from "swiper/react";
import defaultimg from "../../assets/defaultimg.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ParallaxImage from "../parallexImage";
import ParallaxImage2 from "../ParallexImage2";

function HomeTripCategory() {
  const [programsData, setProgramsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [skeltonArrayLength, setSkeletonArraylength] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 3000 && window.innerWidth <= 4000) {
        setSkeletonArraylength(6); // super large desktop
      } else if (window.innerWidth >= 1440 && window.innerWidth < 3000) {
        setSkeletonArraylength(5); // large desktop
      } else if (window.innerWidth >= 1024 && window.innerWidth < 1440) {
        setSkeletonArraylength(4); // desktop
      } else if (window.innerWidth >= 900 && window.innerWidth < 1024) {
        setSkeletonArraylength(3); // small desktop
      } else if (window.innerWidth >= 600 && window.innerWidth < 900) {
        setSkeletonArraylength(2); // tablet
      } else {
        setSkeletonArraylength(1); // mobile
      }
    };
    // Initial check
    handleResize();
    // Event listener
    window.addEventListener("resize", handleResize);
    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    axios
      .get(`https://backoffice.innerpece.com/api/v1/theme`)
      // .get(`https://backoffice.innerpece.com/api/get-combined-data`)
      .then((response) => {
        setProgramsData(response.data.themes);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Set loading to false even if there’s an error
      });
  }, []);

  // navigate to program details page
  const handleThemeClick = (id, themes_name) => {
    const formattedThemeName = themes_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

    navigate(`/tripcategories/${id}/${formattedThemeName}`, {
      state: { id, themes_name },
    });

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  const SkeletonCard = ({ index }) => (
    <div
      key={index}
      className=" max-md:hidden mx-3 h-[362px]  bg-gray-300 flex-grow rounded-2xl animate-pulse"
    ></div>
  );

  const SkeletonCarouselCard = ({ index }) => (
    <div
      key={index}
      className="w-[90vw] sm:w-[70vw] mx-auto h-60 md:hidden  bg-gray-300   rounded-2xl animate-pulse"
    ></div>
  );

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    largeDesktop: {
      breakpoint: { max: 3000, min: 1440 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 4,
    },
    smallDesktop: {
      breakpoint: { max: 1024, min: 900 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 900, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
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
        <ChevronLeft size={24} />
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
        <ChevronRight size={24} />
      </button>
    );
  };

  return (
    <>
      {loading ? ( // Show skeleton loaders while fetching data
        <div className=" ms-5 me-5 mt-10 md:ms-16 md:me-16  md:mt-16">
          <p className="text-2xl md:text-3xl  lg:text-4xl leading-loose text-[#141414] ">
            <span className="font-jost font-medium ">Trip </span>{" "}
            <span className="font-jost font-bold">Categories</span>
          </p>
          <div className="flex items-center flex-1 md:mt-10   flex-grow flex-wrap justify-start ">
            {Array(skeltonArrayLength)
              .fill(0)
              .map((_, index) => (
                <SkeletonCard key={index} />
              ))}
          </div>
          {/* <div className="flex items-center flex-1 w-full  mt-5  flex-grow flex-wrap justify-center "> */}
          <div className="flex items-center flex-1  mt-5 flex-grow flex-wrap justify-center  w-full">
            {Array(1)
              .fill(0)
              .map((_, index) => (
                <SkeletonCarouselCard key={index} />
              ))}
          </div>
        </div>
      ) : (
        <>
          {programsData.length > 0 && (
            <div className="ms-5 me-5 mt-10 md:ms-16 md:me-16  md:mt-16">
              <p className="text-2xl md:text-3xl  lg:text-4xl leading-loose text-[#141414] ">
                <span className="font-jost font-medium ">Trip </span>{" "}
                <span className=" font-jost font-bold">Categories</span>
              </p>

              <div className="">
                <div className="relative w-full mt-10 max-md:hidden">
                  <Carousel
                    responsive={responsive}
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    autoPlaySpeed={2000}
                    arrows={true}
                    autoPlay={true}
                    infinite={true}
                    customLeftArrow={<CustomLeftArrow />}
                    customRightArrow={<CustomRightArrow />}
                    containerClass="carousel-container"
                    itemClass="px-2"
                  >
                    {programsData.map((item, index) => (
                      // <div
                      //   key={index}
                      //   onClick={() =>
                      //     handleThemeClick(item.id, item.themes_name)
                      //   }
                      //   className="relative h-[362px] cursor-pointer group w-full rounded-2xl overflow-hidden flex items-center justify-center flex-grow"
                      // >
                      //   <div className="absolute -z-20 bg-gradient-to-b from-transparent from-60% to-black h-full w-full"></div>

                      //   <ParallaxImage
                      //     src={
                      //       item.theme_pic
                      //         ? `https://backoffice.innerpece.com/${item.theme_pic}`
                      //         : defaultimg
                      //     }
                      //     className="w-full h-[362px] flex-grow transform-all duration-700 group-hover:blur-sm -z-40 object-cover bg-center absolute inset-0"
                      //     alt="travel type"
                      //   />

                      //   <p
                      //     className="absolute font-rancho text-3xl lg:text-4xl text-white text-center bottom-5  group-hover:bottom-1/2 group-hover:translate-y-1/2 transition-all duration-1000 ease-in-out"
                      //   >
                      //     {item.themes_name}
                      //   </p>

                      //   <p className="text-white hidden group-hover:block absolute bottom-2 ransition-all duration-1000 ease-in-out">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, sint.</p>
                      // </div>
                      <div
                        key={index}
                        onClick={() =>
                          handleThemeClick(item.id, item.themes_name)
                        }
                        className="relative h-[362px] cursor-pointer group w-full rounded-2xl overflow-hidden flex items-center justify-center flex-grow"
                      >
                        <div className="absolute -z-20 bg-gradient-to-b from-transparent from-60% to-black h-full w-full"></div>

                        <img
                          src={
                            item.theme_pic
                              ? `https://backoffice.innerpece.com/${item.theme_pic}`
                              : defaultimg
                          }
                          className="w-full h-[362px] flex-grow transform-all duration-700 group-hover:blur-sm -z-40 object-cover bg-center absolute inset-0"
                          alt="travel type"
                        />

                        {/* Title Animation */}
                        <p
                          className="absolute font-rancho text-3xl lg:text-4xl text-white text-center bottom-5 
    group-hover:bottom-1/2 group-hover:translate-y-1/2 
    transition-all duration-700 ease-in-out"
                        >
                          {item.themes_name}
                        </p>

                        {/* Description Animation */}
                        <p
                          className="absolute text-white text-center px-4 opacity-0 translate-y-5 
    group-hover:opacity-100 group-hover:translate-y-0 
    transition-all duration-700 ease-out delay-100
    bottom-10"
                        >
                          {/* Discover the charm and beauty of {item.themes_name}. */}
                          {item.description
                            ? item.description
                            : `Discover the charm and beauty of ${item.themes_name}`}
                        </p>
                      </div>
                    ))}
                  </Carousel>
                </div>

                <div className="md:hidden h-60 overflow-hidden  relative w-full flex mt-5">
                  <Swiper
                    effect="cards"
                    grabCursor={true}
                    loop={true}
                    modules={[EffectCards]}
                    className="w-[70vw]"
                  >
                    {programsData.map((item, index) => (
                      <SwiperSlide
                        key={index}
                        onClick={() =>
                          handleThemeClick(item.id, item.themes_name)
                        }
                        className="relative flex items-center justify-center rounded-3xl w-56 h-60 cursor-pointer hover:-translate-y-1 shadow-sm shadow-black/10 hover:shadow-xl"
                      >
                        <div className="absolute -z-20 bg-gradient-to-b from-transparent from-60% to-black h-full w-full"></div>
                        <img
                          src={
                            item.theme_pic
                              ? `https://backoffice.innerpece.com/${item.theme_pic}`
                              : defaultimg
                          }
                          alt=""
                          className="w-full rounded-3xl h-full -z-40 bg-gradient shadow-black object-cover absolute inset-0"
                        />

                        <p className="absolute z-10 w-full h-full flex items-end font-rancho text-2xl sm:text-3xl justify-center  text-white font-semibold text-center bottom-5">
                          {item.themes_name}
                        </p>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* <div className="mt-10 max-md:hidden">
                  <Marquee
                    gradient={false}
                    speed={50}
                    pauseOnHover={true}
                    autoFill={true}
                  >
                    {[...programsData, ...programsData].map((item, index) => (
                      <div
                        key={index}
                        className="relative h-[362px] w-[300px] mx-3 cursor-pointer group/item flex-shrink-0 rounded-2xl overflow-hidden flex items-center justify-center"
                      >
                        <img
                          src={
                            item.theme_pic
                              ? `https://backoffice.innerpece.com/${item.theme_pic}`
                              : defaultimg
                          }
                          alt={item.themes_name}
                          className="w-full h-full transform transition-transform duration-500 group-hover/item:scale-125 object-cover absolute inset-0 z-0"
                        />
                        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent from-60% to-black h-full w-full pointer-events-none"></div>
                        <p className="absolute font-rancho text-3xl lg:text-4xl text-white bottom-5 text-center w-full z-20">
                          {item.themes_name}
                        </p>
                      </div>
                    ))}
                  </Marquee>
                </div> */}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default HomeTripCategory;
