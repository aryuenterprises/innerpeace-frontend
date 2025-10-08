// import TopHeader from "../components/TopHeader";
// import Header from "../components/Header";
// import { motion } from "framer-motion";
// import { FaCalendar } from "react-icons/fa";
// import { MdLocationOn } from "react-icons/md";
// import styled from "styled-components";

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

// const EventRegisterPage = () => {
//   return (
//     <>
//       <TopHeader />
//       <Header />
//       <div className="flex text-black/80 flex-col items-center min-h-screen relative overflow-hidden font-PlusJakartaSansMedium">
//         {/* Animated Gradient Background */}
//         <motion.div
//           className="absolute inset-0 h-full w-full"
//           style={{
//             background: `radial-gradient(circle at 20% 30%, skyblue, transparent 50%),
//                     radial-gradient(circle at 70% 20%, #0073aa, transparent 20%),
//                     radial-gradient(circle at 40% 70%, #005fc4, transparent 50%),
//                     radial-gradient(circle at 80% 80%, pink, transparent 50%)`,
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
//             duration: 10,
//             ease: "linear",
//             repeat: Infinity,
//           }}
//         >
//           {/* <div className="absolute inset-0 backdrop-blur-[2px] bg-black/20"></div> */}
//         </motion.div>

//         {/* Content Container */}
//         <div className="max-w-6xl w-full mt-10 border bg-white/30 shadow-2xl shadow-black/40 p-8  backdrop-blur-xl rounded-xl relative z-10">

//           <div className="flex gap-10">
//             <div className="flex flex-col gap-5">
//               <div className="w-96 h-72 rounded-xl bg-gray-400"></div>

//               <div className="flex flex-col gap-2">
//                 <p>Hosted By</p>
//                 <hr />
//                 <p className="text-lg font-medium">Abdul Rahman</p>
//               </div>
//             </div>

//             <div className="flex flex-col gap-5">
//               <p className="text-4xl">
//                 Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//               </p>

//               <div className="flex items-start gap-3">
//                 <FaCalendar className="text-xl" />
//                 <div>
//                   <p>Friday, October 3 </p>
//                   <p>1:30 PM - Oct 9, 3:30 PM</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <MdLocationOn className="text-xl" />
//                 <p>MMDA Colony, Chennai</p>
//               </div>

//               <div className="bg-white/30  rounded-xl">
//                 <p className="text-black bg-white/50 p-3 rounded-t-xl">
//                   Registration
//                 </p>

//                 <div className="p-3 ">
//                   <p>Welcome! To join the event, please register below.</p>

//                   {/* <button className="bg-white w-full p-2 rounded-xl mt-3 text-black ">
//                     Click here to register
//                   </button> */}
//                   <StyledWrapper className="mt-5">
//                       <button className="btn-donate">
//                       Click here to register
//                       </button>
//                     </StyledWrapper>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EventRegisterPage;

import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { FaCalendar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import styled from "styled-components";

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
`;

const EventRegisterPage = () => {
  return (
    <>
      <TopHeader />
      <Header />
      <div className="flex text-black/80 flex-col items-center min-h-screen relative overflow-hidden font-PlusJakartaSansMedium">
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0 h-full w-full"
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
        />

        {/* Content Container with Film Grain */}
        <div className="max-w-6xl w-full mt-10 border font-PlusJakartaSansMedium bg-white/30 shadow-2xl shadow-black/40 p-8 backdrop-blur-xl rounded-xl relative z-10 ">
          <div className="flex gap-10">
            <div className="flex flex-col gap-5">
              <div className="w-96 h-72 rounded-xl bg-gray-400"></div>

              <div className="flex flex-col gap-2">
                <p>Hosted By</p>
                <hr />
                <p className="text-lg font-medium">Abdul Rahman</p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <p className="text-4xl">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>

              <div className="flex items-start gap-3">
                <FaCalendar className="text-xl" />
                <div>
                  <p>Friday, October 3 </p>
                  <p>1:30 PM - Oct 9, 3:30 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MdLocationOn className="text-xl" />
                <p>MMDA Colony, Chennai</p>
              </div>

              <div className="bg-white/30  rounded-xl">
                <p className="text-black bg-white/50 p-3 rounded-t-xl">
                  Registration
                </p>

                <div className="p-3 ">
                  <p>Welcome! To join the event, please register below.</p>
                  <StyledWrapper className="mt-5">
                    <button className="btn-donate">
                      Click here to register
                    </button>
                  </StyledWrapper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventRegisterPage;
