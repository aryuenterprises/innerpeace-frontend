import React, { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import defaultimg from "../assets/defaultimg.png";

function UpcomingEvents() {
  const [upcomingEventsData, setUpcomingEventsData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

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

  // navigate to tour details page
  const handleCardClick = (id, title) => {
    const formattedTitleName = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Remove all special characters and replace with hyphen
      .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
      .replace(/^-+|-+$/g, ""); // Trim hyphens from the start and end

    navigate(`${id}/${formattedTitleName}`, {
      state: { id, title },
    });

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  useEffect(() => {
    async function getApiData() {
      try {
        let apiData = await axios.post(
          `https://backoffice.innerpece.com/api/v1/get-program`,
          {
            program_type: "upcoming_program",
            view_type: "",
          }
        );

        setUpcomingEventsData(apiData.data.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("error", error);
        setLoading(false); // Set loading to false in case of error
      }
    }

    getApiData();
  }, []);

  const SkeletonCard = () => (
    <div className="cursor-pointer border-gray-400 border-2 rounded-lg shadow-lg shadow-black/20 animate-pulse">
      <div className=" h-32 bg-gray-500 rounded-t-lg"></div>
      <div className="p-3">
        <div className="w-3/4 h-6 bg-gray-500 rounded mb-2"></div>
        <div className="w-1/2 h-5 bg-gray-500 rounded mb-1"></div>
        <hr className="w-32 mt-1 mb-1" />
        <div className="w-1/3 h-5 bg-gray-500 rounded"></div>
      </div>
    </div>
  );

  const SkeletonCarousel = () => (
    <div className="flex  gap-5 md:hidden">
      {Array(1)
        .fill(0)
        .map((_, index) => (
          <div className=" flex-grow">
            <SkeletonCard key={index} />
          </div>
        ))}
    </div>
  );

  return (
    <div>
      {upcomingEventsData.length > 0 && (
        <div className="ms-5 me-5 mt-10 md:ms-16 md:me-16  md:mt-16 ">
          {/* <p className="text-xl text-[#3E3E3E] md:text-3xl font-semibold font-mulish ">
            Explore <span className="text-[#007DD7]">Upcoming Events</span>
          </p> */}

          <p className="text-xl md:text-3xl leading-loose">
            <span className="font-jost font-medium ">Explore </span>{" "}
            <span className="font-jost font-bold">Upcoming Events</span>
          </p>

          {loading ? (
            <div className="mt-8 md:mt-10 flex">
              <div className="flex-grow">
                <SkeletonCarousel />
              </div>
            </div>
          ) : (
            <>
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
                containerClass="carousel-container"
                itemClass="carousel-item-padding-40-px block md:hidden shadow-lg shadow-black/10 mt-8 md:mt-10"
              >
                {upcomingEventsData.map((items, index) => (
                  <div
                    key={index}
                    onClick={() => handleCardClick(items.id, items.title)}
                    className="cursor-pointer flex flex-col w-screen bg-white rounded-lg overflow-hidden" // Apply rounded corners and prevent overflow
                  >
                    <img
                      src={
                        items.cover_img
                          ? `https://backoffice.innerpece.com/${items.cover_img}`
                          : defaultimg
                      }
                      className="object-cover h-48"
                      alt=""
                    />
                    <div className="p-3">
                      <p className="font-semibold text-lg md:text-xl">
                        {items.title}
                      </p>
                      <p className="text-gray-400 text-sm md:text-base">
                        <IoLocationSharp className="inline-block me-2 text-blue-900" />
                        {items.location}
                      </p>
                      <hr className="w-32 mt-1 mb-1" />
                      <p className="text-gray-500 text-sm md:text-base flex items-center">
                        <MdDateRange className="inline-block me-2 text-red-600 text-lg md:text-xl" />
                        {items.start_date} - {items.end_date}
                      </p>
                    </div>
                  </div>
                ))}
              </Carousel>
            </>
          )}

          {loading ? (
            <div className="max-md:hidden flex flex-wrap items-center justify-start mt-8 md:mt-10 gap-y-16 gap-x-7">
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <div className="flex-grow">
                    <SkeletonCard key={index} />
                  </div>
                ))}
            </div>
          ) : upcomingEventsData.length > 0 ? (
            <div className="max-md:hidden flex flex-wrap items-center gap-y-16 gap-x-7 justify-start mt-8 md:mt-10">
              {upcomingEventsData.map((items, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(items.id, items.title)}
                  className="cursor-pointer w-[335px] overflow-hidden  rounded-lg shadow-lg shadow-black/20 hover:shadow-2xl transition-all ease-in-out duration-500"
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      // src={`https://backoffice.innerpece.com/${items.cover_img}`}
                      src={
                        items.cover_img
                          ? `https://backoffice.innerpece.com/${items.cover_img}`
                          : defaultimg
                      }
                      className="w-full h-32 object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                      alt=""
                    />
                  </div>
                  <div className="p-3 overflow-hidden">
                    <p className="font-semibold text-lg md:text-xl">
                      {items.title}
                    </p>
                    <p className="text-gray-400 text-sm md:text-base">
                      <IoLocationSharp className="inline-block me-2 text-blue-900" />
                      {items.location}
                    </p>
                    <hr className="w-32 mt-1 mb-1" />
                    <p className="text-gray-500 text-sm md:text-base flex items-center">
                      <MdDateRange className="inline-block me-2 text-red-600 text-lg md:text-xl" />
                      {items.start_date} - {items.end_date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center my-20">
              <p className="md:text-3xl">No Upcoming events found </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UpcomingEvents;
