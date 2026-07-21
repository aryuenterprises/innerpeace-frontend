// import React, { lazy, Suspense, useEffect } from "react";
// import TopHeader from "../components/TopHeader";
// import GoToTop from "../components/GoToTop";

// const Header = lazy(() => import("../components/Header"));
// const DestinationsHero = lazy(() => import("../components/DestinationsHero"));
// const DestinationsSearch = lazy(() =>
//   import("../components/DestinationsSearch")
// );
// const Footer = lazy(() => import("../components/Footer"));

// function Destinations() {
//   useEffect(() => {
//     document.title = "Destinations - Innerpece";
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
//       "position": 2,
//       "name": "Destinations",
//       "item": "https://www.innerpece.com/destinations"
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
//         {/* <TopHeader/> */}

//         <Header />
//         <DestinationsHero />
//         <DestinationsSearch />
//         <Footer />
//       </Suspense>
//     </div>
//   );
// }

// export default Destinations;





import React, { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import TopHeader from "../components/TopHeader";
import GoToTop from "../components/GoToTop";

const Header = lazy(() => import("../components/Header"));
const DestinationsHero = lazy(() => import("../components/DestinationsHero"));
const DestinationsSearch = lazy(() =>
  import("../components/DestinationsSearch")
);
const Footer = lazy(() => import("../components/Footer"));

function Destinations() {
  useEffect(() => {
    document.title = "Destinations - Innerpece";
  }, []);

  // Breadcrumb Schema for Destinations
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
        "name": "Destinations",
        "item": "https://www.innerpece.com/destinations"
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
        {/* <TopHeader/> */}

        <Header />
        <DestinationsHero />
        <DestinationsSearch />
        <Footer />
      </Suspense>
    </div>
  );
}

export default Destinations;