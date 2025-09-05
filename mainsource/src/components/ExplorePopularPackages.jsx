import React from "react";
import pp1 from "../assets/pp1.jpg";
import pp2 from "../assets/pp2.jpg";
import pp3 from "../assets/pp3.jpg";
import pp4 from "../assets/pp4.jpg";
import pp5 from "../assets/pp5.jpg";
import pp6 from "../assets/pp6.jpg";
import pp7 from "../assets/pp7.jpg";
import pp8 from "../assets/pp8.jpg";
import { IoLocationSharp } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";
import { AiOutlineFieldTime } from "react-icons/ai";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function ExplorePopularPackages() {
  const responsive = {
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  let navigate = useNavigate();

  function onClickCard() {
    navigate("/tourdetails");

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  function onClickBtn() {
    navigate("/explorepopularpackages");

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  let popularPackagesDeatils = [
    {
      image: [pp1],
      location: "United States USA",
      packageName: "Days and 6 nights from Moscow",
      stars: [1, 1, 1, 1, 1],
      reviews: "1 Reviews",
      days: "5 days",
      person: "12 Person",
      rate: "$169.00",
      oldRate: "$199.00",
    },
    {
      image: [pp2],
      location: "United States USA",
      packageName: "Days and 6 nights from Moscow",
      stars: [1, 1, 1, 1, 1],
      reviews: "1 Reviews",
      days: "5 days",
      person: "12 Person",
      rate: "$169.00",
      oldRate: "$199.00",
    },
    {
      image: [pp3],
      location: "United States USA",
      packageName: "Days and 6 nights from Moscow",
      stars: [1, 1, 1, 1, 1],
      reviews: "1 Reviews",
      days: "5 days",
      person: "12 Person",
      rate: "$169.00",
      oldRate: "$199.00",
    },
    {
      image: [pp4],
      location: "United States USA",
      packageName: "Days and 6 nights from Moscow",
      stars: [1, 1, 1, 1, 1],
      reviews: "1 Reviews",
      days: "5 days",
      person: "12 Person",
      rate: "$169.00",
      oldRate: "$199.00",
    },
    {
      image: [pp5],
      location: "United States USA",
      packageName: "Days and 6 nights from Moscow",
      stars: [1, 1, 1, 1, 1],
      reviews: "1 Reviews",
      days: "5 days",
      person: "12 Person",
      rate: "$169.00",
      oldRate: "$199.00",
    },
    {
      image: [pp6],
      location: "United States USA",
      packageName: "Days and 6 nights from Moscow",
      stars: [1, 1, 1, 1, 1],
      reviews: "1 Reviews",
      days: "5 days",
      person: "12 Person",
      rate: "$169.00",
      oldRate: "$199.00",
    },
    {
      image: [pp7],
      location: "United States USA",
      packageName: "Days and 6 nights from Moscow",
      stars: [1, 1, 1, 1, 1],
      reviews: "1 Reviews",
      days: "5 days",
      person: "12 Person",
      rate: "$169.00",
      oldRate: "$199.00",
    },
    {
      image: [pp8],
      location: "United States USA",
      packageName: "Days and 6 nights from Moscow",
      stars: [1, 1, 1, 1, 1],
      reviews: "1 Reviews",
      days: "5 days",
      person: "12 Person",
      rate: "$169.00",
      oldRate: "$199.00",
    },
  ];
  return (
    <div className="ms-5 me-5 md:ms-16 md:me-16 mt-16">
      <div className="flex flex-wrap items-center justify-between">
        <p className="text-xl md:text-4xl font-semibold">
          Explore <span className="text-sky-600">Popular Packages</span>
        </p>
        <p
          className="underline text-sky-800 text-end cursor-pointer font-semibold"
          onClick={onClickBtn}
        >
          View all
        </p>
      </div>

      <div className="flex max-sm:hidden  items-center justify-start  flex-wrap mt-14 gap-x-8 gap-y-14">
        {popularPackagesDeatils.map((item, index) => (
          <div
            onClick={onClickCard}
            key={index}
            className="cursor-pointer transform transition duration-300 ease-in-out hover:-translate-y-1 shadow-lg shadow-gray-200 rounded-lg hover:shadow-2xl"
          >
            <img
              src={item.image}
              alt=""
              className=" w-80 h-32 object-center rounded-t-lg "
            />

            <div className="p-3 ">
              <p>
                <span className="inline-block me-2">
                  <IoLocationSharp className="text-sky-800" />
                </span>
                {item.location}
              </p>
              <p className="font-semibold">Days and 6 nights From Moscow</p>

              <div className="flex mt-2 items-center">
                {item.stars.map((item, index) => (
                  <span key={index} className="inline-block text-yellow-500">
                    <IoStarSharp />
                  </span>
                ))}

                <div>
                  <p className="text-gray-600 text-xs ms-2">{`(${item.reviews})`}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <span className="me-3">
                    <AiOutlineFieldTime className="text-sky-800 text-2xl" />
                  </span>
                  <p className="text-gray-500">{item.days}</p>
                </div>

                <div className="flex items-center">
                  <span className="me-3">
                    <MdOutlinePersonAddAlt className="text-sky-800 text-xl" />
                  </span>
                  <p className="text-gray-500">{item.person}</p>
                </div>
              </div>

              <hr className="mt-4 mb-4" />

              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <p className="text-gray-500">
                    From{" "}
                    <span className="text-sky-800 font-semibold">
                      {item.rate}
                    </span>
                  </p>
                  <del className="text-gray-500">{item.oldRate}</del>
                </div>

                <div>
                  <PiBookmarkSimpleBold className="text-sky-800 text-2xl" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Carousel
        swipeable={true}
        draggable={true}
        pauseOnHover={false}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        arrows={true}
        keyBoardControl={true}
        transitionDuration={1000}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px block sm:hidden shadow-lg shadow-black/10 mt-12"
      >
        {popularPackagesDeatils.map((item, index) => (
          <div
            onClick={onClickCard}
            key={index}
            className="cursor-pointer flex flex-col w-screen  bg-white "
          >
            <img
              src={item.image}
              alt=""
              className=" w-full object-center rounded-t-lg "
            />

            <div className="p-3 ">
              <p>
                <span className="inline-block me-2">
                  <IoLocationSharp className="text-sky-800" />
                </span>
                {item.location}
              </p>
              <p className="font-semibold">Days and 6 nights From Moscow</p>

              <div className="flex mt-2 items-center">
                {item.stars.map((item, index) => (
                  <span key={index} className="inline-block text-yellow-500">
                    <IoStarSharp />
                  </span>
                ))}

                <div>
                  <p className="text-gray-600 text-xs ms-2">{`(${item.reviews})`}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <span className="me-3">
                    <AiOutlineFieldTime className="text-sky-800 text-2xl" />
                  </span>
                  <p className="text-gray-500">{item.days}</p>
                </div>

                <div className="flex items-center">
                  <span className="me-3">
                    <MdOutlinePersonAddAlt className="text-sky-800 text-xl" />
                  </span>
                  <p className="text-gray-500">{item.person}</p>
                </div>
              </div>

              <hr className="mt-4 mb-4" />

              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <p className="text-gray-500">
                    From{" "}
                    <span className="text-sky-800 font-semibold">
                      {item.rate}
                    </span>
                  </p>
                  <del className="text-gray-500">{item.oldRate}</del>
                </div>

                <div>
                  <PiBookmarkSimpleBold className="text-sky-800 text-2xl" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ExplorePopularPackages;
