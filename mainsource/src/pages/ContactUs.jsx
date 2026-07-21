// import React from "react";
// import { lazy, Suspense } from "react";
// let Header = lazy(() => import("../components/Header"));
// let ContactUsHero = lazy(() => import("../components/ContactUsHero"));
// let ContactUsGetInTouch = lazy(() =>
//   import("../components/ContactUsGetInTouch")
// );
// let ContactUsVisitOurOffice = lazy(() =>
//   import("../components/ContactUsVisitOurOffice")
// );
// let ContactUsVisitOurFaq = lazy(() => import("../components/ContactUsFaq"));
// let Footer = lazy(() => import("../components/Footer"));

// import { useEffect, useState } from "react";
// import whatsapp from "../assets/whatsapp.svg";
// import TopHeader from "../components/TopHeader";
// import GoToTop from "../components/GoToTop";
// import { Link } from "react-router-dom";
// import { MdOutlineKeyboardArrowRight } from "react-icons/md";

// function ContactUs() {
//   // const [isLoading, setIsLoading] = useState(true); // Loading state

//   useEffect(() => {
//     document.title = "Contact Us - Innerpece";
    
//   }, []); // Empty dependency array ensures it runs once on mount

// <script type="application/ld+json">
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
//       "position": 5,
//       "name": "Contact Us",
//       "item": "https://www.innerpece.com/contactus"
//     }
//   ]
// }
// </script>

//   return (
//     <div>
//       {/* <div
//         onClick={() => window.open("https://wa.me/6384131642")}
//         className="fixed whatsapp z-50 bottom-2 right-2 cursor-pointer flex items-center group"
//       >
//         <div className="text-black opacity-0 scale-90 translate-x-5 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 bg-white px-2 py-1 rounded-md shadow-md ml-2 transition-all duration-300">
//           <p>Whatsapp Enquiry</p>
//         </div>
//         <img src={whatsapp} className="h-10 w-10  transition-all duration-500" />
//       </div> */}

//       <GoToTop />

//       <Suspense
//         fallback={
//           <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
//             <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
//           </div>
//         }
//       >
//         {/* <TopHeader/> */}
        

//         <Header />

//         <div className="flex gap-1 sm:gap-2  px-2 py-0.5  items-center">
//           <Link to="/">
//             <p className="text-xs sm:text-sm">Home</p>
//           </Link>
//           <MdOutlineKeyboardArrowRight className="text-xl" />
          
//           <p className="text-blue-500 font-medium sm:font-semibold">
//             Contact Us
//           </p>
//         </div>
//         <ContactUsHero />
//         <ContactUsGetInTouch />
//         <ContactUsVisitOurOffice />
//         {/* <ContactUsVisitOurFaq /> */}
//         <Footer />
//       </Suspense>
//     </div>
//   );
// }

// export default ContactUs;









import React, { lazy, Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import whatsapp from "../assets/whatsapp.svg";
import TopHeader from "../components/TopHeader";
import GoToTop from "../components/GoToTop";

let Header = lazy(() => import("../components/Header"));
let ContactUsHero = lazy(() => import("../components/ContactUsHero"));
let ContactUsGetInTouch = lazy(() =>
  import("../components/ContactUsGetInTouch")
);
let ContactUsVisitOurOffice = lazy(() =>
  import("../components/ContactUsVisitOurOffice")
);
let ContactUsVisitOurFaq = lazy(() => import("../components/ContactUsFaq"));
let Footer = lazy(() => import("../components/Footer"));

function ContactUs() {
  useEffect(() => {
    document.title = "Contact Us - Innerpece";
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
        "name": "Contact Us",
        "item": "https://www.innerpece.com/contactus"
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
            Contact Us
          </p>
        </div>
        
        <ContactUsHero />
        <ContactUsGetInTouch />
        <ContactUsVisitOurOffice />
        <Footer />
      </Suspense>
    </div>
  );
}

export default ContactUs;