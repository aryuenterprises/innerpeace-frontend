import React from "react";
import TourDetailsMainbar from "../components/TourDetailsMainbar";
import TourDetailsSidebar from "../components/TourDetailsSidebar";
import { useState, useEffect } from "react";

function TwoComponents({
  highlightsRef,
  LocationShareRef,
  informationRef,
  TourPlanningRef,
  reviewRef,
  dummyRef,
}) {
  const [windowSize, setWindowSize] = useState("");

  useEffect(() => {
    const handleResize = () => {
      // window.innerWidth > 1024 ? setReviewScrollRef(reviewRef) : "";
      setWindowSize(window.innerWidth);
    };

    handleResize();

    // Event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex bg-[#FEFEFE] gap-8 lg:gap-12  flex-col justify-between lg:flex-row bg-gray-50/10 mx-3 md:mx-10   xl:mx-20  items-start font-mulish">
      <TourDetailsMainbar
        highlightsRef={highlightsRef}
        informationRef={informationRef}
        TourPlanningRef={TourPlanningRef}
        reviewRef={windowSize >= 1024 ? reviewRef : dummyRef}
      />
      <TourDetailsSidebar
        LocationShareRef={LocationShareRef}
        reviewRef={windowSize < 1024 ? reviewRef : dummyRef}
      />
    </div>
  );
}

export default TwoComponents;
