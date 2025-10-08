import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { LazyMotion, domAnimation, m } from "framer-motion";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// const StyledWrapper = styled.div`
//   .btn-donate {
//     --clr-font-main: hsla(0 0% 20% / 100);
//     --btn-bg-1: hsla(194 100% 69% / 1);
//     --btn-bg-2: hsla(250 100% 56% / 1);
//     --btn-bg-color: hsla(900 100% 100% / 1);
//     --radii: 0.5em;
//     cursor: pointer;
//     padding: 0.1em 1.2em;
//     min-width: 120px;
//     min-height: 44px;
//     font-size: var(--size, 1rem);
//     font-weight: 500;
//     transition: background-position 0.6s ease-in-out;
//     background-size: 280% auto;
//     background-image: linear-gradient(
//       325deg,
//       var(--btn-bg-2) 0%,
//       var(--btn-bg-1) 55%,
//       var(--btn-bg-2) 90%
//     );
//     border: none;
//     border-radius: var(--radii);
//     color: var(--btn-bg-color);
//     box-shadow: 0px 0px 12px rgba(71, 184, 255, 0.4),
//       0px 4px 4px -1px rgba(58, 125, 233, 0.25);
//     will-change: transform, background-position;
//   }
//   .btn-donate:hover {
//     background-position: right top;
//   }
// `;

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
  const [active, setActive] = useState("upcoming");
  let navigate = useNavigate();

  const onClickManageEvent = () => {
    navigate("/manageEvent");
  };

  return (
    <>
      <TopHeader />
      <Header />

      <div className="flex flex-col items-center relative overflow-hidden pb-10">
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
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        </LazyMotion>

        {/* Main Content */}
        <div className="max-w-6xl w-full font-PlusJakartaSansMedium mt-10 border bg-white/40 shadow-xl shadow-black/30 p-8 backdrop-blur-md rounded-xl relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center">
            <p
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-extrabold text-black tracking-wide"
            >
              Events
            </p>

            {/* <div
              role="tablist"
              aria-label="Events filter"
              className="relative inline-flex bg-white/30 backdrop-blur-md p-1 rounded-2xl shadow-md"
            >
              <button
                role="tab"
                aria-selected={active === "upcoming"}
                onClick={() => setActive("upcoming")}
                className="relative z-0 flex-1 flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg overflow-hidden"
              >
                {active === "upcoming" && (
                  <LazyMotion features={domAnimation}>
                    <m.span
                      layoutId="switch-highlight"
                      className="absolute inset-1 rounded-lg bg-blue-600 shadow-md"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  </LazyMotion>
                )}
                <span
                  className={`relative z-10 ${
                    active === "upcoming" ? "text-white " : "text-black/70"
                  }`}
                >
                  Upcoming
                </span>
              </button>

              <button
                role="tab"
                aria-selected={active === "past"}
                onClick={() => setActive("past")}
                className="relative z-0 flex-1 flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg overflow-hidden"
              >
                {active === "past" && (
                  <LazyMotion features={domAnimation}>
                    <m.span
                      layoutId="switch-highlight"
                      className="absolute inset-1 rounded-lg bg-blue-600 shadow-md"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  </LazyMotion>
                )}
                <span
                  className={`relative z-10 ${
                    active === "past" ? "text-white" : "text-black/70"
                  }`}
                >
                  Past
                </span>
              </button>
            </div> */}

            <StyledWrapper>
              <div
                role="tablist"
                aria-label="Events filter"
                className="relative inline-flex bg-white/50 backdrop-blur-md p-2 rounded-2xl shadow-md"
              >
                {/* Upcoming */}
                <button
                  role="tab"
                  aria-selected={active === "upcoming"}
                  onClick={() => setActive("upcoming")}
                  className={`relative z-0 flex-1 flex w-32  items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg overflow-hidden ${
                    active === "upcoming" ? "btn-donate" : ""
                  }`}
                >
                  <span
                    className={`relative z-10 ${
                      active === "upcoming" ? "text-white" : "text-black/70"
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
                  className={`relative z-0 flex-1 w-32 flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg overflow-hidden ${
                    active === "past" ? "btn-donate" : ""
                  }`}
                >
                  <span
                    className={`relative z-10 ${
                      active === "past" ? "text-white" : "text-black/70"
                    }`}
                  >
                    Past
                  </span>
                </button>
              </div>
            </StyledWrapper>
          </div>

          {/* Timeline */}
          <div className="mt-16 relative flex flex-col">
            {[1, 2, 3, 4].map((item, i) => (
              // <LazyMotion key={i} features={domAnimation}>
              <div className="flex gap-10 relative will-change-transform">
                {/* Date */}
                <div className="flex flex-col min-w-[90px] items-end">
                  <p className="text-lg font-semibold">Sep 22</p>
                  <p className="text-black/70">Monday</p>
                </div>

                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className="w-7 h-8 rounded-full flex items-center justify-center bg-[#ccdeee]">
                    <div className="w-4 h-4 rounded-full bg-[#0088ff] animate-pulse" />
                  </div>
                  <div className="bg-black/10 w-1 h-full" />
                </div>

                {/* Card */}
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-md hover:bg-white/40 transition-all duration-500 mb-10 relative border border-transparent hover:border-blue-400">
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

                    {/* Image */}
                    <img
                      src="https://fastly.picsum.photos/id/352/200/300.jpg?hmac=JRE6d4eB1tvPUpBESG8XEM2_22EaXNe2luRrVkydr2E"
                      alt="event"
                      className="w-44 h-32 rounded-xl object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Button */}
                  <StyledWrapper className="mt-5">
                    <button onClick={onClickManageEvent} className="btn-donate">
                      Event Details
                    </button>
                  </StyledWrapper>
                </div>
              </div>
              // </LazyMotion>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsHistory;
