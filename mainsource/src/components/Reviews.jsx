import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import googleLogo from "../assets/googleLogo.svg";

const Reviews = () => {
  const names = [
  "Aarav Nair", "Diya Menon", "Karthik Reddy", "Ananya Iyer", "Vikram Rajan",
  "Sneha Pillai", "Arjun Kumar", "Meera Nambiar", "Hari Prasad", "Revathi Suresh",
  "Rohit Ramesh", "Lakshmi Krishnan", "Vignesh Babu", "Keerthi Nair", "Sandeep Reddy",
  "Divya Krishnan", "Naveen Kumar", "Aishwarya Raj", "Pradeep Menon", "Nithya Ramesh",
  "Harish Nambiar", "Shruthi Iyer", "Manoj Reddy", "Deepika Rajan", "Suraj Pillai",
  "Anjali Prasad", "Kiran Kumar", "Swetha Nair", "Abhishek Reddy", "Vidya Krishnan",
  "Ravi Chandran", "Gayathri Menon", "Ashwin Raj", "Malavika Nair", "Mohan Reddy",
  "Keerthana Iyer", "Santosh Kumar", "Shilpa Nair", "Sujith Reddy", "Preethi Rajan",
  "Varun Nambiar", "Snehalatha Krishnan", "Ajay Reddy", "Ramya Menon", "Bharath Kumar",
  "Nisha Raj", "Siddharth Nair", "Kavya Reddy", "Ganesh Iyer", "Aparna Menon",
  "Rakesh Rajan", "Pooja Krishnan", "Vivek Reddy", "Sandhya Nair", "Madhav Pillai",
  "Divakar Reddy", "Harini Iyer", "Sujay Menon", "Priya Rajan", "Dinesh Kumar"
];

  const locations = [
    "Mumbai",
    "Delhi",
    "Chennai",
    "Bangalore",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Goa",
    "Indore",
    "Surat",
    "Coimbatore",
    "Trivandrum",
    "Amritsar",
    "Nagpur",
    "Bhopal",
    "Chandigarh",
    "Vijayawada",
  ];

  const texts = [
    "Amazing trip! Everything was perfectly arranged. Would recommend 100%.",
    "The staff was very friendly and professional. Great job!",
    "Loved every bit of our vacation. Thanks for the smooth planning.",
    "Our Munnar trip was magical! Excellent coordination throughout.",
    "Had a great experience. Hotels were clean and cozy.",
    "We had a stress-free journey. Thank you for all the support.",
    "Very well organized itinerary. It felt seamless.",
    "Everything was above expectations! I’ll travel again with Innerpece.",
    "Professional and responsive team. Totally satisfied.",
    "Fantastic food, great stay, and smooth travel!",
    "Worth every penny. Excellent attention to detail.",
    "We enjoyed the nature views and comfortable stays.",
    "Hassle-free experience from start to end.",
    "They made our honeymoon special and memorable.",
    "Will definitely recommend to my friends and family.",
    "The best service I’ve used so far for holiday planning.",
    "Super easy booking and wonderful hospitality.",
    "They arranged everything exactly as promised.",
    "Trip was memorable thanks to Innerpece’s coordination.",
    "Our group tour was perfectly handled. No complaints!",
  ];

  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const getRandomRating = () => {
    const ratings = ["★★★★★", "★★★★☆", "★★★★★", "★★★★★", "★★★★☆"];
    return getRandom(ratings);
  };

  // Generate 60 fake reviews dynamically
  const reviews = Array.from({ length: 60 }, (_, i) => ({
    name: getRandom(names),
    location: getRandom(locations),
    rating: getRandomRating(),
    image: `https://randomuser.me/api/portraits/${
      i % 2 === 0 ? "men" : "women"
    }/${(i % 90) + 1}.jpg`,
    text: getRandom(texts),
  }));

  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(25);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateSettings = () => {
      const containerHeight = containerRef.current?.clientHeight || 500;
      setDistance(containerHeight); // use actual height in px

      if (window.innerWidth < 640) {
        setDuration(45); // slower on mobile
      } else if (window.innerWidth < 1024) {
        setDuration(35);
      } else {
        setDuration(25);
      }
    };

    updateSettings();
    window.addEventListener("resize", updateSettings);
    return () => window.removeEventListener("resize", updateSettings);
  }, []);

  return (
    <div className="ms-5 me-5 mt-10 md:ms-16 md:me-16  md:mt-16">
      <p className="text-2xl md:text-3xl  lg:text-4xl  leading-loose text-[#141414]">
        <span className="font-jost font-medium ">Our </span>{" "}
        <span className="font-jost font-bold">Reviews</span>
      </p>

      <div className="flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-28 xl:gap-36">
        <div
          ref={containerRef}
          className="overflow-hidden h-[450px] sm:h-[500px] flex justify-center mt-8 md:mt-10 font-jost w-full lg:w-[60%]"
        >
          <div className="flex flex-col sm:flex-row gap-5 w-full max-w-6xl">
            {/* Left Column */}
            <motion.div
              className="flex flex-col gap-5 w-full sm:w-1/2 flex-grow"
              animate={{ y: [0, -distance] }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {reviews.map((item, index) => (
                <div
                  key={index}
                  className="border border-[#707070]/50 rounded-xl p-4 sm:p-5 bg-white shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm sm:text-base">
                        {item.name}
                      </p>
                      <p className="text-yellow-500 text-sm">{item.rating}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {item.text}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">{item.location}</p>
                </div>
              ))}
            </motion.div>

            {/* Right Column */}
            <motion.div
              className="flex flex-col gap-5 w-full sm:w-1/2 flex-grow"
              animate={{ y: [-distance, 0] }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {reviews.map((item, index) => (
                <div
                  key={index}
                  className="border border-[#707070]/50 rounded-xl p-4 sm:p-5 bg-white shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm sm:text-base">
                        {item.name}
                      </p>
                      <p className="text-yellow-500 text-sm">{item.rating}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {item.text}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">{item.location}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ===== Right Section (Rating + Description) ===== */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <div className="flex gap-5 items-center font-PlusJakartaSansMedium p-5 w-fit rounded-xl mx-auto lg:mx-0 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
            <div className="flex flex-col items-center">
              <p className="text-[#4285F4] font-nunito font-bold text-3xl sm:text-5xl">
                5.0
              </p>
              <p className="text-yellow-400 text-2xl sm:text-3xl">★★★★★</p>
            </div>

            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <p className="text-[#6A6A6A] font-bold text-lg sm:text-xl">
                Google
              </p>
              <p className="text-[#6A6A6A] text-xs sm:text-sm">
                average rating
              </p>
              <img
                src={googleLogo}
                alt="Google"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <div className="font-jost">
              <p className="font-medium text-2xl sm:text-3xl md:text-4xl">
                Check our
              </p>
              <p className="font-bold text-2xl sm:text-3xl md:text-4xl">
                Reviews
              </p>
            </div>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-md">
              We are not just making your travel comfortable but also giving you
              the best deals.
            </p>

            <a
              href="https://www.google.com/search?sca_esv=a468913120da2fdd&sxsrf=AE3TifP-907ftx8bZ6L-WBjmkNZ_KqdVgg:1760788722276&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E0ZLvNPWsLLR7Un4N24OXGxPvUaONb_Dr0IVUNDKl4DBUFyhDzKqVJlR6JfDe469L3teuLQQRPiaQ0hqx6UfhbXgRJja&q=Innerpece+Reviews&sa=X&ved=2ahUKEwinkMOS2a2QAxWF1TgGHdf5L70Q0bkNegQIIBAE&biw=1536&bih=695&dpr=1.25"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-gradient-to-r from-[#0F5B92] to-[#003D74] rounded-lg px-4 py-2 text-white text-sm sm:text-base">
                Check Reviews
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
