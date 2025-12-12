import React from "react";
import telegram from "../assets/telegram.png";
import customerservice from "../assets/customerservice.svg";
import approve from "../assets/approve.svg";
import insurance from "../assets/insurance.svg";
import pricetag from "../assets/pricetag.svg";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import defaultimg from "../assets/defaultimg.png";
import { IoIosContact } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlinePhone } from "react-icons/md";
import { BiMessageRoundedDots } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import { LiaPlaceOfWorshipSolid } from "react-icons/lia";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaCar } from "react-icons/fa";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { FaPeopleLine } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaHouse } from "react-icons/fa6";
import { MdEmojiPeople } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaChildReaching } from "react-icons/fa6";
import { FaChild } from "react-icons/fa6";
import { FaBirthdayCake } from "react-icons/fa";
import { GiLovers } from "react-icons/gi";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import { PiMoneyWavyFill } from "react-icons/pi";
import star from "../assets/star.png";
import default_user_image from "../assets/default_user_image.png";
import default_user_image2 from "../assets/default_user_image_2.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { useGoogleLogin } from "@react-oauth/google";
import CustomDatePicker from "./CustomDatePicker";
import { IoChevronDown } from "react-icons/io5";

function Sidebar({ LocationShareRef, reviewRef }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const [apiData, setApiData] = useState([]);
  const handleShow = () => setShow(true);
  // const handleClose = () => setShow(false);
  const handleClose = () => {
    setFailure(false);
    setSuccess(false);
    setLoading(false);
    setShow(false);
    setErrors({});
  };
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [yourResidenceLocation, setYourResidenceLocation] = useState("");
  const [dob, setDob] = useState("");
  const [engagementDate, setEngagementDate] = useState("");
  const [howManyDays, setHowManyDays] = useState("");
  const [travelDestination, setTravelDestination] = useState("");
  const [budgetPerHead, setBudgetPerHead] = useState("");
  const [isCabNeed, setIsCabNeed] = useState("");
  const [totalCount, setTotalCount] = useState("");
  const [maleCount, setMaleCount] = useState("");
  const [femaleCount, setFemaleCount] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelEndDate, setTravelEndDate] = useState("");
  const [howManyRoomsYouNeed, setHowManyRoomsYouNeed] = useState("");
  const [comments, setCommends] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [failure, setFailure] = useState("");
  const [map, setMap] = useState("");
  const [loadingform, setLoadingform] = useState("");
  const [userDetails, setUserDetails] = useState(false);
  const [userId, setUserId] = useState("");
  const [localStorageId, setLocalStorageId] = useState("");
  const [reference_id, setReferenceId] = useState("");
  const [childCount, setChildCount] = useState("");
  const [childAge, setChildAge] = useState([]);
  const [loginCliked, setLoginClicked] = useState(false);
  const [image, setImage] = useState("");
  const [priceSelected, setPriceSelected] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [yearMonthDate, setYearMonthDate] = useState(new Date());
  const [rating, setRating] = useState(""); // Current rating
  const [hover, setHover] = useState(""); // Hovered rating
  const [userReview, setUserReview] = useState("");
  const [date, setDate] = useState(new Date());
  const [loginClikedForAddReview, setLoginClickedForAddReview] =
    useState(false);
  const [signInLoader, setSignInLoader] = useState(false);
  const [pricingCalculatorClicked, setPricingCalculatorClicked] =
    useState(false);

  const handleLoginClickForAddReview = () => {
    setLoginClickedForAddReview(true);
  };

  const slicedPathName = window.location.pathname.split("/")[1];
  const slicedUserId = window.location.href.split("#")[1];

  useEffect(() => {
    const reference_id = window.location.search.split("=")[1]
      ? window.location.search.split("=")[1].split("-").slice(0, 2).join("-")
      : "";

    if (!sessionStorage.getItem("reference_id")) {
      sessionStorage.setItem("reference_id", reference_id);
      setReferenceId(reference_id);
    } else {
      setReferenceId(sessionStorage.getItem("reference_id"));
    }
  }, []);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const storedUserDetails = localStorage.getItem("loginDetails");

        const userDetails = storedUserDetails
          ? JSON.parse(storedUserDetails)
          : null;

        // const response = await axios.post(
        //   "https://backoffice.innerpece.com/api/v1/get-program-details",
        //   payload
        // );

        const payload1 = {
          program_id: id ? id : slicedPathName,
          user_id: userDetails?.id || null,
        };

        const payload2 = {
          program_id: slicedUserId,
        };

        const response = slicedUserId
          ? await axios.post(
              "https://backoffice.innerpece.com/api/v1/specific-program-details",
              payload2
            )
          : await axios.post(
              "https://backoffice.innerpece.com/api/v1/get-program-details",
              payload1
            );

        setApiData(response.data.data);

        setApiData(response.data.data);
        setHomeImage(response.data.data.gallery_img);
        // apiData.gallery_img
        setImage(response.data.data.cover_img);
        setSelectedPackage(response.data.data.price_title[0]);
        setPriceSelected(response.data.data.price_amount[0]);

        let modifiedMapHtml = response?.data?.data?.google_map;

        // Remove width and height attributes from the iframe
        // modifiedMapHtml = modifiedMapHtml.replace(/width="[^"]*"/g, "");
        // modifiedMapHtml = modifiedMapHtml.replace(/height="[^"]*"/g, "");
        // modifiedMapHtml = modifiedMapHtml.replace(/style="[^"]*"/g, "");

        modifiedMapHtml =
          modifiedMapHtml ||
          ""
            .replace(/width="[^"]*"/g, "")
            .replace(/height="[^"]*"/g, "")
            .replace(/style="[^"]*"/g, "")
            .replace(
              /<iframe /,
              '<iframe style="border-radius: 1rem; width: 100%; height: 100%; border:0;" '
            );

        setMap(modifiedMapHtml);
        // setIsWishlisted(response.data.data.wishlists);

        // document.title = apiData.title || "Default Title";

        const metaOgTitle = document.querySelector("meta[property='og:title']");
        if (metaOgTitle) {
          metaOgTitle.setAttribute("content", apiData.title || "Default Title");
        }

        const metaOgDescription = document.querySelector(
          "meta[property='og:description']"
        );
        if (metaOgDescription) {
          metaOgDescription.setAttribute(
            "content",
            apiData.program_desc || "Default description"
          );
        }

        const metaOgImage = document.querySelector("meta[property='og:image']");
        if (metaOgImage) {
          metaOgImage.setAttribute(
            "content",
            `https://backoffice.innerpece.com/${apiData.cover_img}` ||
              ""
          );
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProgramData();
  }, []);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("loginDetails");
    const userDetails = storedUserDetails
      ? JSON.parse(storedUserDetails)
      : null;
    setUserDetails(userDetails);

    setUserId(localStorage.getItem("loginid"));
  }, [loginCliked]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setErrors({}); // Reset errors on submit
    setFailure("");
    setSuccess("");

    try {
      setLoadingform("Sending...");
      const authToken = userId;
      const response = await axios.post(
        "https://backoffice.innerpece.com/api/enquiry-form",
        {
          name,
          email,
          phone,
          comments,
          cab_need: isCabNeed,
          days: howManyDays,
          location: yourResidenceLocation,
          rooms_count: howManyRoomsYouNeed,
          total_count: totalCount,
          travel_date: travelDate,
          travel_enddate: travelEndDate,
          program_id: id ? id : slicedPathName,
          travel_destination: apiData.title,
          male_count: maleCount,
          female_count: femaleCount,
          reference_id: reference_id,
          program_title: apiData.title,
          child_count: childCount,
          child_age: childAge,
          engagement_date: engagementDate,
          birth_date: dob,
          pricing: slicedUserId
            ? apiData?.pricing_calculator?.stayTotal
            : priceSelected,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // Successful submission
      setLoadingform("");
      setFailure("");
      // setSuccess(response.data.message);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Submitted successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      // Clear form values

      setCommends("");
      setBudgetPerHead("");
      setIsCabNeed("");
      setHowManyDays("");
      setHowManyRoomsYouNeed("");
      setTotalCount("");
      setTravelDate("");
      setTravelEndDate("");
      setTravelDestination("");
      setMaleCount("");
      setFemaleCount("");
      setChildCount("");
      setChildAge([]);
      // !dobFetchedFromLocalStorage && setDob("");
      // !engagementDateFetchedFromLocalStorage && setEngagementDate("");

      // window.location.reload()

      // Clear success message after 5 seconds
      setTimeout(() => {
        // setSuccess("");
        setShow(false);
      }, 2000); // 5000 ms = 5 seconds
    } catch (error) {
      // Handle validation errors if any
      setLoadingform("");
      setFailure("Please Fill all the fields");
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
        console.log("error", error.response.data.errors);
      }
      console.error("Error:", error.response?.data || error.message);
    }
  };

  // this will stop scroll when modal is open
  useEffect(() => {
    // Add or remove the 'overflow-hidden' class on the <body> based on modal state
    if (show || loginCliked || pricingCalculatorClicked) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up on component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [show, loginCliked, pricingCalculatorClicked]);

  const handleLoginClick = () => {
    setLoginClicked(true);
  };

  const onChangeChildAge = (e, key, index) => {
    const value = e.target.value;

    // Allow only up to 10 digits (numbers only)
    if (/^\d{0,10}$/.test(value)) {
      const updatedChildCount = [...childAge];
      updatedChildCount[index] = value;
      setChildAge(updatedChildCount);
    }
  };

  useEffect(() => {
    const loggedUserDetails = localStorage.getItem("loginDetails")
      ? JSON.parse(localStorage.getItem("loginDetails"))
      : null;

    if (loggedUserDetails) {
      const {
        first_name: loggedUser_fistName,
        last_name: loggedUser_lastName,
        email: loggedUser_email,
        phone: loggedUser_phone,
        city: loggedUser_city,
        dob: loggedUser_dob,
        anniversary_date,
      } = loggedUserDetails;

      setName(`${loggedUser_fistName} ${loggedUser_lastName || ""}`.trim());

      // setName(loggedUser_fistName + " " + loggedUser_lastName);
      setEmail(loggedUser_email);
      setPhone(loggedUser_phone);
      setYourResidenceLocation(loggedUser_city);
      setDob(loggedUser_dob);
      setEngagementDate(anniversary_date);
    }
  }, []);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginCheckboxChecked, setLoginCheckBoxChecked] = useState("");
  const [loginError, setLoginError] = useState({});

  function onClickBtn() {
    navigate("/signup");
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  function onChangeInput(e) {
    const { name, value } = e.target;

    if (name === "loginEmail") {
      setLoginEmail(value);
    }

    if (name === "loginPassword") {
      setLoginPassword(value);
    }

    if (name === "checkbox") {
      setLoginCheckBoxChecked(loginCheckboxChecked ? "" : "checkbox checked");
    }
  }

  async function onClickSignIn() {
    setSignInLoader(true);
    try {
      let response = await axios.post(
        // `https://backoffice.innerpece.com/api/login`,
        `https://backoffice.innerpece.com/api/v1/login`,
        {
          email: loginEmail,
          password: loginPassword,
        }
      );

      const loginid = response.data.token;
      const loginDetails = response.data.user_details;

      localStorage.setItem("loginid", loginid);
      localStorage.setItem("loginDetails", JSON.stringify(loginDetails));

      setLoginEmail("");
      setLoginPassword("");
      setLoginError("");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      setLoginClicked(false);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
      setSignInLoader(false);
    } catch (err) {
      console.log(err);

      let errors = err.response.data.errors
        ? err.response.data.errors
        : err.response.data;
      setLoginError({ ...errors });
      console.log(errors);
      setSignInLoader(false);
    }
  }

  const [captchaValue, setCaptchaValue] = useState(null);
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const [homeImage, setHomeImage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === homeImage?.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [homeImage?.length]);

  const onChangePrice = (item, index) => {
    setSelectedPackage(item);
    setPriceSelected(apiData.price_amount[index]);
  };

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("loginDetails");
    const userDetails = storedUserDetails
      ? JSON.parse(storedUserDetails)
      : null;
    setUserDetails(userDetails);

    const storedUserId = localStorage.getItem("loginid");
    setUserId(storedUserId);

    let interval = setInterval(() => {
      setDate(new Date());
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      setYearMonthDate(formattedDate);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onClickPostReview = async () => {
    try {
      const payload = {
        user_id: userDetails?.id,
        package_id: id,
        comment: userReview,
        rating: rating,
        created_at: date,
        review_dt: yearMonthDate,
      };

      const authToken = userId;
      const response = await axios.post(
        "https://backoffice.innerpece.com/api/add_review",
        payload,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Add the token here
          },
        }
      );

      const fetchProgramData = async () => {
        try {
          const storedUserDetails = localStorage.getItem("loginDetails");
          const userDetails = storedUserDetails
            ? JSON.parse(storedUserDetails)
            : null;

          const payload = {
            program_id: id ? id : slicedPathName,
            user_id: userDetails?.id || null,
          };

          const response = await axios.post(
            "https://backoffice.innerpece.com/api/v1/get-program-details",
            // "https://backoffice.innerpece.com/api/v1/get-program",
            payload
          );

          setApiData(response.data.data);
          setLoading(false);

          const metaOgTitle = document.querySelector(
            "meta[property='og:title']"
          );
          if (metaOgTitle) {
            metaOgTitle.setAttribute(
              "content",
              apiData.title || "Default Title"
            );
          }

          const metaOgDescription = document.querySelector(
            "meta[property='og:description']"
          );
          if (metaOgDescription) {
            metaOgDescription.setAttribute(
              "content",
              apiData.program_desc || "Default description"
            );
          }

          const metaOgImage = document.querySelector(
            "meta[property='og:image']"
          );
          if (metaOgImage) {
            metaOgImage.setAttribute(
              "content",
              `https://backoffice.innerpece.com/${apiData.cover_img}` ||
                ""
            );
          }
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      };
      if (response.data) {
        fetchProgramData();
      }

      setRating("");
      setHover("");
      setUserReview("");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Review Posted",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "w-72 p-4 text-sm", // Tailwind classes
        },
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Write a Review",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "w-72  p-4 text-sm", // Tailwind classes
        },
      });
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const totalReviews = apiData?.reviews?.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = apiData?.reviews?.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info from Google API
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        postGoogleUserData({ ...res.data });

        // res.data will have: name, email, picture, etc.
      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    },
    onError: () => console.log("Login Failed"),
  });

  const postGoogleUserData = async (res) => {
    try {
      let response = await axios.post(
        `https://backoffice.innerpece.com/api/v1/auth/google/callback`,
        { ...res }
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Success",
        showConfirmButton: false,
        timer: 2000,
      });

      let loginid = response.data.token;
      let loginDetails = response.data.user_details;

      loginDetails = { ...loginDetails, googlePicture: res.picture };

      localStorage.setItem("loginid", loginid);
      localStorage.setItem("loginDetails", JSON.stringify(loginDetails));

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.log(err);

      console.log(err?.response?.data?.error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login Failed",
        // text:err.response.data.error,
        text: err.response?.data?.error || "Something went wrong!",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <div
      className={` w-full overflow-y-auto lg:h-screen  pb-10 lg:sticky top-5  sidebar bg-[#FEFEFE]  md:basis-[32%] xl:basis-[25%] flex-grow  lg:mt-10   ${
        show ? "fixed" : ""
      }`}
    >
      {slicedUserId ? (
        <div className="relative max-lg:hidden w-full  bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
          {/* Gradient Accent Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-[#0E598F] "></div>

          {/* Content */}
          <div className="flex flex-col gap-5 p-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">
                  Total Amount
                </p>
                <p className="text-3xl font-bold text-gray-900 tracking-tight">
                  ₹{" "}
                  {Number(
                    apiData?.pricing_calculator?.grand_total
                  ).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                Affordable Adventures
              </div>
            </div>

            {/* Price Breakdown Button */}
            <button
              onClick={() => setPricingCalculatorClicked(true)}
              className="w-fit text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 underline underline-offset-4 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
              </svg>
              View Price Breakdown
            </button>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Booking Button */}
            <button
              onClick={handleShow}
              disabled={!userDetails}
              className={`group flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-lg tracking-wide transition-all duration-300 ${
                userDetails
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:shadow-[0_4px_20px_rgba(239,68,68,0.4)]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <img
                src={telegram}
                alt=""
                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
              />
              Book Now
            </button>

             {!userDetails && (
              <p className="text-red-500 text-center">
                Please{" "}
                <span
                  className="underline cursor-pointer"
                  onClick={handleLoginClick}
                >
                  Login
                </span>{" "}
                to book now
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col p-3 border border-gray-200  shadow-md max-md:hidden bg-white shadow-black/10 rounded-lg items-center gap-y-4 gap-2">
          <span className="text-gray-600 pb-2 ">
            Starting From{" "}
            <span className="text-green-800 font-semibold text-xl lg:text-2xl ms-1">
              ₹
              {`${
                apiData.price_amount &&
                Number(apiData.price_amount[0]).toLocaleString("en-IN")
              }`}
              {/* ₹{Number(item.pricing[0]).toLocaleString('en-IN')} */}
            </span>
          </span>

          <div className="border-t-2 border-dotted w-full border-sky-800"></div>

          <span className="bg-sky-800 -mt-8 px-16 py-1  text-sm rounded-full text-white font-semibold">
            Per Person
          </span>

          {apiData?.price_amount?.length > 0 && (
            <div className="flex flex-col w-full">
              <div className="flex items-center text-center justify-center">
                <div className="flex flex-col gap-2 flex-wrap">
                  {apiData.price_title.map(
                    (item, index) =>
                      item && (
                        <div
                          key={index}
                          className="flex gap-2 items-center h-fit text-start  "
                        >
                          <input
                            type="radio"
                            name={item}
                            id={item.replace(/[^a-zA-Z0-9_-]/g, "-")}
                            value={item}
                            checked={selectedPackage === item}
                            onChange={() => onChangePrice(item, index)}
                            className="h-fit"
                          />
                          <label
                            htmlFor={item.replace(/[^a-zA-Z0-9_-]/g, "-")}
                            className="h-fit"
                          >
                            <span> {item} : </span>
                            <span className="font-semibold sm:font-bold text-green-800 text-base sm:text-lg">
                              ₹
                              {Number(
                                apiData.price_amount[index]
                              ).toLocaleString("en-IN")}
                            </span>
                          </label>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center flex-wrap justify-center ">
            <button
              onClick={handleShow}
              // disabled={userDetails && selectedPackage ? false : true}
              disabled={userDetails ? false : true}
              className="flex hover:scale-105 transition-all duration-300 ease-in-out flex-wrap bg-red-500 text-white font-semibold flex-grow md:flex-grow-0 px-4 py-2 items-center rounded-lg gap-2"
            >
              <img src={telegram} alt="" />
              Book Now
            </button>

            {!userDetails && (
              <p className="text-red-500 ">
                Please{" "}
                <span
                  className="underline cursor-pointer"
                  onClick={handleLoginClick}
                >
                  Login
                </span>{" "}
                to book now
              </p>
            )}

            {/* {!selectedPackage && userDetails && (
              <p className="text-red-500 ">
                Please select any packages to book{" "}
              </p>
            )} */}
          </div>
        </div>
      )}

      <div className="shadow-md  lg:mt-10  bg-white py-3 border border-gray-200  shadow-black/10 rounded-lg">
        <div className="flex gap-4  ms-3 text-lg">
          <p className="text-sky-800">|</p>
          <p className="font-semibold">Book With Confidence</p>
        </div>

        <div className="flex flex-wrap  items-start  justify-between md:flex-col  px-5 pt-5   gap-y-3 gap-2">
          <div className="flex gap-4 items-center">
            <img src={customerservice} alt="" />
            <p>Customer care available 24/7</p>
          </div>

          <div className="flex gap-4 items-center">
            <img src={approve} alt="" />
            <p>Hand-picked Tours & Activities</p>
          </div>

          <div className="flex gap-4 items-center">
            <img src={insurance} alt="" />
            <p>Women-Friendly Environments</p>
          </div>

          <div className="flex gap-4 items-center">
            <img src={pricetag} alt="" />
            <p>No-hassle best price guarantee</p>
          </div>
        </div>
      </div>

      {apiData.google_map && (
        <p
          ref={LocationShareRef}
          className="font-semibold mt-8 md:mt-10 text-lg "
        >
          Location
        </p>
      )}

      <div
        ref={reviewRef}
        className="mt-2 overflow-hidden w-full object-cover  "
        dangerouslySetInnerHTML={{ __html: map }}
      />

      <div className="mt-8 md:mt-10  lg:hidden">
        <div className="flex flex-wrap flex-col justify-start ">
          {/* <p className="font-semibold text-xl md:text-2xl">
                    <span className="border-l-8 border-[#0E598F] me-4"></span>{" "}
                    Client's Review
                  </p> */}
          <div className="flex gap-2 ">
            <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
            <p className="font-semibold text-2xl  text-[#11142D]">
              Client's Review
            </p>
          </div>

          <div className="border border-gray-500 flex lg:hidden flex-col gap-2 rounded-xl ps-5 pe-3 py-3 mt-5">
            <div className="flex ">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  disabled={!userDetails}
                  key={star}
                  type="button"
                  className={`w-8 text-2xl h-8 flex  rounded-full ${
                    star <= (hover || rating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)} // Set rating on click
                  onMouseEnter={() => setHover(star)} // Highlight stars on hover
                  onMouseLeave={() => setHover(0)} // Reset hover effect
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              name="Review"
              disabled={!userDetails}
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
              placeholder="Write a Review"
              className="w-full resize-none bg-white h-fit mt-3 placeholder-black text-wrap border-none outline-none"
            />
            <button
              disabled={!userDetails}
              onClick={onClickPostReview}
              className="bg-sky-800 transition-all duration-500 hover:bg-sky-900 text-white rounded-full w-fit h-fit py-1 px-8 "
            >
              Post
            </button>
          </div>

          {!userDetails && (
            <p className="text-red-500 mt-1 lg:hidden">
              Please{" "}
              <button
                onClick={handleLoginClickForAddReview}
                className="cursor-pointer underline"
              >
                login{" "}
              </button>
              {"  "} to add review
            </p>
          )}

          {/* <div className="mt-5 border-4 h-36 w-36 flex flex-col justify-center items-center border-sky-800 rounded-full">
                    <p className="text-sm">Overall Ratings</p>
                    <p className="text-sm">
                      {apiData.average_rating}
                      <span className="ms-1">Out of 5</span>{" "}
                    </p>
                  </div> */}

          {apiData?.reviews?.length > 0 && (
            <div className="mt-5 overflow-y-auto">
              <div className="flex flex-col-reverse gap-5">
                {currentReviews.map((item, index) => (
                  <div key={index} className=" bg-gray-100 p-4 rounded-lg">
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1 items-center">
                        {Array(item.rating)
                          .fill(null)
                          .map((_, i) => (
                            <img
                              key={i}
                              src={star}
                              alt="Star"
                              className="w-4 md:w-5"
                            />
                          ))}
                      </div>

                      <p
                        className="text-gray-600 text-sm md:text-base"
                        dangerouslySetInnerHTML={{
                          __html: item.comment,
                        }}
                      />

                      <p className="text-gray-500 text-xs md:text-sm">
                        {item.date}
                      </p>

                      <hr className="border-black/20 w-full" />

                      <div className="flex items-center gap-3">
                        <img
                          // src={`https://backoffice.innerpece.com/${item.profile_image}`}
                          // src={`${
                          //   item.profile_image
                          //     ? "https://backoffice.innerpece.com/${item.profile_image"
                          //     : default_user_image2
                          // }`}

                          src={`${
                            item.profile_image
                              ? `https://backoffice.innerpece.com/${item.profile_image}`
                              : default_user_image2
                          }`}
                          alt="Profile"
                          className="w-[40px] h-[40px] object-cover rounded-full border-2 border-gray-300"
                        />
                        <p className="font-medium text-gray-800">
                          {item.first_name} {item.last_name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center mt-5 gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {loginCliked && (
        <div className="fixed inset-0 z-10 flex items-center bg-black/10 justify-center backdrop-blur overflow-y-auto overflow-x-hidden">
          <div className="flex items-center justify-center  bg-white">
            <div className="w-screen   md:w-[70vw] py-3  lg:w-[60vw]  shadow-2xl  shadow-black/30 rounded-md">
              <button
                onClick={() => setLoginClicked(false)}
                className="text-gray-500 w-full pe-5  font-extrabold text-xl hover:text-gray-700 focus:outline-none placeholder:text-gray-600 placeholder:text-sm flex justify-end"
              >
                ✕
              </button>
              <div className="flex justify-start gap-2 md:gap-5 lg:gap-8 h-full w-full px-2 md:px-4 py-4">
                <div className=' bg-[url("././assets/login_image.png")] max-sm:hidden  w-1/5  md:w-1/3 flex-shrink bg-cover  bg-center bg-no-repeat'></div>

                <div className="w-full md:w-2/5 flex-grow flex-shrink">
                  <div className="flex flex-col gap-2">
                    <p className="text-xl md:text-2xl lg:text-3xl font-semibold">
                      Log In To Get Started
                    </p>

                    <div className="flex flex-col flex-wrap lg:flex-row justify-between gap-5 mt-5">
                      <div className="flex flex-col flex-grow gap-2">
                        <label htmlFor="loginEmail" className="font-semibold">
                          Email
                        </label>
                        <input
                          type="text"
                          name="loginEmail"
                          id="loginEmail"
                          value={loginEmail}
                          autoComplete="off"
                          onChange={onChangeInput}
                          className="border-2 border-gray-300 outline-none p-2 rounded-md"
                          placeholder="Enter your Email"
                        />
                        {loginError.email && (
                          <p className="text-red-500 text-xs sm:text-sm ">
                            {loginError.email}
                          </p>
                        )}

                        {loginError.error && (
                          <p className="text-red-500 text-xs sm:text-sm ">
                            {loginError.error}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col mt-5 gap-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="font-semibold">
                          Your Password
                        </label>
                        {/* <p className="text-red-400 cursor-pointer text-xs md:text-sm font-semibold">
                    Forgot Password?
                  </p> */}
                      </div>
                      <input
                        onFocus={(e) => (e.target.type = "text")}
                        onBlur={(e) => (e.target.type = "password")}
                        type="loginPassword"
                        id="loginPassword"
                        name="loginPassword"
                        value={loginPassword}
                        onChange={onChangeInput}
                        autoComplete="off"
                        placeholder="Enter your Password"
                        className="border-2  border-gray-300 outline-none p-2 rounded-md"
                      />
                      {loginError.password && (
                        <p className="text-red-500 text-xs sm:text-sm ">
                          {loginError.password}
                        </p>
                      )}

                      {loginError.error === "Incorrect password" && (
                        <p className="text-red-500 text-xs sm:text-sm ">
                          {loginError.error}
                        </p>
                      )}
                    </div>

                    <div className="recaptacha-login  mt-5 ">
                      <ReCAPTCHA
                        sitekey="6LfDSrsqAAAAAI2jP2tOdr2l4VkiztyX2S2H0Fxg"
                        onChange={handleCaptchaChange}
                      />
                    </div>

                    {/* <button
                      disabled={!captchaValue}
                      onClick={onClickSignIn}
                      className={`${
                        !captchaValue ? "bg-gray-400" : "bg-sky-800"
                      } transition-all duration-300  p-3 mt-2 rounded-md text-white`}
                    >
                      Sign In
                    </button> */}
                    <button
                      disabled={!captchaValue || signInLoader}
                      onClick={onClickSignIn}
                      className={`${
                        !captchaValue ? "bg-gray-400" : "bg-sky-800"
                      } transition-all duration-300 w-full p-3 mt-2 rounded-md text-white`}
                    >
                      {signInLoader ? (
                        <div className="flex justify-center items-center">
                          <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        </div>
                      ) : (
                        "Log In"
                      )}
                    </button>

                    <button
                      onClick={() => login()}
                      className="flex items-center justify-center gap-3 px-6 py-3 bg-white shadow-md rounded-lg border hover:bg-gray-50 transition"
                    >
                      <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google Logo"
                        className="w-5 h-5"
                      />
                      <span className="text-gray-700 font-medium">
                        Continue with Google
                      </span>
                    </button>

                    <div className="flex items-center flex-wrap mt-5 mb-5 gap-2 ">
                      <p>Don't you have an account?</p>
                      <button
                        onClick={onClickBtn}
                        className="bg-sky-800 px-3 py-1 cursor-pointer  text-white rounded"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {show && (
        <div className="fixed inset-0 z-50 flex items-center bg-black/10 justify-center backdrop-blur overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg max-w-full w-[100%] sm:w-[80%] h-screen  sm:max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleClose}
              className="text-gray-500 w-full pe-5 pt-3 font-extrabold text-xl hover:text-gray-700 focus:outline-none placeholder:text-gray-600 placeholder:text-sm flex justify-end"
            >
              ✕
            </button>
            {/* Modal Header */}
            <div className="flex  p-6 border-b">
              {/* Image Section */}
              <div className="flex flex-col-reverse md:flex-row w-full gap-8  ">
                {/* <img
                  className="md:w-1/2 h-40  object-cover rounded-lg"
                  src={
                    apiData.gallery_img && apiData.gallery_img[0]
                      ? `https://backoffice.innerpece.com/${apiData.gallery_img[0]}`
                      : defaultimg
                  }
                  alt=""
                /> */}

                <div className="relative w-full h-52 md:w-1/2 overflow-hidden">
                  {homeImage?.map((image, index) => (
                    <div
                      key={image.id}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentIndex ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <img
                        className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
                        src={`https://backoffice.innerpece.com/${image}`}
                        alt={image.slider_name}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                <div className="h-fit flex gap-3 flex-col">
                  <h1 className=" text-lg md:text-xl font-semibold">
                    {apiData.title}
                  </h1>

                  {slicedUserId ? (
                    <div className="flex items-center gap-5">
                      <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">
                        Total Amount
                      </p>
                      <p className="text-xl font-bold text-green-800 tracking-tight">
                        {/* ₹{apiData?.pricing_calculator?.stayTotal} */}₹{" "}
                        {Number(
                          apiData?.pricing_calculator?.grand_total
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ) : (
                    <p>
                      {selectedPackage} :{" "}
                      <span className="font-semibold text-xl lg:text-2xl text-green-800">
                        ₹ {Number(priceSelected).toLocaleString("en-IN")}
                      </span>{" "}
                    </p>
                  )}

                  {/* <p> ₹{apiData?.pricing_calculator?.stayTotal}</p> */}
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-5">
                {/* Form Section */}
                <div className="w-full">
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    autoComplete="off"
                  >
                    <div className="flex flex-col gap-4">
                      {/* name and email */}
                      <div className="flex gap-4 w-full flex-col sm:flex-row">
                        {/* Name Input */}
                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <IoIosContact />
                            </span>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              placeholder="Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          {errors.name && (
                            <p className="text-red-500 text-xs">
                              {errors.name[0]}
                            </p>
                          )}
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <AiOutlineMail />
                            </span>
                            <input
                              type="email"
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              placeholder="Email"
                              id="email"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          {errors.email && (
                            <p className="text-red-500 text-xs ">
                              {errors.email[0]}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* phone and residence location */}
                      <div className="flex gap-4 w-full flex-col sm:flex-row">
                        {/* Phone Input */}
                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <MdOutlinePhone />
                            </span>
                            <input
                              type="text"
                              inputMode="numeric" // shows numeric keypad on mobile
                              maxLength={10}
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              placeholder="Phone"
                              id="phone"
                              name="phone"
                              value={phone}
                              // onChange={(e) => setPhone(e.target.value)}
                              onChange={(e) => {
                                const value = e.target.value;

                                // allow only digits and limit length
                                if (/^\d{0,10}$/.test(value)) {
                                  setPhone(value);
                                }
                              }}
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-red-500 text-xs">
                              {errors.phone[0]}
                            </p>
                          )}
                        </div>

                        {/* your residence location */}
                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <FaLocationDot />
                            </span>
                            <input
                              type="text"
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              placeholder="Your Residence Location"
                              id="Your Residence Location"
                              name="Your Residence Location"
                              value={yourResidenceLocation}
                              onChange={(e) =>
                                setYourResidenceLocation(e.target.value)
                              }
                            />
                          </div>
                          {errors.location && (
                            <p className="text-red-500 text-xs">
                              {errors.location[0]}
                            </p>
                          )}
                        </div>
                      </div>

                      {/*influencer id*/}
                      {reference_id && (
                        <div className="flex flex-col">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <MdEmojiPeople />
                            </span>
                            <input
                              readOnly
                              className="w-full text-gray-800 p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              id="How Many Days"
                              name="How Many Days"
                              value={reference_id}
                            />
                          </div>
                        </div>
                      )}

                      {/*travel destination & dob*/}
                      <div className="flex gap-4 w-full flex-col sm:flex-row">
                        {/*travel destination*/}
                        <div className="flex flex-col sm:w-1/2 md:w-full lg:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <LiaPlaceOfWorshipSolid />
                            </span>
                            <input
                              type="text"
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              placeholder="Travel Destination"
                              id="Travel Destination"
                              name="Travel Destination"
                              value={apiData.title}
                            />
                          </div>
                          {errors.travel_destination && (
                            <p className="text-red-500 text-xs">
                              {errors.travel_destination[0]}
                            </p>
                          )}
                        </div>

                        {/* DOB Input */}
                        <div className="flex flex-col sm:w-1/2 md:w-full lg:w-1/2">
                          <div className="relative flex items-center border rounded-md w-full">
                            {/* Left Icon */}
                            <span className="p-2">
                              <FaBirthdayCake />
                            </span>

                            {/* Datepicker Input */}
                            <DatePicker
                              selected={dob}
                              onChange={(date) => setDob(date)}
                              placeholderText="Select DOB"
                              className="w-full border-l p-2 rounded-e-md focus:outline-none placeholder:text-gray-600 placeholder:text-sm"
                            />

                            {/* Right Icon */}
                            <span className="absolute right-2 text-gray-500 pointer-events-none">
                              <IoCalendarNumberSharp />
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* engagement date & *how many days */}
                      <div className="flex gap-4 w-full flex-col sm:flex-row">
                        {/* engagement date */}
                        <div className="flex flex-col sm:w-1/2 md:w-full lg:w-1/2">
                          <div className="relative flex items-center border rounded-md w-full">
                            {/* Left Icon */}
                            <span className="p-2">
                              <GiLovers />
                            </span>

                            {/* Datepicker Input */}
                            {/* <DatePicker
                              selected={engagementDate}
                              onChange={(date) => setEngagementDate(date)}
                              placeholderText="Select Engagement date"
                              className="w-full border-l p-2 rounded-e-md focus:outline-none placeholder:text-gray-600 placeholder:text-sm"
                            /> */}

                            <CustomDatePicker
                              value={engagementDate}
                              onChange={setEngagementDate}
                              placeholder="Select engagement date"
                            />

                            {/* Right Icon */}
                            <span className="absolute right-2 text-gray-500 pointer-events-none">
                              <IoCalendarNumberSharp />
                            </span>
                          </div>
                        </div>

                        {/*how many days*/}
                        <div className="flex flex-col sm:w-1/2 md:w-full lg:w-1/2 ">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <FaCalendarDays />
                            </span>
                            <input
                              type="text"
                              inputMode="numeric" // shows numeric keypad on mobile
                              maxLength={10}
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              placeholder="Number of days you would like to travel"
                              id="Number of days you would like to travel"
                              name="Number of days you would like to travel"
                              value={howManyDays}
                              // onChange={(e) => setHowManyDays(e.target.value)}
                              onChange={(e) => {
                                const value = e.target.value;

                                // allow only digits and limit length
                                if (/^\d{0,10}$/.test(value)) {
                                  setHowManyDays(value);
                                }
                              }}
                            />
                          </div>
                          {errors.days && (
                            <p className="text-red-500 text-xs">
                              {errors.days[0]}
                            </p>
                          )}
                        </div>
                      </div>

                      {/*total count & male count*/}
                      <div className="flex gap-4 w-full flex-col sm:flex-row">
                        {/*total count*/}
                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <FaPeopleLine />
                            </span>
                            <input
                              type="text"
                              inputMode="numeric" // shows numeric keypad on mobile
                              maxLength={10}
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              placeholder="Total Count"
                              id="Total Count"
                              name="Total Count"
                              value={totalCount}
                              // onChange={(e) => setTotalCount(e.target.value)}
                              onChange={(e) => {
                                const value = e.target.value;

                                // allow only digits and limit length
                                if (/^\d{0,10}$/.test(value)) {
                                  setTotalCount(value);
                                }
                              }}
                            />
                          </div>
                          {errors.total_count && (
                            <p className="text-red-500 text-xs">
                              {errors.total_count[0]}
                            </p>
                          )}
                        </div>

                        {/* male count */}
                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <FaMale />
                            </span>
                            <input
                              type="text"
                              inputMode="numeric" // shows numeric keypad on mobile
                              maxLength={10}
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              placeholder="Male Count"
                              id="Male Count"
                              name="Male Count"
                              value={maleCount}
                              // onChange={(e) => setMaleCount(e.target.value)}
                              onChange={(e) => {
                                const value = e.target.value;

                                // allow only digits and limit length
                                if (/^\d{0,10}$/.test(value)) {
                                  setMaleCount(value);
                                }
                              }}
                            />
                          </div>
                          {errors.male_count && (
                            <p className="text-red-500 text-xs">
                              {errors.male_count[0]}
                            </p>
                          )}
                        </div>
                      </div>

                      {/*female  count & child count*/}
                      <div className="flex gap-4 w-full flex-col  sm:flex-row">
                        {/*female count*/}
                        <div className="flex flex-col sm:w-1/2 ">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <FaFemale />
                            </span>
                            <input
                              type="text"
                              inputMode="numeric" // shows numeric keypad on mobile
                              maxLength={10}
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              placeholder="Female Count"
                              id="Female Count"
                              name="Female Count"
                              value={femaleCount}
                              // onChange={(e) => setFemaleCount(e.target.value)}
                              onChange={(e) => {
                                const value = e.target.value;

                                // allow only digits and limit length
                                if (/^\d{0,10}$/.test(value)) {
                                  setFemaleCount(value);
                                }
                              }}
                            />
                          </div>
                          {errors.female_count && (
                            <p className="text-red-500 text-xs">
                              {errors.female_count[0]}
                            </p>
                          )}
                        </div>

                        {/*Child count*/}
                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <FaChildReaching />
                            </span>
                            <input
                              type="text"
                              inputMode="numeric" // shows numeric keypad on mobile
                              maxLength={1}
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              placeholder="Child Count"
                              id="Child Count"
                              name="Child Count"
                              value={childCount}
                              // onChange={(e) => setChildCount(e.target.value)}
                              onChange={(e) => {
                                const value = e.target.value;

                                // allow only digits and limit length
                                if (/^\d{0,10}$/.test(value)) {
                                  setChildCount(value);
                                }
                              }}
                            />
                          </div>
                          {errors.child_count && (
                            <p className="text-red-500 text-xs">
                              {errors.child_count[0]}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* child age based on child count */}
                      {childCount > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {Array(Number(childCount))
                            .fill(null)
                            .map((item, index) => (
                              <div className="grid grid-row-1 md:grid-row-3 ">
                                <div className="flex items-center w-full border rounded-xl">
                                  <span className="p-2">
                                    <FaChild />
                                  </span>
                                  {/* <input
                                    id="number"
                                    name="number"
                                    type="number"
                                    placeholder={` ${index + 1}st Child Age`}
                                    className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                                    onChange={(e) =>
                                      onChangeChildAge(
                                        e,
                                        ` ${index + 1}st_Child_Age`,
                                        index
                                      )
                                    }
                                  /> */}
                                  <input
                                    type="text"
                                    inputMode="numeric" // shows numeric keypad on mobile
                                    maxLength={10}
                                    min={0}
                                    className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    placeholder={` ${index + 1}st Child Age`}
                                    value={childAge[index] || ""} // ✅ Controlled input
                                    onChange={(e) =>
                                      onChangeChildAge(
                                        e,
                                        `${index + 1}st_Child_Age`,
                                        index
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            ))}
                        </div>
                      )}

                      {errors.child_age && (
                        <p className="text-red-500 text-xs">
                          {errors.child_age[0]}
                        </p>
                      )}

                      <div className="flex gap-4 w-full flex-col sm:flex-row">
                        {/*travel date*/}
                        <div className="flex flex-col sm:w-1/2">
                          <div className="relative flex items-center border rounded-md w-full">
                            {/* Left Icon */}
                            <span className="p-2">
                              <MdOutlineCalendarMonth />
                            </span>

                            <CustomDatePicker
                              value={travelDate}
                              onChange={setTravelDate}
                              placeholder="Select travel start date"
                              pastDateRestrict={true}
                            />

                            {/* Right Icon */}
                            <span className="absolute right-2 text-gray-500 pointer-events-none">
                              <IoCalendarNumberSharp />
                            </span>
                          </div>
                          {errors.travel_date && (
                            <p className="text-red-500 text-xs">
                              {errors.travel_date[0]}
                            </p>
                          )}
                        </div>

                        {/*travel end date*/}
                        <div className="flex flex-col sm:w-1/2">
                          <div className="relative flex items-center border rounded-md w-full">
                            {/* Left Icon */}
                            <span className="p-2">
                              <MdOutlineCalendarMonth />
                            </span>

                            <CustomDatePicker
                              value={travelEndDate}
                              onChange={setTravelEndDate}
                              placeholder="Select travel end date"
                              pastDateRestrict={true}
                            />

                            {/* Right Icon */}
                            <span className="absolute right-2 text-gray-500 pointer-events-none">
                              <IoCalendarNumberSharp />
                            </span>
                          </div>
                          {errors.travel_enddate && (
                            <p className="text-red-500 text-xs">
                              {errors.travel_enddate[0]}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 w-full flex-col sm:flex-row">
                        {/*Cab Need*/}
                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2 ">
                              <FaCar />
                            </span>
                            <label className="border-l text-black p-2">
                              Cab Needed
                            </label>

                            <div className="flex gap-1 p-2 ms-3">
                              <input
                                type="radio"
                                name="cab_need"
                                id="yes"
                                value="yes"
                                checked={isCabNeed === "yes"}
                                onChange={(e) => setIsCabNeed(e.target.value)}
                              />
                              <label htmlFor="yes">Yes</label>
                            </div>
                            <div className="flex gap-1 p-2">
                              <input
                                type="radio"
                                name="cab_need"
                                id="no"
                                value="no"
                                checked={isCabNeed === "no"}
                                onChange={(e) => setIsCabNeed(e.target.value)}
                              />
                              <label htmlFor="no">No</label>
                            </div>
                          </div>
                          {errors?.cab_need && (
                            <p className="text-red-500 text-xs">
                              {errors.cab_need[0]}
                            </p>
                          )}
                        </div>

                        {/*how many rooms you need*/}
                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <FaHouse />
                            </span>
                            <input
                              type="text"
                              inputMode="numeric" // shows numeric keypad on mobile
                              maxLength={10}
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              placeholder="No of rooms required"
                              id="No of rooms required"
                              name="No of rooms required"
                              value={howManyRoomsYouNeed}
                              // onChange={(e) =>
                              //   setHowManyRoomsYouNeed(e.target.value)
                              // }
                              onChange={(e) => {
                                const value = e.target.value;

                                // allow only digits and limit length
                                if (/^\d{0,10}$/.test(value)) {
                                  setHowManyRoomsYouNeed(value);
                                }
                              }}
                            />
                          </div>
                          {errors.rooms_count && (
                            <p className="text-red-500 text-xs">
                              {errors.rooms_count[0]}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 w-full flex-col sm:flex-row">
                        {/* Comments Input */}
                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <BiMessageRoundedDots />
                            </span>
                            <textarea
                              className="w-full p-2 me-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm"
                              id="message"
                              name="message"
                              placeholder="Comments"
                              value={comments}
                              rows={1}
                              onChange={(e) => setCommends(e.target.value)}
                            ></textarea>
                          </div>
                          {errors.comments && (
                            <p className="text-red-500 text-xs ">
                              {errors.comments[0]}
                            </p>
                          )}
                        </div>

                        {/*price  */}
                        <div className="flex items-center h-fit border rounded-md sm:w-1/2">
                          <span className="p-2">
                            <FaPeopleLine />
                          </span>

                          {slicedUserId ? (
                            <div className="flex p-2 gap-2 border-l">
                              {/* <p>₹{apiData?.pricing_calculator?.stayTotal}</p> */}
                              <p>
                                ₹
                                {Number(
                                  apiData?.pricing_calculator?.grand_total
                                ).toLocaleString("en-IN")}
                              </p>

                              {/* ₹ {Number(priceSelected).toLocaleString("en-IN")} */}
                            </div>
                          ) : (
                            <div className="flex p-2 gap-2 border-l">
                              <p>{selectedPackage} :</p>
                              <p>
                                ₹{" "}
                                {Number(priceSelected).toLocaleString("en-IN")}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {success && (
                      <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
                        {success}
                      </div>
                    )}
                    {/* {loadingform && (
                      <div className="bg-orange-100  text-orange-700 p-2 rounded mb-4">
                        {loadingform}
                      </div>
                    )} */}
                    {failure && (
                      <div className="bg-red-100  text-red-700 p-2 rounded mb-4">
                        {failure}
                      </div>
                    )}

                    {/* Submit Button */}
                    {/* <div className="text-center mt-4">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                      >
                        Send me Details
                      </button>
                    </div> */}

                    <div className="text-center mt-4">
                      <button
                        type="submit"
                        disabled={loadingform}
                        className={`flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded transition-all duration-200 mx-auto ${
                          loadingform
                            ? "opacity-70 cursor-not-allowed"
                            : "hover:bg-blue-700"
                        }`}
                      >
                        {loadingform ? (
                          <>
                            <svg
                              className="w-5 h-5 animate-spin text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              ></path>
                            </svg>
                            <span>Sending...</span>
                          </>
                        ) : (
                          "Send me Details"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loginClikedForAddReview && (
        <div className="fixed inset-0 z-50 flex items-center bg-black/10 justify-center backdrop-blur overflow-y-auto overflow-x-hidden">
          <div className="flex items-center justify-center  bg-white">
            <div className="w-screen   md:w-[70vw] py-3  lg:w-[60vw]  shadow-2xl  shadow-black/30 rounded-md">
              <button
                onClick={() => setLoginClickedForAddReview(false)}
                className="text-gray-500 w-full pe-5  font-extrabold text-xl hover:text-gray-700 focus:outline-none placeholder:text-gray-600 placeholder:text-sm flex justify-end"
              >
                ✕
              </button>
              <div className="flex justify-start gap-2 md:gap-5 lg:gap-8 h-full w-full px-2 md:px-4 py-4">
                <div className=' bg-[url("././assets/login_image.png")] max-sm:hidden  w-1/5  md:w-1/3 flex-shrink bg-cover  bg-center bg-no-repeat'></div>

                <div className="w-full md:w-2/5 flex-grow flex-shrink">
                  <div className="flex flex-col gap-2">
                    <p className="text-xl md:text-2xl lg:text-3xl font-semibold">
                      Log In To Get Started
                    </p>

                    <div className="flex flex-col flex-wrap lg:flex-row justify-between gap-5 mt-5">
                      <div className="flex flex-col flex-grow gap-2">
                        <label htmlFor="loginEmail" className="font-semibold">
                          Email
                        </label>
                        <input
                          type="text"
                          name="loginEmail"
                          id="loginEmail"
                          value={loginEmail}
                          autoComplete="off"
                          onChange={onChangeInput}
                          className="border-2 border-gray-300 outline-none p-2 rounded-md"
                          placeholder="Enter your Email"
                        />
                        {loginError.email && (
                          <p className="text-red-500 text-xs sm:text-sm ">
                            {loginError.email}
                          </p>
                        )}

                        {loginError.error === "Unauthorized User " && (
                          <p className="text-red-500 text-xs sm:text-sm ">
                            {loginError.error}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col mt-5 gap-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="font-semibold">
                          Your Password
                        </label>
                        {/* <p className="text-red-400 cursor-pointer text-xs md:text-sm font-semibold">
                          Forgot Password?
                        </p> */}
                      </div>
                      <input
                        onFocus={(e) => (e.target.type = "text")}
                        onBlur={(e) => (e.target.type = "password")}
                        type="loginPassword"
                        id="loginPassword"
                        name="loginPassword"
                        value={loginPassword}
                        onChange={onChangeInput}
                        autoComplete="off"
                        placeholder="Enter your Password"
                        className="border-2  border-gray-300 outline-none p-2 rounded-md"
                      />
                      {loginError.password && (
                        <p className="text-red-500 text-xs sm:text-sm ">
                          {loginError.password}
                        </p>
                      )}

                      {loginError.error === "Incorrect password" && (
                        <p className="text-red-500 text-xs sm:text-sm ">
                          {loginError.error}
                        </p>
                      )}
                    </div>

                    <div className="recaptacha-login  mt-5 ">
                      <ReCAPTCHA
                        sitekey="6LfDSrsqAAAAAI2jP2tOdr2l4VkiztyX2S2H0Fxg"
                        onChange={handleCaptchaChange}
                      />
                    </div>

                    <button
                      disabled={!captchaValue}
                      onClick={onClickSignIn}
                      className={`${
                        !captchaValue ? "bg-gray-400" : "bg-sky-800"
                      } transition-all duration-300  p-3 mt-2 rounded-md text-white`}
                    >
                      Log In
                    </button>

                    <button
                      onClick={() => login()}
                      className="flex items-center justify-center gap-3 px-6 py-3 bg-white shadow-md rounded-lg border hover:bg-gray-50 transition"
                    >
                      <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google Logo"
                        className="w-5 h-5"
                      />
                      <span className="text-gray-700 font-medium">
                        Continue with Google
                      </span>
                    </button>

                    <div className="flex items-center flex-wrap mt-5 mb-5 gap-2 ">
                      <p>Don't you have an account?</p>
                      <button
                        onClick={onClickBtn}
                        className="bg-sky-800 px-3 py-1 cursor-pointer  text-white rounded"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {pricingCalculatorClicked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          {/* Modal Container */}
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                Price Breakdown
              </h2>
              <button
                onClick={() => setPricingCalculatorClicked(false)}
                className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 bg-white">
              {/* {Object.entries(apiData.pricing_calculator).map(
                ([key, value]) => (
                  <>
                    {key !== "grandTotal" && (
                      <div
                        key={key}
                        className="flex justify-between items-center border-b border-gray-200 py-2 "
                      >
                        <span className="font-medium text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </span>
                        <span className="text-gray-900 font-semibold">
                          ₹{Number(value).toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                  </>
                )
              )} */}

              <div className="flex justify-between items-center border-b border-gray-200 py-2 ">
                <span className="font-medium text-gray-600 capitalize">
                  Package pricing
                </span>
                <span className="text-gray-900 font-semibold">
                  ₹
                  {Number(
                    apiData?.pricing_calculator?.package_pricing
                  ).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="border-b border-gray-200 overflow-hidden bg-white">
                {/* Header (click to toggle) */}
                <div
                  onClick={() => setOpen(!open)}
                  className="flex justify-between items-center cursor-pointer py-3  transition-colors"
                >
                  <span className="font-medium text-gray-600 capitalize">
                    Pricing Calculator Price
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-900 font-semibold">
                      ₹
                      {Number(
                        Number(apiData.pricing_calculator.stayTotal) +
                          Number(apiData.pricing_calculator.activityTotal) +
                          Number(apiData.pricing_calculator.cabTotal)
                      ).toLocaleString("en-IN")}
                    </span>
                    <IoChevronDown
                      className={`text-gray-600 text-lg transform transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Dropdown content */}
                <div
                  className={`transition-all duration-500 ease-in-out bg-gray-50 px-4 overflow-hidden ${
                    open
                      ? "max-h-40 opacity-100 py-3"
                      : "max-h-0 opacity-0 py-0"
                  }`}
                >
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-700">
                      <span>Stay Total</span>
                      <span>
                        ₹
                        {Number(
                          apiData.pricing_calculator.stayTotal
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Activity Total</span>
                      <span>
                        ₹
                        {Number(
                          apiData.pricing_calculator.activityTotal
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Cab Total</span>
                      <span>
                        ₹
                        {Number(
                          apiData.pricing_calculator.cabTotal
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center border-b border-gray-200 py-2 ">
                <span className="font-medium text-gray-600 capitalize">
                  Service fee + tax ({apiData?.pricing_calculator?.tax_amount}%)
                </span>
                <span className="text-gray-900 font-semibold">
                  {/* ₹ */}
                  {/* {Number(Number(
                    apiData?.pricing_calculator?.service_fee
                  ).toLocaleString("en-IN")+Number(
                    apiData?.pricing_calculator?.tax_amount
                  ).toLocaleString("en-IN"))} */}
                  ₹
                  {(
                    Number(apiData?.pricing_calculator?.service_fee) +
                    ((Number(apiData?.pricing_calculator?.selected_value) +
                      Number(apiData?.pricing_calculator?.service_fee) +
                      Number(apiData?.pricing_calculator?.package_pricing)) *
                      Number(apiData?.pricing_calculator?.tax_amount)) /
                      100
                  ).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-gray-700 font-semibold text-lg">
                  Grand Total
                </p>
                <p className="text-blue-600 font-bold text-2xl">
                  {/* ₹{apiData.pricing_calculator.grandTotal} */}₹
                  {Number(
                    apiData.pricing_calculator.grand_total
                  ).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
