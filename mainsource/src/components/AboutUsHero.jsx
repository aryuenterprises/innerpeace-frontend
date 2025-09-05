import React from "react";
import image1 from "../assets/Image1.png";
import image2 from "../assets/Image2.png";
import image3 from "../assets/Image3.png";
import aboutusimg1 from "../assets/aboutusimg1.png";
import aboutusimg5 from "../assets/aboutusimg5.png";
import aboutusimg6 from "../assets/aboutusimg6.png";

function Hero() {
  return (
    <div className="ms-3 me-3 md:ms-6 md:me-6 lg:ms-12 lg:me-12 xl:ms-28 xl:me-28">
      <p className="text-center text-2xl lg:text-3xl xl:text-5xl font-dmSans font-semibold mt-8 md:mt-20 tracking-wide">
        ABOUT US
      </p>

      {/* <div className="flex mt-5 md:mt-14 flex-col lg:flex-row flex-grow items-start justify-start md:gap-10 lg:gap-28 ">
        <div className="flex-grow grid grid-cols-2 h-60 items-start justify-center mx-auto gap-3 basis-[40%]">
          <img src={aboutusimg4} alt="" className="row-span-2  bg-cover w-full h-full  rounded-xl" />

          <img src={aboutusimg1} alt="" className=" bg-cover rounded-xl  w-full" />
          <img src={image3} alt="" className=" bg-cover w-full  rounded-xl" />
        </div>

        <div className="basis-[60%] font-raleway">
          <p className="mt-3 text-gray-600 ">
          At Innerpece, we create transformative programs that lead you to the avenue of peace. Our carefully curated offerings help you reconnect with your inner peace, focusing on mental well-being and personal growth. For entrepreneurs, creators, and freelancers, our nomadic lifestyle in serene environments like the Himalayas provides the perfect escape from the hustle, allowing you to work in peace, recharge, and reignite your creativity.


          </p>

          <p className="mt-3 text-gray-600 ">
          We also offer offbeat car and bike trips to explore new horizons, blending productivity with tranquility. Our thoughtfully planned team outings provide unique bonding experiences for colleagues, encouraging collaboration, relaxation, and fresh perspectives in inspiring settings. Additionally, we provide travel programs for families, designed to create unforgettable moments and strengthen family bonds. Explore India’s cultural richness through our private itineraries, making lasting memories.

          </p>

          <p className="mt-3 text-gray-600 ">
          Innerpece is incubated at IIT Mandi Catalyst, a premier startup incubator supported by the Government of India. With their support, we design travel programs that meaningfully blend wellness, creativity, and personal growth, helping you reconnect with what matters most.

          </p>

          <p className="mt-3 text-gray-600 ">
          We believe in the transformative power of travel. Our programs are crafted to help you find happiness, fulfillment, and deeper connections. Join us, and let us guide you on a journey that refreshes your mind and enriches your life.

          </p>
        </div>
      </div> */}

      <div className="flex flex-col lg:flex-row items-start justify-start mt-5 md:mt-14 gap-10 lg:gap-20">
        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-3 w-full lg:w-[40%] h-[300px] lg:h-[400px]">
          <div className="row-span-2 group w-full h-full overflow-hidden rounded-xl">
            <img
              src={image2}
              alt=""
              className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-all duration-300 ease-in-out"
            />
          </div>
          <div className="w-full h-full group overflow-hidden rounded-xl">
            <img
              src={aboutusimg6}
              alt=""
              className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-all duration-300 ease-in-out"
            />
          </div>
          <div className="w-full h-full group overflow-hidden rounded-xl">
            <img
              src={aboutusimg5}
              alt=""
              className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-all duration-300 ease-in-out"
            />
          </div>
        </div>

        <div className="w-full lg:w-[60%] font-raleway">
          <p className="mt-3 text-gray-600 ">
            At Innerpece, we create transformative programs that lead you to the
            avenue of peace. Our carefully curated offerings help you reconnect
            with your inner peace, focusing on mental well-being and personal
            growth. For entrepreneurs, creators, and freelancers, our nomadic
            lifestyle in serene environments like the Himalayas provides the
            perfect escape from the hustle, allowing you to work in peace,
            recharge, and reignite your creativity.
          </p>

          <p className="mt-3 text-gray-600 ">
            We also offer offbeat car and bike trips to explore new horizons,
            blending productivity with tranquility. Our thoughtfully planned
            team outings provide unique bonding experiences for colleagues,
            encouraging collaboration, relaxation, and fresh perspectives in
            inspiring settings. Additionally, we provide travel programs for
            families, designed to create unforgettable moments and strengthen
            family bonds. Explore India’s cultural richness through our private
            itineraries, making lasting memories.
          </p>

          <p className="mt-3 text-gray-600 ">
            Innerpece is incubated at IIT Mandi Catalyst, a premier startup
            incubator supported by the Government of India. With their support,
            we design travel programs that meaningfully blend wellness,
            creativity, and personal growth, helping you reconnect with what
            matters most.
          </p>

          <p className="mt-3 text-gray-600 ">
            We believe in the transformative power of travel. Our programs are
            crafted to help you find happiness, fulfillment, and deeper
            connections. Join us, and let us guide you on a journey that
            refreshes your mind and enriches your life.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
