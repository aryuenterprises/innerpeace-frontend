import React from "react";
import "./sidebar.css";

function Sidebar({ setSortBy }) {
  
  function onchangeSelect(e) {
    setSortBy(e.target.value);
  }

  return (
    <div className="mt-32 px-7 py-10 h-fit flex flex-col gap-6 rounded-md  max-md:hidden border-2 basis-[20%] ">
      <p className="text-xl">Search By Filter</p>

      <input type="date" name="" id="" className="border-2 p-2 rounded" />

      <button className="bg-sky-800 active:bg-gray-600 px-8 rounded text-end py-2 text-white place-items-end w-fit">
        Filter
      </button>

      <p className="text-xl">Sort By</p>

      <select
        name=""
        id=""
        className="border-2 p-2 outline-none"
        onChange={onchangeSelect}
      >
        <option value="" disabled selected>
          Select Sort Option
        </option>
        <option value="recent">Recent Event</option>
        <option value="price_low_to_high">Low Price</option>
        <option value="price_high_to_low">High Price</option>
      </select>
    </div>
  );
}

export default Sidebar;
