import React, { useState } from "react";
import Sidebar from "./ProgramsDetailsSidebar";
import Mainbar from "./ProgramsDetailsMainbar";

function TwoComponents({ apiData, setApiData, themes_name }) {
  const [sortBy, setSortBy] = useState("");

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-3 lg:gap-5 mt-2 md:mt-7 ms-4 me-4 md:ms-7 md:me-7 lg:ms-10 lg:me-10 pb-10">
      <Sidebar setSortBy={setSortBy} />
      <Mainbar
        apiData={apiData}
        setSortBy={setSortBy}
        sortBy={sortBy}
        setApiData={setApiData}
        themes_name={themes_name}
      />
    </div>
  );
}

export default TwoComponents;
