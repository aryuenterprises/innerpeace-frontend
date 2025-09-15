// import React, { useState } from "react";
// import { GoLocation } from "react-icons/go";
// import { IoDocumentTextOutline } from "react-icons/io5";
// import { TbUserCheck } from "react-icons/tb";
// import { IoIosPeople } from "react-icons/io";
// import dummyEventImage from "../assets/dummyEventImage.avif";
// import { FaImage } from "react-icons/fa6";

// const CreateEvent = () => {
//   const [capacity, setCapacity] = useState(50);
//   const [showDescription, setShowDesciption] = useState(false);
//   const [description, setDesciption] = useState("");
//   const [enteredLocation, setEnteredLocation] = useState("");
//   const [addEventLocationClicked, setAddEventLocationClicked] = useState(false);

//   const [previewImage, setPreviewImage] = useState(null);

//   const onChangeImage = (e) => {

//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setPreviewImage(URL.createObjectURL(file));
//     }

//   };

//   return (
//     <div className="flex  font-PlusJakartaSansMedium justify-center h-full w-full min-h-screen bg-gradient-to-r from-[#005fc4] to-blue-600">
//       <div className="mt-10 flex gap-10 items-start justify-center max-w-4xl">
//         {/* Event Image Box */}
//         <label
//           htmlFor="imageUpload"
//           className="h-1/2 w-80 flex-grow relative cursor-pointer group "
//         >
//           <img
//             src={previewImage || dummyEventImage}
//             className="object-cover w-full h-full rounded-xl absolute "
//           />

//           <div className="w-9 h-9 rounded-full bg-white group-hover:bg-blue-400 border-2 border-black absolute p-2 flex items-center justify-center  bottom-2 right-3">
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
//             className="text-4xl text-gray-700 border-none  py-3 bg-transparent  outline-none w-full placeholder-gray-100/60"
//           />

//           {/* Start & End Date */}
//           <div className="bg-white/30 px-4 py-3  gap-1 flex flex-col rounded-lg ">
//             <div className="flex justify-between items-center">
//               <p className="text-lg font-medium text-white/80">Start</p>
//               <div className="flex gap-1">
//                 <input
//                   type="date"
//                   className="rounded-s-lg bg-white/30 outline-none hover:bg-white/40 cursor-pointer border-none text-white/80 px-2 py-1"
//                 />
//                 <input
//                   type="time"
//                   className="rounded-e-lg  bg-white/30  outline-none hover:bg-white/40 cursor-pointer border-none text-white/80 px-2 py-1"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-between items-center">
//               <p className="text-lg font-medium text-white/80">End</p>
//               <div className="flex gap-1">
//                 <input
//                   type="date"
//                   className="rounded-s-lg  bg-white/30  outline-none hover:bg-white/50 cursor-pointer border-none text-white/80 px-2 py-1"
//                 />
//                 <input
//                   type="time"
//                   className="rounded-e-lg  bg-white/30  outline-none hover:bg-white/50 cursor-pointer border-none text-white/80 px-2 py-1"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Location */}
//           <label htmlFor="addEventLocation">
//             <div
//               onClick={() => setAddEventLocationClicked(true)}
//               className="bg-white/30 hover:bg-white/40  px-4 py-3  items-center gap-2 rounded-lg flex   cursor-pointer transition"
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
//                   // onChange={(e)=>setEnteredLocation()}
//                   className="bg-transparent text-white border-none outline-none w-full"
//                 />
//               )}
//             </div>
//           </label>

//           {/* Description */}
//           <div className="bg-white/30 hover:bg-white/40  flex flex-col  rounded-lg   px-4 py-3 ">
//             <div
//               onClick={() => setShowDesciption(true)}
//               className="  cursor-pointer transition flex items-center gap-2"
//             >
//               <IoDocumentTextOutline className="text-white/80 text-xl" />
//               <p className="text-white/80">Add Event Description</p>
//             </div>

//             <textarea
//               name=""
//               id=""
//               value={description}
//               onChange={(e) => setDesciption(e.target.value)}
//               className={` bg-transparent text-white border-none outline-none mt-2 ${
//                 showDescription
//                   ? "block transition-all duration-1000 ease-in-out "
//                   : "hidden transition-all duration-1000 ease-in-out"
//               }`}
//             ></textarea>
//           </div>

//           {/* Event Options */}
//           <div>
//             <p className="mt-4 text-white text-sm font-medium">Event Options</p>

//             <div className="bg-white/30  px-4 py-3 mt-2 gap-4 rounded-lg flex flex-col ">
//               {/* Approval */}
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-2">
//                   <TbUserCheck className="text-xl text-white/80" />
//                   <p className="text-white/80">Require Approval</p>
//                 </div>
//                 {/* <input type="" className="w-5 h-5 accent-black" /> */}

//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     // checked={enabled}
//                     // onChange={() => setEnabled(!enabled)}
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
//                     className="text-sm  w-8 bg-transparent outline-none border-none font-semibold text-white"
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
//           <button className="bg-white rounded-lg w-full mt-4 py-2 font-medium text-lg text-black shadow-lg hover:opacity-90 transition">
//             Create Event
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateEvent;

