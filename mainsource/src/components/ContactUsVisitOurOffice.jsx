import React from "react";

function VisitOurOffice() {
  return (
    <div className="bg-gray-100/70">
      <div className="flex items-center  flex-col md:flex-row px-5 md:px-20 lg:px-30 xl:px-40 gap-5  md:gap-8 lg:gap-12 xl:gap-16 py-8 md:py-16 mt-8 md:mt-20">
        <div className="flex flex-col flex-grow basis-[40%] gap-5 font-dmSans">
          <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Visit Our Office
          </p>
          <p className="text-gray-400">
            Visit our office at Innerpece! We're here to discuss your travel
            plans and get expert help from our friendly team.
          </p>

          <a href="https://maps.app.goo.gl/fEHm4NXUYToXK2CMA" target="_blank">
            <button className="bg-sky-800 hover:bg-sky-700 px-5 py-2 md:px-7 md:py-3  lg:px-8 lg:py-4 xl:px-10 xl:py-5 w-fit rounded-full text-white">
              Get Direction
            </button>
          </a>
        </div>

        <div className=" basis-[40%]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3917.1874887123454!2d79.3470095!3d10.9492057!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baacd9db55ca1f5%3A0xa1dba868ae91b9c8!2sInnerpece!5e0!3m2!1sen!2sin!4v1731920601542!5m2!1sen!2sin"
            // allowfullscreen=""
            loading="lazy"
            
            // referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default VisitOurOffice;
