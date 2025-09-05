import React from "react";
import { useNavigate } from "react-router-dom";
import privacy_terms_img from'../assets/privacy_terms_img.png'


function TermsOfServices_Hero() {
  let navigate = useNavigate();
  return (
    <div className="relative w-full h-[30vh] md:h-[50vh] font-mulish">
      <img
        className="absolute w-full h-full z-30 "
        // src="https://demo.innerpece.com/static/media/Terms_condition_img.576cf52b.svg"
        src={privacy_terms_img}
        alt=""
      />

      <div className="absolute w-full h-full z-40 flex flex-col gap-5 items-center justify-center  text-white ">
        <p className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Terms Of Services
        </p>
        <div className="flex gap-2">
          <p className="cursor-pointer hover:text-gray-400" onClick={()=>navigate("/")}>
            Home
          </p>
          <p>/</p>
          <p className="font-bold">Terms Of Services</p>
        </div>
      </div>
    </div>
  );
}

export default TermsOfServices_Hero;