import React, { useState } from "react";
import { GoLocation } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbUserCheck } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import dummyEventImage from "../assets/dummyEventImage.avif";
import { FaImage } from "react-icons/fa6";

const CreateEvent = () => {
  // form state
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

    // Collect all values
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

    // You can now send `eventData` to backend API
  };

  return (
    <div className="flex font-PlusJakartaSansMedium justify-center h-full w-full min-h-screen bg-gradient-to-r from-[#005fc4] to-blue-600">
      <form
        onSubmit={handleSubmit}
        className="mt-10 flex gap-10 items-start justify-center max-w-4xl"
      >
        {/* Event Image Box */}
        <label
          htmlFor="imageUpload"
          className="h-1/2 w-80 flex-grow relative cursor-pointer group "
        >
          <img
            src={previewImage || dummyEventImage}
            className="object-cover w-full h-full rounded-xl absolute"
          />

          <div className="w-9 h-9 rounded-full bg-white group-hover:bg-blue-400 border-2 border-black absolute p-2 flex items-center justify-center bottom-2 right-3">
            <FaImage className="rounded group-hover:text-white" />
          </div>
        </label>

        <input
          onChange={onChangeImage}
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
        />

        {/* Event Form */}
        <div className="w-96 flex-grow flex flex-col gap-3">
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="text-4xl text-gray-700 border-none py-3 bg-transparent outline-none w-full placeholder-gray-100/60"
          />

          {/* Start & End Date */}
          <div className="bg-white/30 px-4 py-3 gap-1 flex flex-col rounded-lg">
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium text-white/80">Start</p>
              <div className="flex gap-1">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="rounded-s-lg bg-white/30 outline-none hover:bg-white/40 cursor-pointer border-none text-white/80 px-2 py-1"
                />
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="rounded-e-lg bg-white/30 outline-none hover:bg-white/40 cursor-pointer border-none text-white/80 px-2 py-1"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-lg font-medium text-white/80">End</p>
              <div className="flex gap-1">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="rounded-s-lg bg-white/30 outline-none hover:bg-white/50 cursor-pointer border-none text-white/80 px-2 py-1"
                />
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="rounded-e-lg bg-white/30 outline-none hover:bg-white/50 cursor-pointer border-none text-white/80 px-2 py-1"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <label htmlFor="addEventLocation">
            <div
              onClick={() => setAddEventLocationClicked(true)}
              className="bg-white/30 hover:bg-white/40 px-4 py-3 items-center gap-2 rounded-lg flex cursor-pointer transition"
            >
              <GoLocation className="text-white/80 text-xl" />
              {!addEventLocationClicked && (
                <p className="text-white/80">Add Event Location</p>
              )}
              {addEventLocationClicked && (
                <input
                  type="text"
                  id="addEventLocation"
                  value={enteredLocation}
                  onChange={(e) => setEnteredLocation(e.target.value)}
                  className="bg-transparent text-white border-none outline-none w-full"
                />
              )}
            </div>
          </label>

          {/* Description */}
          <div className="bg-white/30 hover:bg-white/40 flex flex-col rounded-lg px-4 py-3">
            <div
              onClick={() => setShowDesciption(true)}
              className="cursor-pointer transition flex items-center gap-2"
            >
              <IoDocumentTextOutline className="text-white/80 text-xl" />
              <p className="text-white/80">Add Event Description</p>
            </div>

            <textarea
              value={description}
              onChange={(e) => setDesciption(e.target.value)}
              className={`bg-transparent text-white border-none outline-none mt-2 ${
                showDescription
                  ? "block transition-all duration-1000 ease-in-out"
                  : "hidden transition-all duration-1000 ease-in-out"
              }`}
            ></textarea>
          </div>

          {/* Event Options */}
          <div>
            <p className="mt-4 text-white text-sm font-medium">Event Options</p>

            <div className="bg-white/30 px-4 py-3 mt-2 gap-4 rounded-lg flex flex-col">
              {/* Approval */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <TbUserCheck className="text-xl text-white/80" />
                  <p className="text-white/80">Require Approval</p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requireApproval}
                    onChange={() => setRequireApproval(!requireApproval)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-800 transition-colors duration-300"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
                </label>
              </div>

              <hr className="border-gray-100/20" />

              {/* Capacity with Range Slider */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <IoIosPeople className="text-xl text-white/80" />
                    <p className="text-white/80">Capacity</p>
                  </div>
                  <input
                    type="text"
                    className="text-sm w-8 bg-transparent outline-none border-none font-semibold text-white"
                    onChange={(e) => setCapacity(e.target.value)}
                    value={capacity}
                  />
                </div>
                <input
                  type="range"
                  min="5"
                  max="900"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full accent-rose-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-white rounded-lg w-full mt-4 py-2 font-medium text-lg text-black shadow-lg hover:opacity-90 transition"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
