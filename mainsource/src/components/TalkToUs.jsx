import React from "react";
import { useNavigate } from "react-router-dom";

function TalkToUs() {
  let navigate = useNavigate();

  function onclickBtn() {
    navigate('/contactus')

    window.scrollTo({
      top:'0',
      behavior:'instant'
    })
  }
  return (
    <div className="rounded-lg ms-5 me-5 mt-8 md:ms-16 md:me-16  md:mt-16 bg-gradient-to-r from-slate-900 to-sky-800 flex flex-wrap items-center justify-between px-2 py-9">
      <div className="h-full ps-3 md:ps-11 content-center">
        <p className="text-white font-semibold text-lg md:text-2xl">
          Do you want to experience an event with us?
        </p>
        <p className="text-white font-semibold text-base md:text-xl pt-3">
          Dont wait any longer{" "}
        </p>
      </div>

      <div className="md:pe-28 ps-3 md:ps-0">
        <button
          onClick={onclickBtn}
          className="bg-white hover:bg-gray-400 hover:text-white px-2 mt-2 md:mt-0 md:px-3 md:py-2 rounded-md text-lg font-semibold"
        >
          Talk to us
        </button>
      </div>
    </div>
  );
}

export default TalkToUs;
