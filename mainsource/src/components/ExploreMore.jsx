import React from "react";
import exploremore from "../assets/exploremore.jpg";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function ExploreMore() {
  let navigate = useNavigate();

  // navigate to contactus page
  function onclickBtn() {
    navigate("/contactus");

    window.scrollTo({
      top: "0",
      behavior: "instant",
    });
  }

  return (
    <div className="w-100vw bg-[url('./assets/exploremore.jpg')] bg-cover bg-center bg-no-repeat md:rounded-xl  mt-10 md:ms-16 md:me-16  md:mt-16 h-56 ">
      {/* <img
        src={exploremore}
        alt=""
        className="h-56 w-full  object-cover bg-center bg-no-repeat rounded-xl absolute inset-0"
      /> */}
      <div className="flex flex-col h-full justify-center ms-4 md:ms-8 w-fit items-center">
        <p className="text-white md:text-white/80 w-fit text-center text-2xl md:text-3xl font-semibold">GROUP</p>
        <p className="text-white md:text-white/80 w-fit text-2xl md:text-5xl font-semibold -mt-2">BOOKING</p>

        <button
          onClick={onclickBtn}
          className="  cursor-pointer font-sans mt-3 w-fit top-28 hover:bg-green-900 hover:text-yellow-300 bg-[#DBF056] left-10 text-green-900 p-2 font-bold rounded-lg "
        >
          EXPLORE MORE <MdArrowOutward className="inline-block ms-1 text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default ExploreMore;
