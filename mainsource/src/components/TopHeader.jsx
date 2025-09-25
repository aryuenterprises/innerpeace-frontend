import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { BsLinkedin } from "react-icons/bs";

const TopHeader = () => {
  return (
    <div className="bg-white  px-2 lg:px-5  py-0 hidden  sm:flex items-center justify-end gap-3  sm:py-2">
      <a
        href="https://www.facebook.com/people/Innerpece/100094846880465/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebook className="text-black  p-1 text-3xl cursor-pointer " />
      </a>
      <a
        href="https://www.linkedin.com/company/innerpece"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsLinkedin className="text-black  p-1 text-3xl cursor-pointer " />
      </a>
      <a
        href="https://www.instagram.com/innerpececom/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaSquareInstagram className="text-black   p-1 text-3xl cursor-pointer " />
      </a>

      <p className=" text-black/60 border border-r border-black/60 h-6"></p>

      <a
        href="mailto:contact@innerpece.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-black/90"
      >
        <p>contact@innerpece.com</p>
      </a>
    </div>
  );
};

export default TopHeader;
