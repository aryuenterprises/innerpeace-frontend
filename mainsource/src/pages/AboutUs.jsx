import React from "react";
import { useEffect,useState } from "react";
import { Suspense } from "react";
import { lazy } from "react";
let Header=lazy(()=>import("../components/Header"))
let AboutUsHero=lazy(()=>import("../components/AboutUsHero"))
let AboutUsMission=lazy(()=>import("../components/AboutUsOurMission"))
let AboutUsOurStory=lazy(()=>import("../components/AboutUsOurStory"))
let AboutUsOurValue=lazy(()=>import("../components/AboutUsOurValue"))
let AboutUsGroupImg=lazy(()=>import("../components/AboutUsGroupImg"))
let Footer=lazy(()=>import("../components/Footer"))
import whatsapp from "../assets/whatsapp.svg";



function AboutUs() {
    // const [isLoading, setIsLoading] = useState(true); // Loading state
  
  useEffect(() => {
    document.title = "About Us - Innerpece";
    // const timer = setTimeout(() => {
    //   setIsLoading(false);
    // }, 200); // Adjust time as needed


    // return () => clearTimeout(timer); // Cleanup timeout
  }, []); // Empty dependency array ensures it runs once on mount



  // if (isLoading) {
  //   return (
  //     <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
  //       <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }
  return (
    <div>

<div
        onClick={() => window.open("https://wa.me/6384131642")}
        className="fixed whatsapp z-50 bottom-2 right-2 cursor-pointer flex items-center group"
      >
        <div className="text-black opacity-0 scale-90 translate-x-5 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 bg-white px-2 py-1 rounded-md shadow-md ml-2 transition-all duration-300">
          <p>Whatsapp Enquiry</p>
        </div>
        <img src={whatsapp} className="h-10 w-10  transition-all duration-500" />
      </div>


      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }
      >
        <Header />
        <AboutUsHero />
        <AboutUsMission />
        <AboutUsOurStory />
        <AboutUsOurValue />
        <AboutUsGroupImg />

        <Footer />
      </Suspense>
    </div>
  );
}


export default AboutUs;
