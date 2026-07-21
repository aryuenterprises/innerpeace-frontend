// import React from "react";
// import { useEffect, useState } from "react";
// import { lazy, Suspense } from "react";
// let Footer = lazy(() => import("../components/Footer"));
// let Header = lazy(() => import("../components/Header"));
// let SendEnquiryHero = lazy(() => import("../components/SendEnquiryHero"));
// let SendEnquiryForm = lazy(() => import("../components/SendEnquiryForm"));
// import whatsapp from "../assets/whatsapp.svg";
// import TopHeader from "../components/TopHeader";
// import GoToTop from "../components/GoToTop";
// import { Link } from "react-router-dom";
// import { MdOutlineKeyboardArrowRight } from "react-icons/md";

// const SendEnquiry = () => {

//   useEffect(() => {
//     document.title = "Send Enquiry - Innerpece";
    
//   }, []);


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
//       "position": 3,
//       "name": "Customization Enquiry",
//       "item": "https://www.innerpece.com/sendenquiry"
//     }
//   ]
// }
// </script>


//   return (
//     <div>
      
//       <GoToTop/>


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
//             Customization Enquiry
//           </p>
//         </div>

//         <SendEnquiryHero />
//         <SendEnquiryForm />
//         <Footer />
//       </Suspense>
//     </div>
//   );
// };

// export default SendEnquiry;












import React, { useEffect, useState, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import whatsapp from "../assets/whatsapp.svg";
import TopHeader from "../components/TopHeader";
import GoToTop from "../components/GoToTop";

let Footer = lazy(() => import("../components/Footer"));
let Header = lazy(() => import("../components/Header"));
let SendEnquiryHero = lazy(() => import("../components/SendEnquiryHero"));
let SendEnquiryForm = lazy(() => import("../components/SendEnquiryForm"));

const SendEnquiry = () => {
  useEffect(() => {
    document.title = "Send Enquiry - Innerpece";
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
        "name": "Customization Enquiry",
        "item": "https://www.innerpece.com/sendenquiry"
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
            Customization Enquiry
          </p>
        </div>

        <SendEnquiryHero />
        <SendEnquiryForm />
        <Footer />
      </Suspense>
    </div>
  );
};

export default SendEnquiry;