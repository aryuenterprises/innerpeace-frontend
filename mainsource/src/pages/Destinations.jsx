import React, { lazy, Suspense, useEffect } from "react";

const Header = lazy(() => import("../components/Header"));
const DestinationsHero = lazy(() => import("../components/DestinationsHero"));
const DestinationsSearch = lazy(() => import("../components/DestinationsSearch"));
const Footer = lazy(() => import("../components/Footer"));

function Destinations() {
  useEffect(() => {
    document.title = "Destinations - Innerpece";
  }, []);

  return (
    <div>
      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }
      >
        <Header />
        <DestinationsHero />
        <DestinationsSearch />
        <Footer />
      </Suspense>
    </div>
  );
}

export default Destinations;
