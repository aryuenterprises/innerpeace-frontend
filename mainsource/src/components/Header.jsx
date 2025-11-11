import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import innerpece_logo2 from "../assets/innerpece_logo2.svg";
import axios from "axios";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiArrowRightSLine } from "react-icons/ri";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [userLogedIn, setUserLogedIn] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up on component unmount
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("loginDetails");
    if (storedUserDetails) setUserLogedIn(true);
  }, []);

  const [filterByPriceDropdownOpen, setFilterByPriceDropdownOpen] =
    useState(false);
  const [destinationDropdownOpen, setDestinationDropdownOpen] = useState(false);
  const [destinationData, setDestinationsData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://backoffice.innerpece.com/api/v1/destination`)
      .then((response) => {
        setDestinationsData(response.data.destination_list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDestinationClick = (id, city_name) => {
    const formattedCityName = city_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Remove all special characters and replace with hyphen
      .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
      .replace(/^-+|-+$/g, ""); // Trim hyphens from the start and end

    navigate(`/populardestinations/${id}/${formattedCityName}`, {
      state: { id, city_name },
    });

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  const onChangeSelect = (e) => {
    const fetchProgramData = async () => {
      try {
        const response = await axios.get(
          "https://backoffice.innerpece.com/api/v1/get-pricewise-programs",
          {
            params: {
              price_check: e,
            },
          }
        );
        navigate(`/filteredList/${e}`, {
          state: { value: response.data.packages },
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchProgramData();
  };

  return (
    <div className="flex justify-between items-center px-2  xl:px-5 py-0   sm:py-2   bg-black/85 text-white ">
      <div onClick={() => navigate("/")} className="cursor-pointer">
        <img
          src={innerpece_logo2}
          alt=""
          className="w-28 lg:w-32 h-14 object-contain"
        />
      </div>

      <div className="max-lg:hidden">
      
        <ul className="flex items-center gap-5">
          {/* Home */}
          <li className="font-semibold relative group">
            <Link
              to="/"
              className="cursor-pointer relative inline-block pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-700 group-hover:after:w-full"
            >
              Home
            </Link>
          </li>

          {/* Filter by Price Dropdown */}
          <li className="font-semibold relative group">
            <div
              className="relative inline-block pb-1 cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-700 group-hover:after:w-full"
              onMouseEnter={() => setFilterByPriceDropdownOpen(true)}
              onMouseLeave={() => setFilterByPriceDropdownOpen(false)}
            >
              <button className="rounded-md transition duration-300 ease-in-out">
                Filter by Price
              </button>

              {/* <div
                className={`absolute left-0 top-full z-50 bg-white border shadow-lg rounded-md w-48 transition-all duration-200 ${
                  filterByPriceDropdownOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
              >
                <ul>
                  {[
                    { label: "Under 5k", value: "under_5k" },
                    { label: "5k-10k", value: "5k_to_10k" },
                    { label: "10k-20k", value: "10k_to_20k" },
                    { label: "20k-30k", value: "20k_to_30k" },
                    { label: "30k-40k", value: "30k_to_40k" },
                    { label: "Above 40k", value: "above_40k" },
                  ].map((item) => (
                    <li
                      key={item.value}
                      onClick={() => {
                        setFilterByPriceDropdownOpen(false);
                        onChangeSelect(item.value);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 text-black transition-all duration-75 cursor-pointer"
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div> */}

              <div
                className={`absolute left-0 top-full z-50 w-56 rounded-2xl shadow-2xl border border-gray-100 bg-gradient-to-b from-white/95 to-gray-50/90 backdrop-blur-md transition-all duration-300 transform origin-top ${
                  filterByPriceDropdownOpen
                    ? "opacity-100 scale-100 visible translate-y-0.5"
                    : "opacity-0 scale-95 invisible -translate-y-1"
                }`}
              >
                <ul className="py-2">
                  {[
                    { label: "Under 5k", value: "under_5k" },
                    { label: "5k–10k", value: "5k_to_10k" },
                    { label: "10k–20k", value: "10k_to_20k" },
                    { label: "20k–30k", value: "20k_to_30k" },
                    { label: "30k–40k", value: "30k_to_40k" },
                    { label: "Above 40k", value: "above_40k" },
                  ].map((item, i) => (
                    <li
                      key={item.value}
                      onClick={() => {
                        setFilterByPriceDropdownOpen(false);
                        onChangeSelect(item.value);
                      }}
                      className={`relative flex items-center group justify-between px-5 py-2.5 text-gray-700 font-medium cursor-pointer 
          transition-all duration-200 group hover:text-blue-700 hover:pl-6`}
                      style={{ transitionDelay: `${i * 30}ms` }} // subtle stagger
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                      </span>

                      <RiArrowRightSLine className="text-xl" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>

          {/* Destination Dropdown */}
          <li className="font-semibold relative group">
            <div
              className="relative inline-block pb-1 cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-700 group-hover:after:w-full"
              onMouseEnter={() => setDestinationDropdownOpen(true)}
              onMouseLeave={() => setDestinationDropdownOpen(false)}
            >
              <button className="rounded-md transition duration-300 ease-in-out">
                Destination
              </button>

              {/* <div
                className={`absolute left-0 top-full z-50 bg-white border shadow-lg rounded-md w-48 transition-all duration-200 ${
                  destinationDropdownOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
              >
                <ul>
                  {destinationData.map((item) => (
                    <li
                      key={item.city_name}
                      onClick={() => {
                        setDestinationDropdownOpen(false);
                        handleDestinationClick(item.id, item.city_name);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 text-black transition-all duration-75 cursor-pointer"
                    >
                      {item.city_name}
                    </li>
                  ))}
                </ul>
              </div> */}

              <div
                className={`absolute left-0 top-full z-50 w-56 rounded-2xl shadow-2xl border border-gray-100 bg-gradient-to-b from-white/95 to-gray-50/90 backdrop-blur-md transition-all duration-300 transform origin-top ${
                  destinationDropdownOpen
                    ? "opacity-100 scale-100 visible translate-y-0.5"
                    : "opacity-0 scale-95 invisible -translate-y-1"
                }`}
              >
                <ul className="py-2">
                  {destinationData.map((item, i) => (
                    <li
                      key={item.city_name}
                      onClick={() => {
                        setDestinationDropdownOpen(false);
                        handleDestinationClick(item.id, item.city_name);
                      }}
                      className={`relative flex items-center justify-between px-5 py-2.5 text-gray-700 font-medium cursor-pointer 
          transition-all duration-200 group hover:text-blue-700 hover:pl-6`}
                      style={{ transitionDelay: `${i * 30}ms` }} // staggered animation
                    >
                      <span className="flex items-center gap-2">
                        {item.city_name}
                      </span>

                      {/* Animated arrow icon */}
                      <RiArrowRightSLine className="text-xl" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>

          {/* Customization Enquiry */}
          <li className="font-semibold relative group">
            <Link
              to="/sendenquiry"
              className="cursor-pointer relative inline-block pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-700 group-hover:after:w-full"
            >
              Customization Enquiry
            </Link>
          </li>

          {/* Events */}
          <li className="font-semibold relative group">
            <Link
              to="/eventsHistory"
              className="cursor-pointer relative inline-block pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-700 group-hover:after:w-full"
            >
              Events
            </Link>
          </li>

          {/* About Us */}
          <li className="font-semibold relative group">
            <Link
              to="/aboutus"
              className="cursor-pointer relative inline-block pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-700 group-hover:after:w-full"
            >
              About Us
            </Link>
          </li>

          {/* Contact Us */}
          <li className="font-semibold relative group">
            <Link
              to="/contactus"
              className="cursor-pointer relative inline-block pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-700 group-hover:after:w-full"
            >
              Contact Us
            </Link>
          </li>

          {/* Profile */}
          {userLogedIn && (
            <li className="font-semibold relative group">
              <Link
                to="/profile"
                className="cursor-pointer relative inline-block pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-700 group-hover:after:w-full"
              >
                My Profile
              </Link>
            </li>
          )}

          {/* Login Button */}
          {!userLogedIn && (
            <Link
              to="/login"
              className="cursor-pointer font-semibold border-sky-800 border-2 rounded-2xl text-sky-800 bg-white hover:text-white hover:bg-gray-700 hover:border-gray-700 text-center md:px-3 lg:px-6 py-2 transition-all duration-300"
            >
              Login
            </Link>
          )}
        </ul>
      </div>

      <div className="lg:hidden">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setFilterByPriceDropdownOpen(false);
            setDestinationDropdownOpen(false);
          }}
        >
          <GiHamburgerMenu className="text-2xl" />
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 h-full bg-white z-[5000] p-10 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-1 right-3 text-red-600 font-extrabold text-3xl"
        >
          &times;
        </button>
        <ul className="flex flex-col gap-5 mt-10">
          <li className="text-black text-xl cursor-pointer font-medium">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>

          <li className="relative">
            <div className="w-max">
              <button
                onClick={() => {
                  setFilterByPriceDropdownOpen(!filterByPriceDropdownOpen);
                  setDestinationDropdownOpen(false);
                }}
                className="flex justify-between items-center gap-2 text-xl cursor-pointer font-medium text-gray-800  transition duration-200"
              >
                Filter by Price{" "}
                {filterByPriceDropdownOpen ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )}
              </button>

              {/* <div
                className={`absolute mt-2 bg-white shadow-xl rounded-md border w-52 transform transition-all duration-200 z-20 ${
                  filterByPriceDropdownOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <ul className="py-2">
                  {[
                    { label: "Under 5k", value: "under_5k" },
                    { label: "5k - 10k", value: "5k_to_10k" },
                    { label: "10k - 20k", value: "10k_to_20k" },
                    { label: "20k - 30k", value: "20k_to_30k" },
                    { label: "30k - 40k", value: "30k_to_40k" },
                    { label: "Above 40k", value: "above_40k" },
                  ].map((item) => (
                    <li
                      key={item.value}
                      onClick={() => {
                        setFilterByPriceDropdownOpen(false);
                        onChangeSelect(item.value);
                      }}
                      className="px-4 py-1.5 font-medium text-gray-700  transition cursor-pointer"
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div> */}

              <div
                className={`absolute left-0 top-full z-50 w-56 rounded-2xl shadow-2xl border border-gray-100 
  bg-gradient-to-b from-white/95 to-gray-50/90 backdrop-blur-md 
  transition-all duration-300 transform origin-top ${
    filterByPriceDropdownOpen
      ? "opacity-100 scale-100 visible translate-y-0.5"
      : "opacity-0 scale-95 invisible -translate-y-1"
  }`}
              >
                <ul className="py-2">
                  {[
                    { label: "Under 5k", value: "under_5k" },
                    { label: "5k–10k", value: "5k_to_10k" },
                    { label: "10k–20k", value: "10k_to_20k" },
                    { label: "20k–30k", value: "20k_to_30k" },
                    { label: "30k–40k", value: "30k_to_40k" },
                    { label: "Above 40k", value: "above_40k" },
                  ].map((item, i) => (
                    <li
                      key={item.value}
                      onClick={() => {
                        setFilterByPriceDropdownOpen(false);
                        onChangeSelect(item.value);
                      }}
                      className={`relative flex items-center justify-between px-5 py-1.5 text-gray-700 font-medium cursor-pointer
          transition-all duration-200 group hover:text-blue-700 hover:pl-6`}
                      style={{ transitionDelay: `${i * 30}ms` }} // subtle stagger animation
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                      </span>

                      {/* Animated arrow icon */}
                      <RiArrowRightSLine className="text-lg translate-x-1 group-hover:translate-x-2 transition-all duration-300" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>

          <li className="relative">
            <div className="w-max">
              <button
                onClick={() => {
                  setDestinationDropdownOpen(!destinationDropdownOpen);
                  setFilterByPriceDropdownOpen(false);
                }}
                className="flex justify-between items-center gap-2 text-xl cursor-pointer font-medium text-gray-800  transition duration-200"
              >
                Destination
                {destinationDropdownOpen ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )}
              </button>

              {/* <div
                className={`absolute mt-2 bg-white shadow-xl rounded-md border w-52 transform transition-all duration-200 z-20 ${
                  destinationDropdownOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <ul className="py-2">
                  {destinationData.map((item) => (
                    <li
                      key={item.city_name}
                      onClick={() => {
                        setDestinationDropdownOpen(false);
                        handleDestinationClick(item.id, item.city_name);
                      }}
                      className="px-4 py-1.5 font-medium text-gray-700  transition cursor-pointer"
                    >
                      {item.city_name}
                    </li>
                  ))}
                </ul>
              </div> */}

              <div
                className={`absolute left-0 top-full z-50 w-56 rounded-2xl shadow-2xl border border-gray-100 
  bg-gradient-to-b from-white/95 to-gray-50/90 backdrop-blur-md 
  transition-all duration-300 transform origin-top ${
    destinationDropdownOpen
      ? "opacity-100 scale-100 visible translate-y-0.5"
      : "opacity-0 scale-95 invisible -translate-y-1 pointer-events-none"
  }`}
              >
                <ul className="py-2">
                  {destinationData.map((item, i) => (
                    <li
                      key={item.city_name}
                      onClick={() => {
                        setDestinationDropdownOpen(false);
                        handleDestinationClick(item.id, item.city_name);
                      }}
                      className={`relative flex items-center justify-between px-5 py-1.5 text-gray-700 font-medium cursor-pointer 
          transition-all duration-200 group hover:text-blue-700 hover:pl-6`}
                      style={{ transitionDelay: `${i * 30}ms` }} // subtle stagger
                    >
                      <span className="flex items-center gap-2">
                        {item.city_name}
                      </span>

                      {/* Right arrow animation */}
                      <RiArrowRightSLine className="text-lg  translate-x-1 group-hover:translate-x-2 transition-all duration-300" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>

          <li className="text-black text-xl cursor-pointer font-medium">
            <Link to="/sendenquiry" onClick={() => setIsOpen(false)}>
              Customization Enquiry
            </Link>
          </li>

          <li className="text-xl cursor-pointer font-medium text-black">
            <Link to="/eventsHistory" onClick={() => setIsOpen(false)}>
              Events
            </Link>
          </li>

          <li className="text-black text-xl cursor-pointer font-medium">
            <Link to="/aboutus" onClick={() => setIsOpen(false)}>
              About Us
            </Link>
          </li>
          <li className="text-black text-xl cursor-pointer font-medium">
            <Link to="/contactus" onClick={() => setIsOpen(false)}>
              Contact Us
            </Link>
          </li>

          {userLogedIn && (
            <li className="text-black text-xl cursor-pointer font-medium">
              <Link to="/profile" onClick={() => setIsOpen(false)}>
                My Profile
              </Link>
            </li>
          )}

          {!userLogedIn && (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="px-6 py-2 cursor-pointer text-center font-semibold border-[#005FC4] border-2 rounded-2xl text-[#005FC4] bg-white hover:text-white hover:bg-gray-700 hover:border-gray-700"
            >
              Login
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
