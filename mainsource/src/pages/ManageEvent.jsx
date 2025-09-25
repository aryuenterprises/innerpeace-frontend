// import React from "react";
// import TopHeader from "../components/TopHeader";
// import Header from "../components/Header";
// import { motion } from "framer-motion";
// import { FaCalendarAlt } from "react-icons/fa";
// import { IoLocationSharp } from "react-icons/io5";
// import { FaSquareArrowUpRight } from "react-icons/fa6";
// import { FaSquareShareNodes } from "react-icons/fa6";
// import { IoAdd } from "react-icons/io5";

// const ManageEvent = () => {
//   return (
//     <>
//       <TopHeader />
//       <Header />
//       <div className="flex text-black/80 flex-col justify-center items-center min-h-screen relative overflow-hidden font-PlusJakartaSansMedium">
//         <motion.div
//           className="absolute inset-0 h-full w-full"
//           style={{
//             background: `radial-gradient(circle at 20% 30%, skyblue, transparent 50%),
//                      radial-gradient(circle at 70% 20%, #0073aa, transparent 20%),
//                      radial-gradient(circle at 40% 70%, blue, transparent 50%),
//                      radial-gradient(circle at 80% 80%, #FFFFFF, transparent 50%)`,
//             backgroundBlendMode: "overlay",
//             backgroundSize: "200% 200%",
//             filter: "blur(120px)",
//           }}
//           animate={{
//             backgroundPosition: [
//               "0% 0%",
//               "50% 50%",
//               "100% 0%",
//               "50% 50%",
//               "0% 0%",
//             ],
//           }}
//           transition={{
//             duration: 5,
//             ease: "linear",
//             repeat: Infinity,
//           }}
//         >
//           {/* <div className="absolute inset-0 backdrop-blur-[2px] bg-black/20"></div> */}
//         </motion.div>

//         <div className="relative z-10 max-w-4xl flex flex-col gap-2">
//           <div className="max-w-5xl flex justify-between gap-5 items-center ">
//             <p className="text-3xl w-3/5 ">
//               Officia vel anim adipisci consequatur Ipsum fuga Assumenda
//               quibusdam{" "}
//             </p>

//             <div className="flex items-center flex-nowrap gap-5">

//               <div className="bg-white/50 px-5 py-2 border gap-2 rounded-lg flex items-center">
//                 <FaSquareArrowUpRight />
//                 <button>Event Page</button>
//               </div>

//               <div className="bg-white/50 px-5 py-2 gap-2 rounded-lg flex items-center">
//                 <FaSquareShareNodes />
//                 <button>Share Event</button>
//               </div>
//             </div>
//           </div>

//           {/* <hr className="w-full border-black/50 mx-10 mt-5" /> */}

//           <div className=" flex gap-10 w-full mt-10 bg-white/50 p-4  backdrop-blur-3xl rounded-xl ">
//             <div className="bg-white/70 rounded-lg h-72 w-1/2 flex-grow"></div>

//             <div className="flex-grow flex flex-col justify-between gap-3 w-1/2">
//               <div className="flex flex-col gap-4">
//                 <p className="text-2xl font-semibold">When & Where </p>

//                 <div className="flex gap-2 items-center">
//                   <FaCalendarAlt className="text-2xl" />

//                   <div>
//                     <p>Today</p>
//                     <p>Today 6:30 PM - 7:30 PM GMT+5:30</p>
//                   </div>
//                 </div>

//                 <div className="flex gap-2 items-center">
//                   <FaCalendarAlt className="text-2xl" />

//                   <div>
//                     <p>Today</p>
//                     <p>Today 6:30 PM - 7:30 PM GMT+5:30</p>
//                   </div>
//                 </div>
//               </div>

//               <button className="bg-white/80  w-fit px-5 py-1 rounded-lg">
//                 Edit Event
//               </button>
//             </div>

//             <div></div>
//           </div>

//           <div>
//             <div className="flex items-center w-full justify-between mt-3">
//               <p className="text-2xl font-medium">Invites</p>

//               <button className="flex items-center gap-2 bg-white rounded-md px-2 py-1">
//                 <IoAdd />
//                 <p>Invite Guests</p>
//               </button>
//             </div>

//             <p>
//               Invite subscribers, contacts and past guests via email or SMS.{" "}
//             </p>
//           </div>

//           <div>
//             <div className="flex items-center w-full justify-between mt-3">
//               <p className="text-2xl font-medium">Hosts</p>

//               <button className="flex items-center gap-2 bg-white rounded-md px-2 py-1">
//                 <IoAdd />
//                 <p>Add Host</p>
//               </button>
//             </div>

//             <p>
//               Invite subscribers, contacts and past guests via email or SMS.{" "}
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ManageEvent;

