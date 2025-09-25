// import React, { useState } from "react";
// import { GoLocation } from "react-icons/go";
// import { IoDocumentTextOutline } from "react-icons/io5";
// import { TbUserCheck } from "react-icons/tb";
// import { IoIosPeople } from "react-icons/io";
// import dummyEventImage from "../assets/dummyEventImage.avif";
// import { FaImage } from "react-icons/fa6";

// const CreateEvent = () => {
//   // form state
//   const [eventName, setEventName] = useState("");
//   const [capacity, setCapacity] = useState(50);
//   const [showDescription, setShowDesciption] = useState(false);
//   const [description, setDesciption] = useState("");
//   const [enteredLocation, setEnteredLocation] = useState("");
//   const [addEventLocationClicked, setAddEventLocationClicked] = useState(false);
//   const [requireApproval, setRequireApproval] = useState(false);
//   const [startDate, setStartDate] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [previewImage, setPreviewImage] = useState(null);

//   const onChangeImage = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Collect all values
//     const eventData = {
//       eventName,
//       startDate,
//       startTime,
//       endDate,
//       endTime,
//       location: enteredLocation,
//       description,
//       requireApproval,
//       capacity,
//       previewImage,
//     };

//     // You can now send `eventData` to backend API
//   };

//   return (
//     <div className="flex font-PlusJakartaSansMedium justify-center h-full w-full min-h-screen bg-gradient-to-r from-[#005fc4] to-blue-600">
//       <form
//         onSubmit={handleSubmit}
//         className="mt-10 flex gap-10 items-start justify-center max-w-4xl"
//       >
//         {/* Event Image Box */}
//         <label
//           htmlFor="imageUpload"
//           className="h-1/2 w-80 flex-grow relative cursor-pointer group "
//         >
//           <img
//             src={previewImage || dummyEventImage}
//             className="object-cover w-full h-full rounded-xl absolute"
//           />

//           <div className="w-9 h-9 rounded-full bg-white group-hover:bg-blue-400 border-2 border-black absolute p-2 flex items-center justify-center bottom-2 right-3">
//             <FaImage className="rounded group-hover:text-white" />
//           </div>
//         </label>

//         <input
//           onChange={onChangeImage}
//           id="imageUpload"
//           type="file"
//           accept="image/*"
//           className="hidden"
//         />

//         {/* Event Form */}
//         <div className="w-96 flex-grow flex flex-col gap-3">
//           <input
//             type="text"
//             placeholder="Event Name"
//             value={eventName}
//             onChange={(e) => setEventName(e.target.value)}
//             className="text-4xl text-gray-700 border-none py-3 bg-transparent outline-none w-full placeholder-gray-100/60"
//           />

//           {/* Start & End Date */}
//           <div className="bg-white/30 px-4 py-3 gap-1 flex flex-col rounded-lg">
//             <div className="flex justify-between items-center">
//               <p className="text-lg font-medium text-white/80">Start</p>
//               <div className="flex gap-1">
//                 <input
//                   type="date"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                   className="rounded-s-lg bg-white/30 outline-none hover:bg-white/40 cursor-pointer border-none text-white/80 px-2 py-1"
//                 />
//                 <input
//                   type="time"
//                   value={startTime}
//                   onChange={(e) => setStartTime(e.target.value)}
//                   className="rounded-e-lg bg-white/30 outline-none hover:bg-white/40 cursor-pointer border-none text-white/80 px-2 py-1"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-between items-center">
//               <p className="text-lg font-medium text-white/80">End</p>
//               <div className="flex gap-1">
//                 <input
//                   type="date"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                   className="rounded-s-lg bg-white/30 outline-none hover:bg-white/50 cursor-pointer border-none text-white/80 px-2 py-1"
//                 />
//                 <input
//                   type="time"
//                   value={endTime}
//                   onChange={(e) => setEndTime(e.target.value)}
//                   className="rounded-e-lg bg-white/30 outline-none hover:bg-white/50 cursor-pointer border-none text-white/80 px-2 py-1"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Location */}
//           <label htmlFor="addEventLocation">
//             <div
//               onClick={() => setAddEventLocationClicked(true)}
//               className="bg-white/30 hover:bg-white/40 px-4 py-3 items-center gap-2 rounded-lg flex cursor-pointer transition"
//             >
//               <GoLocation className="text-white/80 text-xl" />
//               {!addEventLocationClicked && (
//                 <p className="text-white/80">Add Event Location</p>
//               )}
//               {addEventLocationClicked && (
//                 <input
//                   type="text"
//                   id="addEventLocation"
//                   value={enteredLocation}
//                   onChange={(e) => setEnteredLocation(e.target.value)}
//                   className="bg-transparent text-white border-none outline-none w-full"
//                 />
//               )}
//             </div>
//           </label>

