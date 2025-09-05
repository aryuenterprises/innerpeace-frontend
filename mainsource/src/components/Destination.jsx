import React from "react";
import tamilnadu from "../assets/tamilnadu.jpg";
import kerala from "../assets/kerala.jpg";
import hp from "../assets/himachal.jpg";
import uk from "../assets/uttarakhand.jpg";
import ladakh from "../assets/ladakh.jpg";
import diving1 from "../assets/diving1.jpg";
import diving2 from "../assets/diving2.jpg";
import diving3 from "../assets/diving3.jpg";
import { FaStar } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Destination() {
  let popularEventsDetails = [
    {
      image: [tamilnadu],
      destinationPlace: "Tamilnadu",
      destinationLocation: "Gianyar, Bali",
      ratings: "4.2",
      reviews: "230 Reviews",
    },
    {
      image: [kerala],
      destinationPlace: "Kerala",
      destinationLocation: "Gianyar, Bali",
      ratings: "4.2",
      reviews: "230 Reviews",
    },
    {
      image: [hp],
      destinationPlace: "Himachal Pradesh",
      destinationLocation: "Gianyar, Bali",
      ratings: "4.2",
      reviews: "230 Reviews",
    },
    {
      image: [uk],
      destinationPlace: "Uttarakhand",
      destinationLocation: "Gianyar, Bali",
      ratings: "4.2",
      reviews: "230 Reviews",
    },
    {
      image: [ladakh],
      destinationPlace: "Ladakh",
      destinationLocation: "Gianyar, Bali",
      ratings: "4.2",
      reviews: "230 Reviews",
    },
    {
      image: [diving1],
      destinationPlace: "Diving in Amed ",
      destinationLocation: "Gianyar, Bali",
      ratings: "4.2",
      reviews: "230 Reviews",
    },
    {
      image: [diving2],
      destinationPlace: "Diving in Amed Area",
      destinationLocation: "Gianyar, Bali",
      ratings: "4.2",
      reviews: "230 Reviews",
    },
    {
      image: [diving3],
      destinationPlace: "Diving in Amed Area",
      destinationLocation: "Gianyar, Bali",
      ratings: "4.2",
      reviews: "230 Reviews",
    },
  ];

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

  return (
    <div className="ms-5 me-5 md:ms-16 md:me-16 mt-16">
      <div className="flex items-center justify-between">
        <p className="text-xl  md:text-3xl font-semibold">
          Destination
        </p>
        <p className="underline text-sky-800 text-end cursor-pointer font-semibold">
          View all
        </p>
      </div>

      <div className="flex max-sm:hidden">
        <div className=" flex flex-wrap items-center justify-start mt-14 gap-x-8 gap-y-14">
          {popularEventsDetails.map((items, index) => (
            <div
              key={index}
              className="cursor-pointer transform transition duration-300 ease-in-out hover:-translate-y-1 border-gray-200 border-2  rounded-lg  hover:shadow-2xl shadow-black"
            >
              <img
                src={items.image}
                className="w-72 h-56  rounded-t-lg "
                alt=""
              />
              <div className="p-3">
                <p className="font-semibold text-xl">
                  {items.destinationPlace}
                </p>
                <p className="text-gray-400">{items.destinationLocation}</p>
                <p className="text-gray-500 flex items-center">
                  <FaStar className="text-yellow-500 me-2" />
                  <span className="me-4">{items.ratings}</span>
                  <span className="text-gray-400 text-sm">{`(${items.reviews})`}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
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
        {popularEventsDetails.map((items, index) => (
          <div
            key={index}
            className="cursor-pointer flex flex-col w-screen  bg-white "
          >
            <img
              src={items.image}
              className="w-full h-56 object-cover bg-center"
              alt=""
            />
            <div className="p-3">
              <p className="font-semibold text-xl">{items.destinationPlace}</p>
              <p className="text-gray-400">{items.destinationLocation}</p>
              <p className="text-gray-500 flex items-center">
                <FaStar className="text-yellow-500 me-2" />
                <span className="me-4">{items.ratings}</span>
                <span className="text-gray-400 text-sm">{`(${items.reviews})`}</span>
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Destination;
