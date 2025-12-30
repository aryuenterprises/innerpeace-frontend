import React, { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import whatsapp from "../assets/whatsapp.svg";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show buttons after scrolling down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-16 md:bottom-5 right-3 z-[1200] flex flex-col items-center gap-2 md:gap-3">
          {/* WhatsApp Button */}
          <div
            onClick={() => window.open("https://wa.me/6384131642")}
            className="relative group cursor-pointer"
          >
            <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-white text-black text-sm px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 whitespace-nowrap">
              Whatsapp Enquiry
              <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-white"></span>
            </div>
            <img
              src={whatsapp}
              alt="WhatsApp"
              className="h-10 w-10 object-cover drop-shadow-md transition-transform duration-300 hover:scale-110"
            />
          </div>

          {/* Go to Top Button */}
          <div onClick={scrollToTop} className="relative group cursor-pointer">
            <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-white text-black text-sm px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 whitespace-nowrap">
              Go to Top
              <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-white"></span>
            </div>
            <div className="h-8 w-8 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition-transform duration-300 hover:scale-110">
              <FaChevronUp className="text-xs md:text-base" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GoToTop;