import React, { useState } from "react";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaSquareArrowUpRight, FaSquareShareNodes } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbUserCheck } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { FaImage } from "react-icons/fa6";
import dummyEventImage from "../assets/dummyEventImage.avif";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

const ManageEvent = () => {
  const [eventName, setEventName] = useState("");
  const [capacity, setCapacity] = useState(50);
  const [showDescription, setShowDesciption] = useState(false);
  const [description, setDesciption] = useState("");
  const [enteredLocation, setEnteredLocation] = useState("");
  const [addEventLocationClicked, setAddEventLocationClicked] = useState(false);
  const [requireApproval, setRequireApproval] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [editEventClicked, setEditEventClicked] = useState(false);

  const onChangeImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      eventName,
      startDate,
      startTime,
      endDate,
      endTime,
      location: enteredLocation,
      description,
      requireApproval,
      capacity,
      previewImage,
    };
    // send eventData to backend API
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
      <div className="flex text-black/80 flex-col justify-center items-center min-h-screen relative overflow-hidden font-PlusJakartaSansMedium">
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0 h-full w-full"
          style={{
            background: `radial-gradient(circle at 20% 30%, skyblue, transparent 50%),
                     radial-gradient(circle at 70% 20%, #0073aa, transparent 20%),
                     radial-gradient(circle at 40% 70%, blue, transparent 50%),
                     radial-gradient(circle at 80% 80%, #FFFFFF, transparent 50%)`,
            backgroundBlendMode: "overlay",
            backgroundSize: "200% 200%",
            filter: "blur(120px)",
          }}
          animate={{
            backgroundPosition: [
              "0% 0%",
              "50% 50%",
              "100% 0%",
              "50% 50%",
              "0% 0%",
            ],
          }}
          transition={{
            duration: 5,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* <div className="absolute inset-0 backdrop-blur-[2px] bg-black/20"></div> */}
        </motion.div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl w-full px-6 py-10 flex flex-col gap-10">
          {/* Header Section */}
          <div className="flex justify-between gap-5 items-start">
            <h1 className="text-3xl font-bold leading-snug w-3/5">
              Officia vel anim adipisci consequatur Ipsum fuga Assumenda
              quibusdam
            </h1>

            <div className="flex items-center gap-4 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-white/70 hover:bg-white text-black px-5 py-2 rounded-lg shadow-md flex items-center gap-2"
              >
                <FaSquareArrowUpRight />
                <span>Event Page</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-white/70 hover:bg-white text-black px-5 py-2 rounded-lg shadow-md flex items-center gap-2"
              >
                <FaSquareShareNodes />
                <span>Share Event</span>
              </motion.button>
            </div>
          </div>

          {/* Event Details Card */}
          <div className="flex gap-8 w-full bg-white/60 backdrop-blur-3xl p-6 rounded-2xl shadow-lg">
            {/* <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-72 w-1/2 flex-grow shadow-inner" /> */}

            <img
              src="https://fastly.picsum.photos/id/352/200/300.jpg?hmac=JRE6d4eB1tvPUpBESG8XEM2_22EaXNe2luRrVkydr2E"
              alt=""
              className="h-72 w-1/2 flex-grow "
            />

            <div className="flex-grow flex flex-col justify-between gap-6 w-1/2">
              <div className="flex flex-col gap-5">
                <p className="text-2xl font-semibold">📍 When & Where</p>

                <div className="flex gap-3 items-start">
                  <FaCalendarAlt className="text-2xl text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Today</p>
                    <p className="text-sm text-gray-600">
                      Today 6:30 PM - 7:30 PM GMT+5:30
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <IoLocationSharp className="text-2xl text-red-500 mt-1" />
                  <div>
                    <p className="font-medium">Venue</p>
                    <p className="text-sm text-gray-600">
                      Madras Classic Cafe, Chennai
                    </p>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={() => setEditEventClicked(true)}
                whileHover={{ scale: 1.05 }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md w-fit"
              >
                Edit Event
              </motion.button>
            </div>
          </div>

          {/* Invites Section */}
          <div className="bg-white/70 p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-3">
              <p className="text-2xl font-semibold">Invites</p>
              <button className="flex w-40 items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition">
                <IoAdd />
                <span>Invite Guests</span>
              </button>
            </div>
            <p className="text-gray-700">
              Invite subscribers, contacts, and past guests via email or SMS.
            </p>
          </div>

          {/* Hosts Section */}
          <div className="bg-white/70 p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-3">
              <p className="text-2xl font-semibold">Hosts</p>
              <button className="flex items-center w-40 gap-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition">
                <IoAdd />
                <span>Add Host</span>
              </button>
            </div>
            <p className="text-gray-700">
              Add co-hosts to help manage and promote your event.
            </p>
          </div>
        </div>

        {editEventClicked && (
          <div
            // initial={{ opacity: 0, y: 50 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.8 }}
            className="fixed inset-0 z-10 flex items-center bg-black/10 justify-center backdrop-blur overflow-y-auto overflow-x-hidden"
          >
            <div className="flex items-center justify-center rounded-xl bg-gray-200">
              <div className="w-screen   md:w-[70vw] lg:w-[60vw]  shadow-2xl  shadow-black/30 rounded-xl">
                
                <div onClick={()=>setEditEventClicked(false)} className="flex justify-end mt-5 me-7">
                  <IoClose className="text-2xl cursor-pointer" />
                </div>

                {/* Form Container */}
                <form className="relative z-10 flex gap-10 p-5 rounded-xl items-start justify-center  shadow-2xl ">
                  {/* Event Image Upload */}
                  <label
                    htmlFor="imageUpload"
                    className="relative w-80 h-[350px] rounded-xl overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={previewImage || dummyEventImage}
                      className="object-cover w-full h-full rounded-xl"
                      alt="Event"
                    />
                    {/* Overlay Shine */}
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:opacity-70 transition"></div> */}

                    {/* Upload Icon */}
                    <div className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 group-hover:bg-blue-500 text-black group-hover:text-white shadow-lg transition">
                      <FaImage />
                    </div>
                  </label>
                  <input
                    onChange={onChangeImage}
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />

                  {/* Event Form Fields */}
                  <div className="flex flex-col gap-5 w-96">
                    {/* Event Name */}
                    <input
                      type="text"
                      placeholder="Event Name"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      className="text-3xl font-bold bg-transparent border-none outline-none text-black placeholder-black/60"
                    />

                    {/* Start & End Dates */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="bg-white/20 backdrop-blur-md px-4 py-3 gap-3 flex flex-col rounded-xl shadow-md"
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-medium text-black/80">
                          Start
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="rounded-lg bg-white/30 outline-none text-black/80 px-2 py-1 cursor-pointer"
                          />
                          <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="rounded-lg bg-white/30 outline-none text-balck/80 px-2 py-1 cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-lg font-medium text-black/80">End</p>
                        <div className="flex gap-2">
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="rounded-lg bg-white/30 outline-none text-black/80 px-2 py-1 cursor-pointer"
                          />
                          <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="rounded-lg bg-white/30 outline-none text-black/80 px-2 py-1 cursor-pointer"
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Location */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl shadow-md flex items-center gap-2"
                      onClick={() => setAddEventLocationClicked(true)}
                    >
                      <GoLocation className="text-black/80 text-xl" />
                      {!addEventLocationClicked ? (
                        <p className="text-black/80">Add Event Location</p>
                      ) : (
                        <input
                          type="text"
                          value={enteredLocation}
                          onChange={(e) => setEnteredLocation(e.target.value)}
                          className="bg-transparent text-black outline-none flex-1"
                        />
                      )}
                    </motion.div>

                    {/* Description */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl shadow-md flex flex-col gap-2"
                    >
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => setShowDesciption(true)}
                      >
                        <IoDocumentTextOutline className="text-black/80 text-xl" />
                        <p className="text-black/80">Add Event Description</p>
                      </div>
                      {showDescription && (
                        <textarea
                          value={description}
                          onChange={(e) => setDesciption(e.target.value)}
                          className="bg-transparent text-black outline-none resize-none mt-2"
                          rows="3"
                        ></textarea>
                      )}
                    </motion.div>

                    {/* Event Options */}
                    <div>
                      <p className="mt-2 text-black/90 font-semibold">
                        Event Options
                      </p>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-white/20 backdrop-blur-md px-4 py-4 mt-2 rounded-xl shadow-md flex flex-col gap-4"
                      >
                        {/* Approval */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <TbUserCheck className="text-black/80 text-xl" />
                            <p className="text-black/80">Require Approval</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={requireApproval}
                              onChange={() =>
                                setRequireApproval(!requireApproval)
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                          </label>
                        </div>

                        <hr className="border-white/20" />

                        {/* Capacity */}
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <IoIosPeople className="text-black/80 text-xl" />
                              <p className="text-black/80">Capacity</p>
                            </div>
                            <input
                              type="text"
                              value={capacity}
                              onChange={(e) => setCapacity(e.target.value)}
                              className="w-12 bg-transparent text-black font-semibold outline-none"
                            />
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="900"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            className="w-full accent-blue-500"
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Submit Button */}
                    {/* <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl w-full mt-4 py-3 font-bold text-white shadow-lg transition duration-500"
            >
              Create Event
            </motion.button> */}

                    <StyledWrapper className="mt-5">
                      <button className="btn-donate w-full">
                        <p className=""></p> Create Event
                      </button>
                    </StyledWrapper>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageEvent;
