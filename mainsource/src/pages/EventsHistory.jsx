import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import GoToTop from "../components/GoToTop";

const StyledWrapper = styled.div`
  .btn-donate {
    --clr-font-main: hsla(0 0% 20% / 100);
    --btn-bg-1: hsla(194 100% 69% / 1);
    --btn-bg-2: hsla(250 100% 56% / 1);
    --btn-bg-color: hsla(0 0% 100% / 1);
    --radii: 0.5em;
    cursor: pointer;
    padding: 0.1em 1.2em;
    min-width: 120px;
    min-height: 44px;
    font-size: var(--size, 1rem);
    font-weight: 500;
    transition: background-position 0.6s ease-in-out;
    background-size: 280% auto;
    background-image: linear-gradient(
      325deg,
      var(--btn-bg-2) 0%,
      var(--btn-bg-1) 55%,
      var(--btn-bg-2) 90%
    );
    border: none;
    border-radius: var(--radii);
    color: var(--btn-bg-color);
    box-shadow: 0px 0px 12px rgba(71, 184, 255, 0.4),
      0px 4px 4px -1px rgba(58, 125, 233, 0.25);
    will-change: transform, background-position;
  }

  .btn-donate:hover {
    background-position: right top;
  }

  /* 🔥 Active button style */
  .active-btn {
    background-position: right top;
    transform: scale(1.05);
  }
`;

