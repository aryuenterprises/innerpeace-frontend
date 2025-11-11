import React, { useEffect, useState } from "react";
import footer1 from "../assets/footer1.png";
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import aryulogo from "../assets/aryulogo.png";
import homefooterinsta from "../assets/homefooterinsta.svg";
import homefooterfb from "../assets/homefooterfb.svg";
import homefooterlinkedin from "../assets/homefooterlinkedin.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSquarePhone } from "react-icons/fa6";

function Footer({ className }) {
  const [footerContent, setFooterContent] = useState("");
  let navigator = useNavigate();

  useEffect(() => {
    axios
      // .get(`https://backoffice.innerpece.com/api/get-header-footer`)
      .get(`https://backoffice.innerpece.com/api/v1/footer-content`)
      .then((response) => {
        setFooterContent(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  function navigate(navigatePath) {
    navigator(navigatePath);

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  function onClickSitemap() {
    window.location.href = "/sitemap.xml"; // This will redirect to the sitemap
  }

  return (
    <div className="mt-8 md:mt-20 font-raleway">
      <img
        src={footer1}
        alt=""
        className="w-screen -mb-2  sm:-mb-3 md:-mb-4 lg:-mb-5"
      />

      <div className="bg-[url('././assets/footer2.png')]   bg-center bg-cover  ">
        <div className="footer py-5  md:py-10 px-5  lg:px-20 flex flex-col gap-10 ">
          <div className="gap-8  md:gap-12 flex-wrap flex-col md:flex-row flex  justify-start xl:justify-between">
            <div className="flex flex-col basis-[30%] flex-wrap text-white ">
              <div>
                <img
                  src={`https://backoffice.innerpece.com/${footerContent.footer_logo}`}
                  className="bg-cover"
                  alt=""
                />
              </div>

              <p className="mt-5 ">
                Innerpece is a travel curator that transforms your travel ideas
                into customized, unforgettable journeys.
              </p>

              {/* <a className="mt-3 md:mt-5" href={`mailto:${footerContent.contact_email}`}> */}
              <a
                className="mt-3 md:mt-5"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@innerpece.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center ">
                  <span className="inline-block me-5">
                    <IoIosMail className="text-lg md:text-2xl text-sky-300" />
                  </span>
                  <p className="font-medium"> {footerContent.contact_email}</p>
                </div>
              </a>

              <a
                className="mt-3 md:mt-5"
                href={`tel:${footerContent.contact_number}`}
              >
                <div className="flex items-center">
                  <span className="inline-block me-5">
                    {/* <FaPhoneAlt className="text-lg md:text-2xl  text-sky-300" /> */}
                    <FaSquarePhone className="text-lg md:text-2xl  text-sky-300" />
                  </span>
                  <p className="font-medium"> {footerContent.contact_number}</p>
                </div>
              </a>

              <a
                href="https://maps.app.goo.gl/fsk65r78kG724Gvs8"
                target="_blank"
              >
                <div className="flex items-center mt-3 md:mt-5">
                  <span className="inline-block me-5">
                    <FaMapLocationDot className="text-lg md:text-2xl  text-sky-300" />
                  </span>
                  <p className="font-medium">
                    {" "}
                    {footerContent.contact_address}
                  </p>
                </div>
              </a>
            </div>

            <div className="text-white basis-30 flex gap-2 flex-col  md:gap-4">
              <p className="font-semibold text-xl  pb-3 md:pb-5 ">
                Services Request
              </p>

              <p
                onClick={() => navigate("/aboutus")}
                className="font-medium  text-gray-400 cursor-pointer hover:text-white"
              >
                About Us
              </p>

              <p
                onClick={() => navigate("/contactus")}
                className="font-medium  text-gray-400 cursor-pointer hover:text-white"
              >
                Contact
              </p>
              <p
                onClick={() => navigate("/faq")}
                className="font-medium  text-gray-400 cursor-pointer hover:text-white"
              >
                FAQ
              </p>

              <p
                onClick={() => navigate("/termsofservice")}
                className="font-medium  text-gray-400 cursor-pointer hover:text-white"
              >
                Terms Of Service
              </p>

              <p
                onClick={() => navigate("/privacypolicy")}
                className="font-medium  text-gray-400 cursor-pointer hover:text-white"
              >
                Privacy Policy
              </p>

              {/* <p
              onClick={onClickSitemap}
              className="font-medium  text-gray-400 cursor-pointer hover:text-white"
              
            >
              Sitemap
            </p> */}
              <a
                href="https://blogs.innerpece.com/"
                target="_blank"
                className="font-medium  text-gray-400 cursor-pointer hover:text-white"
              >
                Blog
              </a>
            </div>

            <div className="flex  flex-col gap-2 flex-wrap ">
              <div className="flex items-center gap-3 pb-3 md:pb-5">
                <FaCircleArrowRight className="inline-block text-sky-200 text-3xl" />
                <p className="text-xl  text-white font-semibold">
                  Get In Touch
                </p>
              </div>

              <div className="flex flex-wrap gap-x-5 ">
                <a href={footerContent.facebook} target="_blank">
                  <img src={homefooterfb} alt="" className="cursor-pointer" />
                </a>

                <a href={footerContent.linkedin} target="_blank">
                  <img
                    src={homefooterlinkedin}
                    alt=""
                    className="cursor-pointer"
                  />
                </a>
                <a href={footerContent.instagram} target="_blank">
                  <img
                    src={homefooterinsta}
                    alt=""
                    className="cursor-pointer"
                  />
                </a>
              </div>

              <div className="flex flex-col mt-5 md:mt-8 gap-2">
                <p className="text-white md:text-center">Incubated at</p>

                <img
                  src={`https://backoffice.innerpece.com/uploads/settings/official_logo/1724229229_1.PNG`}
                  alt=""
                  className="bg-cover w-44 h-16 "
                />
              </div>
            </div>

            <div className="flex flex-col md:items-center  flex-wrap gap-y-3">
              <div className="flex items-center pb-3 md:pb-5">
                <p className="text-white text-xl  font-semibold">
                  Crafting Excellence With{" "}
                </p>
                <FaHeart className="text-white ms-1 " />
              </div>

              <a href="https://aryutechnologies.com/" target="_blank">
                <img
                  src={aryulogo}
                  alt=""
                  className="w-20 h-16 md:w-28 md:h-20"
                />
              </a>

              <p className="text-white text-xs font-semibold">
                <span className="font-bold text-xl me-1">ARYU</span>Technologies
              </p>

              <div className="flex flex-wrap gap-x-3">
                <a
                  href="https://www.instagram.com/aryutechnologies/"
                  target="_blank"
                >
                  <RiInstagramFill className="text-white  rounded-full bg-blue-600 p-1 text-3xl cursor-pointer" />
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61560790628495"
                  target="_blank"
                >
                  <FaFacebook className="text-white rounded-full bg-blue-600 p-1 text-3xl cursor-pointer " />
                </a>

                <a
                  href="https://www.linkedin.com/company/103279912/admin/dashboard/"
                  target="_blank"
                >
                  <FaLinkedin className="text-white rounded-full bg-blue-600 p-1 text-3xl cursor-pointer " />
                </a>
              </div>
            </div>
          </div>

          {/* <div className="flex w-full justify-end">
            <p
              onClick={onClickSitemap}
              className="text-gray-400 cursor-pointer hover:text-white w-fit  -my-5 text-end"
            >
              Sitemap
            </p>
          </div> */}

          <div
            className={`flex flex-wrap gap-8 items-center justify-between ${className}`}
          >
            <p className="text-xs md:text-sm text-white ">
              {footerContent.copyright}
            </p>
            <a
              href="https://aryutechnologies.com/"
              target="_blank"
              className="text-xs md:text-sm text-white "
            >
              Powered by Aryu Technologies
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
