import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";

import beach_image from "../assets/beach-image.jpeg";
import styled from "styled-components";
import LiquidGlass from "liquid-glass-react";

const EventsHistory = () => {
  const [active, setActive] = useState("upcoming");
  let navigate = useNavigate();

  const onClickManageEvent = () => {
    navigate("/manageEvent");
  };

  const StyledWrapper = styled.div`
    .btn-donate {
      --clr-font-main: hsla(0 0% 20% / 100);
      --btn-bg-1: hsla(194 100% 69% / 1);
      --btn-bg-2: hsla(250 100% 56% / 1);
      --btn-bg-color: hsla(900 100% 100% / 1);
      --radii: 0.5em;
      cursor: pointer;
      padding: 0.1em 1.2em;
      min-width: 120px;
      min-height: 44px;
      font-size: var(--size, 1rem);
      font-weight: 500;
      transition: 0.8s;
      background-size: 280% auto;
      //  background-color: #004496;
      background-image: linear-gradient(
        325deg,
        var(--btn-bg-2) 0%,
        var(--btn-bg-1) 55%,
        var(--btn-bg-2) 90%
      );
      border: none;
      border-radius: var(--radii);
      color: var(--btn-bg-color);
      box-shadow: 0px 0px 20px rgba(71, 184, 255, 0.5),
        0px 5px 5px -1px rgba(58, 125, 233, 0.25),
        inset 4px 4px 8px rgba(175, 230, 255, 0.5),
        inset -4px -4px 8px rgba(19, 95, 216, 0.35);
    }
    .btn-donate:hover {
      background-position: right top;
    }
    @media (prefers-reduced-motion: reduce) {
      .btn-donate {
        transition: linear;
      }
    }
  `;
  return (
    <>
      <TopHeader />
      <Header />

      <div className='flex flex-col items-center relative overflow-hidden pb-10 bg-[url("././assets/beach-image.jpeg")] object-cover object-center'>
        <div className="flex justify-end w-full mt-20 me-16">
          <Link to="/createEvent" className="relative z-10 ">
            {/* <button className="bg- px-5 py-2 rounded-lg text-white hover:scale-105 bg-blue-600  transition-all duration-700 ease-in-out">
              Create Event
            </button> */}
            <StyledWrapper>
              <button className="btn-donate">
                <p className=""></p> Create Event
              </button>
            </StyledWrapper>
          </Link>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl w-full mt-10 border bg-white/30 shadow-2xl shadow-black/40 p-8  backdrop-blur-xl rounded-xl relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center">
            <motion.p
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl font-extrabold text-black tracking-wide "
            >
              Events
            </motion.p>

            <div
              role="tablist"
              aria-label="Events filter"
              className="relative inline-flex  bg-white/20 backdrop-blur-xl p-1 rounded-2xl shadow-lg"
            >
              {/* Upcoming */}
              <button
                role="tab"
                aria-selected={active === "upcoming"}
                onClick={() => setActive("upcoming")}
                className="relative z-0 flex-1 flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg overflow-hidden"
              >
                {active === "upcoming" && (
                  <motion.span
                    layoutId="switch-highlight"
                    className="absolute inset-1 rounded-lg bg-blue-600 shadow-md"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    active === "upcoming" ? "text-white " : "text-black/70"
                  }`}
                >
                  Upcoming
                </span>
              </button>

              {/* Past */}
              <button
                role="tab"
                aria-selected={active === "past"}
                onClick={() => setActive("past")}
                className="relative z-0 flex-1 flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg overflow-hidden"
              >
                {active === "past" && (
                  <motion.span
                    layoutId="switch-highlight"
                    className="absolute inset-1 rounded-lg bg-blue-500 shadow-md"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    active === "past" ? "text-white" : "text-black/70"
                  }`}
                >
                  Past
                </span>
              </button>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-16 relative flex flex-col ">
            {[1, 2, 3, 4].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="flex gap-10 relative"
              >
                {/* Date */}
                <div className="flex flex-col min-w-[90px] items-end">
                  <p className="text-lg font-semibold">Sep 22</p>
                  <p className="text-black/70">Monday</p>
                </div>

                {/* Vertical line */}
                <div className="flex flex-col items-center">
                  {/* Dot */}
                  {/* <div className="w-3 h-3  bg-gradient-to-r   from-blue-400 to-blue-500 rounded-full"></div> */}

                  {/* <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: "radial-gradient(circle, #60a5fa, #3b82f6)",
                    }}
                  ></div> */}

                  <div className="w-7 h-8 rounded-full flex items-center justify-center bg-[#ccdeee]">
                    <div className="w-4 h-4 rounded-full bg-[#0088ff] animate-pulse"></div>
                  </div>

                  {/* Dashed line */}
                  <div className="bg-blue-200/70 w-1  h-full"></div>
                </div>

                {/* Card */}
                <div className=" bg-white/50 backdrop-blur-2xl rounded-2xl p-6 shadow-xl  hover:bg-white/30 transition-all duration-500 mb-10 relative overflow-hidden border group hover:border hover:border-blue-400">
                  {/* Shine effect */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70
                   to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                  ></div>

                  <div className="flex gap-6">
                    {/* Info */}
                    <div className="flex flex-col gap-3">
                      <p className="text-sm text-black/70">6:30 PM</p>
                      <p className="text-xl font-bold leading-snug">
                        Lorem ipsum dolor sit amet consectetur elit. Ad, fuga.
                      </p>
                      <div className="flex gap-2 items-center text-sm text-black/80">
                        <IoLocationOutline />
                        <p>Location Missing</p>
                      </div>
                      <div className="flex gap-2 items-center text-sm text-black/80">
                        <FiUsers />
                        <p>No guests</p>
                      </div>
                    </div>

                    {/* Image Placeholder */}
                    {/* <div className="w-44 h-32 rounded-xl bg-gradient-to-br from-black/20 to-black/10 shadow-md"></div> */}

                    <img
                      src="https://fastly.picsum.photos/id/352/200/300.jpg?hmac=JRE6d4eB1tvPUpBESG8XEM2_22EaXNe2luRrVkydr2E"
                      alt=""
                      className="w-44 h-32 rounded-xl object-cover"
                    />
                  </div>

                  <StyledWrapper className="mt-5">
                    <button
                      onClick={() => onClickManageEvent()}
                      className="btn-donate"
                    >
                      <p className=""></p> Manage Event
                    </button>
                  </StyledWrapper>

                  {/* <div className="mt-6 w-full">
                    <button
                      onClick={() => onCLickManageEvent()}
                      type="submit"
                      className={`relative overflow-hidden py-2 px-10 text-white font-semibold rounded-full transition-all duration-500 ${"bg-blue-600 hover:text-white hover:scale-105 before:absolute before:inset-0 before:bg-custom-gradient  before:translate-x-[-100%] before:transition-transform before:duration-500 before:ease-in-out hover:before:translate-x-0 hover:border"}`}
                    >
                      <span className="relative z-10">Manage</span>
                    </button>
                  </div> */}
                  {/* <motion.button
                    onClick={() => onCLickManageEvent()}
                    whileHover={{ scale: 1.05 }}
                    className="mt-5 flex items-center gap-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white px-5 py-2 rounded-full text-sm font-medium shadow-lg transition-all"
                  >
                    Manage Event
                  </motion.button> */}

                  {/* <StyledWrapper>
                    <button className="button">
                      <div className="dots_border" />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="sparkle"
                      >
                        <path
                          className="path"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          stroke="black"
                          fill="black"
                          d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
                        />
                        <path
                          className="path"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          stroke="black"
                          fill="black"
                          d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
                        />
                        <path
                          className="path"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          stroke="black"
                          fill="black"
                          d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
                        />
                      </svg>
                      <span className="text_button">Manage Event</span>
                    </button>
                  </StyledWrapper> */}

                  {/* <StyledWrapper>
                    <button>Manage Event</button>
                  </StyledWrapper> */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsHistory;