const EventsHistory = () => {
  const [upcomingApiData, setUpcomingApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  const onClickManageEvent = (id) => {
    navigate(`/manageEvent/${id}`);
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        let response = await axios(
          "https://backoffice.innerpece.com/api/v1/program-events"
        );
        setLoading(false);
        setUpcomingApiData(response?.data?.data?.programdetails);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchApiData();
  }, []);

  const dateFormatter = (data) => {
    const date = new Date(data);
    const options = { month: "short", day: "numeric", weekday: "short" };
    return date.toLocaleDateString("en-US", options);
  };

  const SkeletonLoader = () => (
    <div className="flex flex-col gap-10">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="flex gap-1 flex-grow sm:gap-5 md:gap-10 animate-pulse"
          >
            <div className="sm:flex flex-col hidden items-center md:items-end gap-1 min-w-[50px] md:min-w-[90px]">
              <div className="h-4 w-10 bg-gray-300/60 rounded"></div>
              <div className="h-3 w-14 bg-gray-300/60 rounded"></div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-5 h-5 md:w-7 md:h-8 rounded-full bg-gray-300/70" />
              <div className="bg-gray-200/60 w-[2px] h-full" />
            </div>

            <div className="bg-white/60 backdrop-blur-md flex-grow rounded-2xl p-4 sm:p-5 md:p-6 w-full md:w-2/3 shadow-md border border-transparent flex flex-col gap-3">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2 w-full">
                  <div className="h-3 bg-gray-300/60 rounded w-1/4"></div>
                  <div className="h-5 bg-gray-300/60 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300/60 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-300/60 rounded w-1/2"></div>
                </div>
                <div className="w-44 h-32 bg-gray-300/60 rounded-xl"></div>
              </div>
              <div className="h-9 w-28 bg-gray-300/60 rounded"></div>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <>
      <Header />
      <GoToTop />
      <div className="flex gap-1 sm:gap-2  px-2 py-0.5  items-center">
        <Link to="/">
          <p className="text-xs sm:text-sm">Home</p>
        </Link>

        <MdOutlineKeyboardArrowRight className="text-xl" />
        <p className="text-blue-500 font-medium sm:font-semibold">
          Events History
        </p>
      </div>

      <div className="flex flex-col items-center  relative overflow-hidden pb-10">
        {/* Background animation */}
        <LazyMotion features={domAnimation}>
          <m.div
            className="absolute inset-0 h-full w-full will-change-transform"
            style={{
              background: `radial-gradient(circle at 20% 30%, skyblue, transparent 50%),
                      radial-gradient(circle at 70% 20%, #0073aa, transparent 20%),
                      radial-gradient(circle at 40% 70%, #005fc4, transparent 50%),
                      radial-gradient(circle at 80% 80%, pink, transparent 50%)`,
              backgroundBlendMode: "overlay",
              backgroundSize: "200% 200%",
              filter: "blur(120px)",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 15,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        </LazyMotion>

        {/* Main Content */}
        <div className="max-w-6xl w-full font-PlusJakartaSansMedium mt-10 xl:border xl:bg-white/40 xl:shadow-xl shadow-black/30 p-4 sm:p-6 md:p-8 backdrop-blur-md rounded-xl relative z-10">
          {upcomingApiData.length > 0 ? (
            <>
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-wide">
                  Events
                </p>
              </div>

              {/* Timeline */}
              <div className="mt-10 md:mt-16 relative flex flex-col">
                {loading ? (
                  <SkeletonLoader />
                ) : (
                  <>
                    {upcomingApiData.map((item, i) => (
                      <div
                        key={i}
                        className="flex  gap-1 sm:gap-5 md:gap-10 relative will-change-transform"
                      >
                        {/* Date */}
                        <div className="sm:flex flex-col hidden items-center md:items-end gap-1 min-w-[50px] md:min-w-[90px]">
                          <p className="text-xs sm:text-base md:text-lg ">
                            {dateFormatter(item.start_datetime).split(",")[0]}
                          </p>
                          <p className="text-xs sm:text-sm md:text-base text-black/70 font-semibold">
                            {dateFormatter(item.start_datetime).split(",")[1]}
                          </p>
                        </div>

                        {/* Timeline line */}
                        <div className="flex flex-col items-center ">
                          <div className="w-5 h-5 md:w-7 md:h-8 rounded-full flex items-center justify-center bg-[#ccdeee]">
                            <div className="w-2.5 h-2.5 md:w-4 md:h-4 rounded-full bg-[#0088ff] animate-pulse" />
                          </div>
                          <div className="bg-black/10 w-[2px] h-full" />
                        </div>

                        {/* Card */}
                        <div className="flex flex-col sm:hidden flex-grow">
                          <div className="flex  flex-col mb-2 ms-3  md:items-end gap-1 min-w-[50px] md:min-w-[90px]">
                            <p className="text-xs sm:text-base md:text-lg ">
                              {dateFormatter(item.start_datetime).split(",")[0]}
                            </p>
                            <p className="text-xs sm:text-sm md:text-base text-black/70 font-semibold">
                              {dateFormatter(item.start_datetime).split(",")[1]}
                            </p>
                          </div>
                          <div className="bg-white/60 backdrop-blur-md flex-grow rounded-2xl p-4 sm:p-5 md:p-6 w-full md:w-2/3 shadow-md hover:bg-white/40 transition-all duration-500 mb-8 md:mb-10 relative border border-transparent hover:border-blue-400 ">
                            <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-between">
                              {/* Info */}
                              <div className="flex flex-col gap-2 md:gap-3">
                                <p className="text-xs md:text-sm text-black/70">
                                  {item.start_datetime.split(" ")[1]}{" "}
                                  {item.start_datetime.split(" ")[2]}
                                </p>

                                <p className="text-base sm:text-lg md:text-xl font-bold leading-snug text-black">
                                  {item.event_name}
                                </p>

                                <div className="flex gap-2 items-start text-xs sm:text-sm md:text-base text-black/80">
                                  <IoLocationOutline className="text-lg md:text-2xl flex-shrink-0" />
                                  <p>{item.location_address}</p>
                                </div>
                                <div className="flex gap-2 items-center text-xs sm:text-sm md:text-base text-black/80">
                                  <FiUsers className="text-base md:text-xl flex-shrink-0" />
                                  <p>{item.registration_count} Guest</p>
                                </div>
                              </div>

                              {/* Image */}
                              <img
                                src={`https://backoffice.innerpece.com/${item.cover_img}`}
                                alt="event"
                                className="w-full flex-shrink-0 sm:w-64 md:w-44 h-40 md:h-32 rounded-xl object-top object-cover"
                                loading="lazy"
                              />
                            </div>

                            {/* Button */}
                            <StyledWrapper className="mt-4 md:mt-5">
                              <button
                                onClick={() => onClickManageEvent(item.id)}
                                className="btn-donate text-sm sm:text-base"
                              >
                                Event Details
                              </button>
                            </StyledWrapper>
                          </div>
                        </div>

                        <div className="bg-white/60 max-sm:hidden backdrop-blur-md rounded-2xl p-4 sm:p-5 md:p-6 w-full md:w-2/3 shadow-md hover:bg-white/40 transition-all duration-500 mb-8 md:mb-10 relative border border-transparent hover:border-blue-400 flex-grow">
                          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-between">
                            {/* Info */}
                            <div className="flex flex-col gap-2 md:gap-3">
                              <p className="text-xs md:text-sm text-black/70">
                                {item.start_datetime.split(" ")[1]}{" "}
                                {item.start_datetime.split(" ")[2]}
                              </p>

                              <p className="text-base sm:text-lg md:text-xl font-bold leading-snug text-black">
                                {item.event_name}
                              </p>

                              <div className="flex gap-2 items-start text-xs sm:text-sm md:text-base text-black/80">
                                <IoLocationOutline className="text-lg md:text-2xl flex-shrink-0" />
                                <p>{item.location_address}</p>
                              </div>
                              <div className="flex gap-2 items-center text-xs sm:text-sm md:text-base text-black/80">
                                <FiUsers className="text-base md:text-xl flex-shrink-0" />
                                <p>{item.registration_count} Guest</p>
                              </div>
                            </div>

                            {/* Image */}
                            <img
                              src={`https://backoffice.innerpece.com/${item.cover_img}`}
                              alt="event"
                              className="w-full flex-shrink-0 sm:w-64 md:w-44 h-40 md:h-32 rounded-xl object-top object-cover"
                              loading="lazy"
                            />
                          </div>

                          {/* Button */}
                          <StyledWrapper className="mt-4 md:mt-5">
                            <button
                              onClick={() => onClickManageEvent(item.id)}
                              className="btn-donate text-sm sm:text-base"
                            >
                              Event Details
                            </button>
                          </StyledWrapper>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </>
          ) : (
            <div>
              <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-center text-black tracking-wide">
                Events Coming Soon...
              </p>{" "}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EventsHistory;