//           {/* Description */}
//           <div className="bg-white/30 hover:bg-white/40 flex flex-col rounded-lg px-4 py-3">
//             <div
//               onClick={() => setShowDesciption(true)}
//               className="cursor-pointer transition flex items-center gap-2"
//             >
//               <IoDocumentTextOutline className="text-white/80 text-xl" />
//               <p className="text-white/80">Add Event Description</p>
//             </div>

//             <textarea
//               value={description}
//               onChange={(e) => setDesciption(e.target.value)}
//               className={`bg-transparent text-white border-none outline-none mt-2 ${
//                 showDescription
//                   ? "block transition-all duration-1000 ease-in-out"
//                   : "hidden transition-all duration-1000 ease-in-out"
//               }`}
//             ></textarea>
//           </div>

//           {/* Event Options */}
//           <div>
//             <p className="mt-4 text-white text-sm font-medium">Event Options</p>

//             <div className="bg-white/30 px-4 py-3 mt-2 gap-4 rounded-lg flex flex-col">
//               {/* Approval */}
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-2">
//                   <TbUserCheck className="text-xl text-white/80" />
//                   <p className="text-white/80">Require Approval</p>
//                 </div>

//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={requireApproval}
//                     onChange={() => setRequireApproval(!requireApproval)}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-800 transition-colors duration-300"></div>
//                   <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
//                 </label>
//               </div>

//               <hr className="border-gray-100/20" />

//               {/* Capacity with Range Slider */}
//               <div className="flex flex-col gap-2">
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-2">
//                     <IoIosPeople className="text-xl text-white/80" />
//                     <p className="text-white/80">Capacity</p>
//                   </div>
//                   <input
//                     type="text"
//                     className="text-sm w-8 bg-transparent outline-none border-none font-semibold text-white"
//                     onChange={(e) => setCapacity(e.target.value)}
//                     value={capacity}
//                   />
//                 </div>
//                 <input
//                   type="range"
//                   min="5"
//                   max="900"
//                   value={capacity}
//                   onChange={(e) => setCapacity(e.target.value)}
//                   className="w-full accent-rose-500"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="bg-white rounded-lg w-full mt-4 py-2 font-medium text-lg text-black shadow-lg hover:opacity-90 transition"
//           >
//             Create Event
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateEvent;

import React, { useState } from "react";
import { GoLocation } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbUserCheck } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { FaImage } from "react-icons/fa6";
import { motion } from "framer-motion";
import dummyEventImage from "../assets/dummyEventImage.avif";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import styled from "styled-components";

const CreateEvent = () => {
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

  return (
    <>
      <TopHeader />
      <Header />
      <div className="flex justify-center items-center min-h-screen relative overflow-hidden font-PlusJakartaSansMedium">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#004aad] via-[#005fc4] to-[#0077ff] animate-gradient-x"></div>
        <div className="absolute inset-0 backdrop-blur-[2px] bg-black/20"></div> */}

        <motion.div
          className="absolute inset-0"
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
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <div className="absolute inset-0 backdrop-blur-[2px] bg-black/10"></div>
        </motion.div>

        {/* Form Container */}
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="relative z-10 flex gap-10 items-start justify-center max-w-5xl bg-white/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8"
        >
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
                <p className="text-lg font-medium text-black/80">Start</p>
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
              <p className="mt-2 text-black/90 font-semibold">Event Options</p>
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
                      onChange={() => setRequireApproval(!requireApproval)}
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
        </motion.form>
      </div>
    </>
  );
};

export default CreateEvent;
