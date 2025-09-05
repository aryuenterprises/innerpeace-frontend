import { Suspense, useEffect, useState } from "react";
import { lazy } from "react";

let Header = lazy(() => import("../components/HomeHeader"));
let Hero = lazy(() => import("../components/HomeHero"));
let HomePrograms = lazy(() => import("../components/HomePrograms"));
let HomeDestinations = lazy(() => import("../components/HomeDestinations"));
let HomeStays = lazy(() => import("../components/HomeStays"));
let LetsGetStarted = lazy(() => import("../components/LetsGetStarted"));
let Footer = lazy(() => import("../components/Footer"));
import whatsapp from "../assets/whatsapp.svg";
import axios from "axios";
import Swal from "sweetalert2";
let Perfecttraveltype = lazy(() => import("../components/Perfecttraveltype"));
import TripCategories from "../components/TripCategories";
import Blogs from "../components/Blogs";
import StaysTamilnadu from "../components/StaysTamilnadu";


function Home() {
  // const [isLoading, setIsLoading] = useState(true); // Loading state
  const [assistanceFormClicked, setAssiatanceFormClicked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [comments, setComments] = useState("");
  const [loginError, setLoginError] = useState({});

  useEffect(() => {
    document.title = "Home - Innerpece";
  }, []);

  useEffect(() => {
    if (assistanceFormClicked) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up on component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [assistanceFormClicked]);

  const onClickSubmit = async () => {
    try {
      let response = await axios.post(
        "https://backoffice.innerpece.com/api/v1/assistance",
        {
          name,
          email,
          phone,
          comments,
        }
      );

      setName("");
      setEmail("");
      setphone("");
      setComments("");
      setLoginError("");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Submitted successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        setAssiatanceFormClicked(false);
      }, 1700);
    } catch (err) {
      console.log(err);
      let errors = err.response.data.errors
        ? err.response.data.errors
        : err.response.data;
      setLoginError({ ...errors });
      console.log(errors);
    }
  };

  return (
    <div>
      <div
        onClick={() => window.open("https://wa.me/8807343642")}
        className="fixed whatsapp z-50 bottom-2 right-2 cursor-pointer flex items-center group"
      >

        
        <div className="text-black opacity-0 scale-90 translate-x-5 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 bg-white px-2 py-1 rounded-md shadow-md ml-2 transition-all duration-300">
          <p>Whatsapp Enquiry</p>
        </div>
        <img
          src={whatsapp}
          className="h-12 w-12  transition-all duration-500"
        />
      </div>

      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          // <div className="fixed inset-0 w-screen h-screen flex items-center justify-center backdrop-blur-md bg-transparent">
          //   <svg
          //     height="108px"
          //     width="108px"
          //     viewBox="0 0 128 128"
          //     class="loader"
          //   >
          //     <defs>
          //       <clipPath id="loader-eyes">
          //         <circle
          //           transform="rotate(-40,64,64) translate(0,-56)"
          //           r="8"
          //           cy="64"
          //           cx="64"
          //           class="loader__eye1"
          //         ></circle>
          //         <circle
          //           transform="rotate(40,64,64) translate(0,-56)"
          //           r="8"
          //           cy="64"
          //           cx="64"
          //           class="loader__eye2"
          //         ></circle>
          //       </clipPath>
          //       <linearGradient y2="1" x2="0" y1="0" x1="0" id="loader-grad">
          //         <stop stop-color="#000" offset="0%"></stop>
          //         <stop stop-color="#fff" offset="100%"></stop>
          //       </linearGradient>
          //       <mask id="loader-mask">
          //         <rect
          //           fill="url(#loader-grad)"
          //           height="128"
          //           width="128"
          //           y="0"
          //           x="0"
          //         ></rect>
          //       </mask>
          //     </defs>
          //     <g
          //       stroke-dasharray="175.93 351.86"
          //       stroke-width="12"
          //       stroke-linecap="round"
          //     >
          //       <g>
          //         <rect
          //           clip-path="url(#loader-eyes)"
          //           height="64"
          //           width="128"
          //           fill="hsl(193,90%,50%)"
          //         ></rect>
          //         <g stroke="hsl(193,90%,50%)" fill="none">
          //           <circle
          //             transform="rotate(180,64,64)"
          //             r="56"
          //             cy="64"
          //             cx="64"
          //             class="loader__mouth1"
          //           ></circle>
          //           <circle
          //             transform="rotate(0,64,64)"
          //             r="56"
          //             cy="64"
          //             cx="64"
          //             class="loader__mouth2"
          //           ></circle>
          //         </g>
          //       </g>
          //       <g mask="url(#loader-mask)">
          //         <rect
          //           clip-path="url(#loader-eyes)"
          //           height="64"
          //           width="128"
          //           fill="hsl(223,90%,50%)"
          //         ></rect>
          //         <g stroke="hsl(223,90%,50%)" fill="none">
          //           <circle
          //             transform="rotate(180,64,64)"
          //             r="56"
          //             cy="64"
          //             cx="64"
          //             class="loader__mouth1"
          //           ></circle>
          //           <circle
          //             transform="rotate(0,64,64)"
          //             r="56"
          //             cy="64"
          //             cx="64"
          //             class="loader__mouth2"
          //           ></circle>
          //         </g>
          //       </g>
          //     </g>
          //   </svg>
          // </div>
        }
      >
        <Header />
        <Hero />
        <HomePrograms />
        <Perfecttraveltype />
        <HomeDestinations />
        <LetsGetStarted />
        <HomeStays />
        <StaysTamilnadu />
        <Blogs />
        <Footer />
      </Suspense>
    </div>
  );
}
export default Home;
