import React from "react";
import vector1 from "../assets/vector1.svg";
import vector2 from "../assets/vector2.svg";
import vector3 from "../assets/vector3.svg";
import vector4 from "../assets/vector4.svg";
import defaultimage from "../assets/defaultimg.png";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
// import { Helmet } from "react-helmet";
// import { Helmet } from "react-helmet-async";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BsHighlights } from "react-icons/bs";
import Carousel from "react-multi-carousel";

function Hero({
  handlehighlightsScroll,
  handleInformationScroll,
  handleTourPlanningScroll,
  handleLocationShareScroll,
  reviewRefScroll,
}) {
  useEffect(() => {
    document.title = "Tour Details - Innerpece";
  }, []); // Empty dependency array ensures it runs once on mount
  const location = useLocation();

  const { id, title } = location.state || {};
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ogImage, setOgImage] = useState("");

  useEffect(() => {
    const pathName = window.location.pathname;
    const slicedPathName = window.location.pathname.split("/")[1];

    const fetchProgramData = async () => {
      try {
        const storedUserDetails = localStorage.getItem("loginDetails");
        const userDetails = storedUserDetails
          ? JSON.parse(storedUserDetails)
          : null;

        const payload = {
          program_id: id ? id : slicedPathName,
          user_id: userDetails?.id || null,
        };

        const response = await axios.post(
          "https://backoffice.innerpece.com/api/v1/get-program-details",
          payload
        );

        setApiData(response.data.data);
        setOgImage(response.data.data.cover_img);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProgramData();
  }, []);

  useEffect(() => {
    const metaTag = document.querySelector("meta[property='og:image']");
    if (metaTag) {
      metaTag.content = apiData?.cover_img
        ? `https://backoffice.innerpece.com/${apiData.cover_img}`
        : "default-image-url";
    } else {
      const newMetaTag = document.createElement("meta");
      newMetaTag.setAttribute("property", "og:image");
      newMetaTag.content = apiData?.cover_img
        ? `https://backoffice.innerpece.com/${apiData.cover_img}`
        : "default-image-url";
      document.head.appendChild(newMetaTag);
    }
  }, [apiData]);

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
          className={`transition-all  duration-500 h-1 rounded-full ${
            active ? "bg-white w-5" : "bg-white/50 w-2"
          }`}
        />
      </li>
    );
  };


  return (
    <div className="relative ">
      <Helmet>
        <meta
          property="og:image"
          content={
            apiData.cover_img
              ? `https://backoffice.innerpece.com/${apiData.cover_img}`
              : defaultimage
          }
        />
      </Helmet>

      <HelmetProvider>
        <Helmet>
          <meta
            property="og:image"
            content={
              apiData.cover_img
                ? `https://backoffice.innerpece.com/${apiData.cover_img}`
                : defaultimage
            }
          />
        </Helmet>
      </HelmetProvider>

      {/* {loading ? (
        <div className=" h-[50vh] md:h-[40vh] lg:h-[50vh] w-full bg-gray-500 animate-pulse"></div>
      ) : (
        <img
          src={
            apiData.cover_img
              ? `https://backoffice.innerpece.com/${apiData.cover_img}`
              : defaultimage
          }
          alt=""
          className="h-[50vh] md:h-[40vh] lg:h-[50vh] w-full object-cover hidden md:flex"
        />
      )}

      <div className="absolute hidden md:flex  bg-white  -bottom-9 left-1/2 -translate-x-1/2  flex-wrap  gap-2 justify-start  md:justify-between rounded-3xl lg:rounded-full px-5 md:px-10 py-3 md:py-4  w-full md:w-11/12 lg:w-4/5 items-center shadow-lg shadow-black/10">
        <div
          onClick={handlehighlightsScroll}
          className="flex flex-grow cursor-pointer  gap-2 md:gap-3   py-1  items-center  md:justify-center"
        >
          <BsHighlights className="h-6 w-6 md:h-8 md:w-8 text-[#0F5B92]" />

          <p className="text-sm md:text-base font-semibold">Highlights</p>
        </div>

        <div
          onClick={handleTourPlanningScroll}
          className="flex flex-grow cursor-pointer   py-1  gap-2 md:gap-3 items-center  md:justify-center"
        >
          <img src={vector2} alt="" className="object-contain h-6 md:h-8" />
          <p className="text-sm md:text-base  font-semibold">Tour Planning</p>
        </div>

        <div
          onClick={handleInformationScroll}
          className="flex flex-grow cursor-pointer  gap-2 md:gap-3   py-1  items-center  md:justify-center"
        >
          <img
            src={vector1}
            alt={apiData.title}
            className="object-contain h-6 md:h-8"
          />
          <p className="text-sm md:text-base font-semibold">Notes</p>
        </div>

        {apiData.google_map && (
          <div
            onClick={handleLocationShareScroll}
            className="flex flex-grow cursor-pointer   py-1 gap-2 md:gap-3 items-center  md:justify-center"
          >
            <img src={vector3} alt="" className="object-contain h-6 md:h-8" />
            <p className="text-sm md:text-base  font-semibold">
              Location Share
            </p>
          </div>
        )}

        {apiData.review_count > 0 && (
          <div
            onClick={reviewRefScroll}
            className="flex flex-grow cursor-pointer   py-1 gap-2 md:gap-3 items-center  md:justify-center"
          >
            <img src={vector4} alt="" className="object-contain h-6 md:h-8" />
            <p className="text-sm md:text-base  font-semibold">
              <span>{apiData.review_count}</span>{" "}
              {apiData.review_count > 1 ? "Reviews" : "Review"}
            </p>
          </div>
        )}
      </div> */}

      {/* {apiData.gallery_img && (
        <Carousel
          pauseOnHover={false}
          responsive={{
            superLargeDesktop: {
              breakpoint: { max: 4000, min: 1441 },
              items: 1,
            },
            desktop: {
              breakpoint: { max: 1440, min: 1024 },
              items: 1,
            },
            tablet: {
              breakpoint: { max: 1024, min: 640 },
              items: 1,
            },
            mobile: {
              breakpoint: { max: 640, min: 0 },
              items: 1,
            },
          }}
          autoPlay={true}
          autoPlaySpeed={5000}
          arrows={false}
          keyBoardControl={true}
          transitionDuration={1000}
          containerClass="carousel-container mx-auto z-0 w-full object-cover "
          itemClass="carousel-item-padding-40-px block shadow-lg   object-cover shadow-black/10 "
          customDot={<CustomDot />}
          infinite
          swipeable
          draggable
          showDots
        >
          {apiData.gallery_img.map((item, index) => (
            <div
              key={item.id || index}
              className="overflow-hidden block md:hidden  "
            >
              <img
                src={
                  item
                    ? `https://backoffice.innerpece.com/${item}`
                    : defaultimage
                }
                alt={`Gallery Image ${index + 1}`}
                className="h-[50vh] md:h-[40vh] lg:h-[50vh] w-full object-cover "
              />
            </div>
          ))}
        </Carousel>
      )} */}

{loading ? (
  // ✅ Skeleton Loader (Shimmer)
  <div className="animate-pulse w-full md:hidden">
    <div className="relative h-[50vh] md:h-[40vh] lg:h-[50vh] w-full bg-gray-300 rounded-lg overflow-hidden">
      {/* shimmer gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
    </div>
  </div>
) : (
  apiData.gallery_img && (
    <Carousel
      pauseOnHover={false}
      responsive={{
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 1441 },
          items: 1,
        },
        desktop: {
          breakpoint: { max: 1440, min: 1024 },
          items: 1,
        },
        tablet: {
          breakpoint: { max: 1024, min: 640 },
          items: 1,
        },
        mobile: {
          breakpoint: { max: 640, min: 0 },
          items: 1,
        },
      }}
      autoPlay={true}
      autoPlaySpeed={5000}
      arrows={false}
      keyBoardControl={true}
      transitionDuration={1000}
      containerClass="carousel-container mx-auto z-0 w-full object-cover"
      itemClass="carousel-item-padding-40-px block shadow-lg object-cover shadow-black/10"
      customDot={<CustomDot />}
      infinite
      swipeable
      draggable
      showDots
    >
      {apiData.gallery_img.map((item, index) => (
        <div
          key={item.id || index}
          className="overflow-hidden block md:hidden"
        >
          <img
            src={
              item
                ? `https://backoffice.innerpece.com/${item}`
                : defaultimage
            }
            alt={`Gallery Image ${index + 1}`}
            className="h-[50vh] md:h-[40vh] lg:h-[50vh] w-full object-cover"
          />
        </div>
      ))}
    </Carousel>
  )
)}

    </div>
  );
}

export default Hero;
