import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import defaultimg from "../../assets/defaultimg.png";

const HomeBlogs = () => {
  let [apiData, setApiDate] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchDate = async () => {
      let response = await axios.get(
        "https://blogs.innerpece.com/wp-json/wp/v2/posts?per_page=100&_embed=true"
      );
      setApiDate(response.data);
      setLoading(false);
    };

    fetchDate();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1536 },
      items: 5,
    },
    largeDesktop: {
      breakpoint: { max: 1536, min: 1280 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 3,
    },
    smallLaptop: {
      breakpoint: { max: 1024, min: 820 },
      items: 2.5,
    },
    largeTablet: {
      breakpoint: { max: 820, min: 640 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 640, min: 480 },
      items: 1.5,
    },
    mobile: {
      breakpoint: { max: 480, min: 0 },
      items: 1,
    },
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

  const SkeletonCard = ({index}) => (
    <div key={index} className="max-sm:hidden mx-2 h-[260px] md:h-[280px]  bg-gray-600 flex-grow rounded-2xl animate-pulse"></div>
  );

  const SkeletonCarouselCard = ({index}) => (
    <div key={index} className="w-[90vw] sm:w-[70vw] mx-auto h-[280px] sm:hidden  bg-gray-600   rounded-2xl animate-pulse"></div>
  );

  // const imageUrl = post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? defaultimg;

  return (
    <>
      {loading ? (
        <div className="ms-5 me-5 mt-10 md:ms-16 md:me-16  md:mt-16">
          <p className="text-2xl md:text-3xl  lg:text-4xl  leading-loose text-[#141414]">
            <span className="font-jost font-medium ">Our </span>{" "}
            <span className="font-jost font-bold">Blog</span>
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
          {/* {apiData && apiData.length > 0 && (
            <div className="ms-5 me-5 mt-10 md:ms-16 md:me-16  md:mt-16">
              <p className="text-2xl md:text-3xl  lg:text-4xl  leading-loose text-[#141414]">
                <span className="font-jost font-medium ">Our </span>{" "}
                <span className="font-jost font-bold">Blog</span>
              </p>

              <Carousel
                responsive={responsive}
                swipeable
                draggable
                showDots={false}
                infinite
                autoPlay
                autoPlaySpeed={3000}
                keyBoardControl
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                itemClass="flex gap-5 justify-center pb-2 px-2 mt-8 md:mt-10 rounded-2xl "
              >
                {apiData?.map((post, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-white group overflow-hidden transition-all duration-300 w-full rounded-2xl shadow-md "
                  >
                    <a
                      href={post.link}
                      // target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 overflow-hidden"
                    >
                      

                      <div className="h-48 overflow-hidden">
                        <img
                          src={
                            post?._embedded?.["wp:featuredmedia"]?.[0]
                              ?.source_url
                              ? post._embedded["wp:featuredmedia"][0].source_url
                              : defaultimg
                          }
                          alt={post?.title?.rendered}
                          className="w-full h-48 object-cover overflow-hidden transition-transform duration-500 ease-in-out transform group-hover:scale-105 rounded-t-2xl"
                        />
                      </div>

                      <div className="flex flex-col justify-between h-full p-4">
                        <h3
                          className="text-[#000000] text-sm md:text-lg font-jost"
                          dangerouslySetInnerHTML={{
                            __html: post.title.rendered,
                          }}
                        />
                      </div>
                    </a>
                  </div>
                ))}
              </Carousel>
            </div>
          )} */}

          {apiData && apiData.length > 0 && (
            <div className="ms-5 me-5 mt-10 md:ms-16 md:me-16 md:mt-16">
              <p className="text-2xl md:text-3xl lg:text-4xl leading-loose text-[#141414]">
                <span className="font-jost font-medium">Our </span>
                <span className="font-jost font-bold">Blog</span>
              </p>

              <Carousel
                responsive={responsive}
                swipeable
                draggable
                showDots={false}
                infinite
                autoPlay
                autoPlaySpeed={3000}
                keyBoardControl
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                itemClass="flex gap-5 justify-center pb-2 px-2 mt-8 md:mt-10 rounded-2xl"
              >
                {apiData?.map((post, index) => {
                  const imageUrl =
                    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
                    defaultimg;

                  return (
                    <div
                      key={index}
                      className="flex flex-col bg-white group overflow-hidden transition-all duration-300 w-full rounded-2xl shadow-md"
                    >
                      <a
                        href={post?.link ?? "#"}
                        rel="noopener noreferrer"
                        className="flex-shrink-0 overflow-hidden"
                      >
                        <div className="h-48 overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={post?.title?.rendered ?? "Blog Image"}
                            className="w-full h-48 object-cover overflow-hidden transition-transform duration-500 ease-in-out transform group-hover:scale-105 rounded-t-2xl"
                          />
                        </div>

                        <div className="flex flex-col justify-between h-full p-4">
                          <h3
                            className="text-[#000000] text-sm md:text-lg font-jost"
                            dangerouslySetInnerHTML={{
                              __html: post?.title?.rendered ?? "",
                            }}
                          />
                        </div>
                      </a>
                    </div>
                  );
                })}
              </Carousel>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default HomeBlogs;
