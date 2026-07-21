// import React from "react";
// import { useEffect, useState } from "react";
// import { Suspense } from "react";
// import { lazy } from "react";
// let Header = lazy(() => import("../components/Header"));
// let AboutUsHero = lazy(() => import("../components/AboutUsHero"));
// let AboutUsMission = lazy(() => import("../components/AboutUsOurMission"));
// let AboutUsOurStory = lazy(() => import("../components/AboutUsOurStory"));
// let AboutUsOurValue = lazy(() => import("../components/AboutUsOurValue"));
// let AboutUsGroupImg = lazy(() => import("../components/AboutUsGroupImg"));
// let Footer = lazy(() => import("../components/Footer"));
// import whatsapp from "../assets/whatsapp.svg";
// import TopHeader from "../components/TopHeader";
// import GoToTop from "../components/GoToTop";
// import { Link } from "react-router-dom";
// import { MdOutlineKeyboardArrowRight } from "react-icons/md";

// function AboutUs() {

//   useEffect(() => {
//     document.title = "About Us - Innerpece";
//   }, []); // Empty dependency array ensures it runs once on mount

 
//   <script type="application/ld+json">
// {
//   "@context": "https://schema.org",
//   "@type": "BreadcrumbList",
//   "itemListElement": [
//     {
//       "@type": "ListItem",
//       "position": 1,
//       "name": "Home",
//       "item": "https://www.innerpece.com/"
//     },
//     {
//       "@type": "ListItem",
//       "position": 4,
//       "name": "About Us",
//       "item": "https://www.innerpece.com/aboutus"
//     }
//   ]
// }
// </script>

//   return (
//     <div>
     

//       <GoToTop />

//       <Suspense
//         fallback={
//           <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
//             <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
//           </div>
//         }
//       >
//         <Header />
       
//         <div className="flex gap-1 sm:gap-2  px-2 py-0.5  items-center">
//           <Link to="/">
//             <p className="text-xs sm:text-sm">Home</p>
//           </Link>
         
//           <MdOutlineKeyboardArrowRight className="text-xl" />
//           <p className="text-blue-500 font-medium sm:font-semibold">
//             About Us
//           </p>
//         </div>

//         <AboutUsHero />
//         <AboutUsMission />
//         <AboutUsOurStory />
//         <AboutUsOurValue />
//         <AboutUsGroupImg />
//         <Footer />
//       </Suspense>
//     </div>
//   );
// }

// export default AboutUs;



import React, { useEffect, useState, Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import whatsapp from "../assets/whatsapp.svg";
import TopHeader from "../components/TopHeader";
import GoToTop from "../components/GoToTop";

let Header = lazy(() => import("../components/Header"));
let AboutUsHero = lazy(() => import("../components/AboutUsHero"));
let AboutUsMission = lazy(() => import("../components/AboutUsOurMission"));
let AboutUsOurStory = lazy(() => import("../components/AboutUsOurStory"));
let AboutUsOurValue = lazy(() => import("../components/AboutUsOurValue"));
let AboutUsGroupImg = lazy(() => import("../components/AboutUsGroupImg"));
let Footer = lazy(() => import("../components/Footer"));

function AboutUs() {
  useEffect(() => {
    document.title = "About Us - Innerpece";
  }, []);

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.innerpece.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": "https://www.innerpece.com/aboutus"
      }
    ]
  };

  return (
    <div>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <GoToTop />

      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }
      >
        <Header />

        <div className="flex gap-1 sm:gap-2 px-2 py-0.5 items-center">
          <Link to="/">
            <p className="text-xs sm:text-sm">Home</p>
          </Link>

          <MdOutlineKeyboardArrowRight className="text-xl" />
          <p className="text-blue-500 font-medium sm:font-semibold">
            About Us
          </p>
        </div>

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