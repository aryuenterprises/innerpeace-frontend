import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { IoCalendarNumberSharp, IoHeartOutline } from "react-icons/io5";
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import locationimg from "../assets/location.png";
import "react-multi-carousel/lib/styles.css";
import Footer from "../components/Footer";
import { IoHeartSharp } from "react-icons/io5";
import Swal from "sweetalert2";
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
import { FaChildReaching } from "react-icons/fa6";
import { FaChild } from "react-icons/fa6";
import { FaBirthdayCake } from "react-icons/fa";
import { GiLovers } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import ReCAPTCHA from "react-google-recaptcha";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import customerservice from "../assets/customerservice.svg";
import approve from "../assets/approve.svg";
import insurance from "../assets/insurance.svg";
import pricetag from "../assets/pricetag.svg";
import { FaImage } from "react-icons/fa6";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import defaultimage from "../assets/defaultimg.png";
import default_user_image2 from "../assets/default_user_image_2.jpg";
import star from "../assets/star.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGoogleLogin } from "@react-oauth/google";

import TopHeader from "../components/TopHeader";

const StaysDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = window.location.href;
  const { id, title } = location.state || {};
  const [apiData, setApiData] = useState([]);
  const [rating, setRating] = useState(""); // Current rating
  const [hover, setHover] = useState(""); // Hovered rating
  const [userReview, setUserReview] = useState("");
  const [userDetails, setUserDetails] = useState(false);
  const [userId, setUserId] = useState();
  const [map, setMap] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [date, setDate] = useState(new Date());
  const [yearMonthDate, setYearMonthDate] = useState(new Date());
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
  const [howManyRoomsYouNeed, setHowManyRoomsYouNeed] = useState("");
  const [comments, setCommends] = useState("");
  const [reference_id, setReferenceId] = useState("");
  const [childCount, setChildCount] = useState("");
  const [childAge, setChildAge] = useState([]);
  const [loginCliked, setLoginClicked] = useState(false);
  const [image, setImage] = useState("");
  const [priceSelected, setPriceSelected] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [errors, setErrors] = useState({});
  const [checkinDate, setCheckinDate] = useState();
  const [checkoutDate, setCheckoutDate] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [failure, setFailure] = useState("");
  const [loadingform, setLoadingform] = useState("");
  const metaDescription = apiData?.data?.[0].stay_description || "";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookNowClicked, setBookNowClicked] = useState(false);
  const checkInDateInputRef = useRef(null);
  const checkOutDateInputRef = useRef(null);

  useEffect(() => {
    document.title = "Stays Details - Innerpece";
  }, []); // Empty dependency array ensures it runs once on mount

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === apiData?.data?.[0]?.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [apiData?.data?.[0]?.images.length]);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("loginDetails");
    const userDetails = storedUserDetails
      ? JSON.parse(storedUserDetails)
      : null;
    setUserDetails(userDetails);

    const storedUserId = localStorage.getItem("loginid");

    setUserId(userDetails?.id);

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

  const pathName = window.location.pathname;
  const slicedLocationName = pathName.split("/")[2];

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("loginDetails");
    const userDetails = storedUserDetails
      ? JSON.parse(storedUserDetails)
      : null;
    setUserDetails(userDetails);

    const fetchProgramData = async () => {
      try {
        const response = await axios.get(
          "https://backoffice.innerpece.com/api/v1/get-stay-details",
          {
            params: {
              program_id: id ? id : slicedLocationName,
              user_id: userDetails?.id,
            },
          }
        );

        setApiData(response.data);

        setIsWishlisted(response?.data?.wishlist);

        let modifiedMapHtml = response?.data?.data?.[0].stay_location;

        modifiedMapHtml = modifiedMapHtml
          .replace(/width="[^"]*"/g, "")
          .replace(/height="[^"]*"/g, "")
          .replace(/style="[^"]*"/g, "")
          .replace(
            /<iframe /,
            '<iframe style="border-radius: 1rem; width: 100%; height: 100%; border:0;" '
          );

        setMap(modifiedMapHtml);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProgramData();
  }, []);

  const handleWishlistClick = async () => {
    const loginDetails = JSON.parse(localStorage.getItem("loginDetails"));
    const token = localStorage.getItem("loginid");

    if (!loginDetails || !loginDetails.id) {
      console.error("User is not logged in");
      navigate("/login");
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
      return;
    }

    const { id: user_id } = loginDetails;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const data = {
      user_id: user_id,
      program_id: id,
      action: isWishlisted ? "remove" : "add",
    };

    try {
      const response = await axios.post(
        // "https://backoffice.innerpece.com/api/add-remove-wishlist",
        "https://backoffice.innerpece.com/api/add-remove-staywishlist",
        data,
        { headers }
      );
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error("An error occurred while updating wishlist:", error);
    }

    const fetchProgramData = async () => {
      const loginDetails = JSON.parse(localStorage.getItem("loginDetails"));
      const { id: user_id } = loginDetails;

      try {
        const response = await axios.get(
          "https://backoffice.innerpece.com/api/v1/get-stay-details",
          {
            params: {
              program_id: id,
              user_id: user_id,
            },
          }
        );
        setApiData(response.data);
        let modifiedMapHtml = response?.data?.data?.[0].stay_location;

        modifiedMapHtml = modifiedMapHtml
          .replace(/width="[^"]*"/g, "")
          .replace(/height="[^"]*"/g, "")
          .replace(/style="[^"]*"/g, "")
          .replace(
            /<iframe /,
            '<iframe style="border-radius: 1rem; width: 100%; height: 100%; border:0;" '
          );

        setMap(modifiedMapHtml);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProgramData();
  };

  const onClickPostReview = async () => {
    try {
      const authToken = userId;
      const storedUserId = localStorage.getItem("loginid");
      const response = await axios.post(
        "https://backoffice.innerpece.com/api/add_stay_review",
        // Body data
        {
          user_id: userDetails?.id,
          stag_id: id || slicedPathName, // Use logical OR
          review: userReview,
          rating: rating,
          created_by: userDetails?.id,
        },
        // Config
        {
          headers: {
            Authorization: `Bearer ${storedUserId}`,
          },
        }
      );

      const fetchProgramData = async () => {
        try {
          const response = await axios.get(
            "https://backoffice.innerpece.com/api/v1/get-stay-details",
            {
              params: {
                program_id: id,
              },
            }
          );
          setApiData(response.data);

          let modifiedMapHtml = response?.data?.data?.[0].stay_location;

          modifiedMapHtml = modifiedMapHtml
            .replace(/width="[^"]*"/g, "")
            .replace(/height="[^"]*"/g, "")
            .replace(/style="[^"]*"/g, "")
            .replace(
              /<iframe /,
              '<iframe style="border-radius: 1rem; width: 100%; height: 100%; border:0;" '
            );

          setMap(modifiedMapHtml);
        } catch (err) {
          console.log(err);
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

  const handleClose = () => {
    setFailure(false);
    setSuccess(false);
    setLoading(false);
    setShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setErrors({}); // Reset errors on submit
    setFailure("");
    setSuccess("");

    try {
      setLoadingform("Sending...");

      const authToken = userId; // Replace with the actual token

      const response = await axios.post(
        // "https://backoffice.innerpece.com/api/enquiry-form",
        "https://backoffice.innerpece.com/api/v1/store-stay-enquiry",
        {
          // name,
          // email,
          // phone,
          // location: yourResidenceLocation,
          // travel_destination: apiData.title,
          // engagement_date: engagementDate,
          // birth_date: dob,
          // days: howManyDays,
          // total_count: totalCount,
          // male_count: maleCount,
          // female_count: femaleCount,
          // child_count: childCount,
          // child_age: childAge,
          // checkin_date: checkinDate,
          // checkout_count: checkoutDate,
          // cab_need: isCabNeed,
          // comments,

          // rooms_count: howManyRoomsYouNeed,
          // travel_date: travelDate,

          // reference_id: reference_id,
          // program_title: apiData.title,

          // pricing: priceSelected,

          name,
          email,
          phone,
          location: yourResidenceLocation,
          stay_title: apiData?.data?.[0]?.stay_title,
          birth_date: dob,
          engagement_date: engagementDate,
          no_of_days: howManyDays,
          total_count: totalCount,
          male_count: maleCount,
          female_count: femaleCount,
          child_count: childCount,
          checkin_date: checkinDate,
          checkout_date: checkoutDate,
          cab: isCabNeed,
          price: apiData?.data?.[0]?.discount_price,
          comments: comments,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Add the token here
          },
        }
      );

      // Successful submission
      setLoadingform("");
      setFailure("");
      setSuccess(response.data.message);

      // Clear form values
      // setName("");
      // setPhone("");
      // setEmail("");
      setCommends("");
      setBudgetPerHead("");
      setIsCabNeed("");
      setHowManyDays("");
      // setYourResidenceLocation("");
      setHowManyRoomsYouNeed("");
      setTotalCount("");
      setTravelDate("");
      setTravelDestination("");
      setMaleCount("");
      setFemaleCount("");
      setChildCount("");
      setChildAge([]);
      setDob("");
      setEngagementDate("");

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess("");
        setShow(false);
      }, 3000); // 5000 ms = 5 seconds
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
      } = loggedUserDetails;

      setName(loggedUser_fistName + " " + loggedUser_lastName);
      setEmail(loggedUser_email);
      setPhone(loggedUser_phone);
      setYourResidenceLocation(loggedUser_city);
      setDob(loggedUser_dob);
    }
  }, []);

  const handleLoginClick = () => {
    setLoginClicked(true);
    setBookNowClicked(false);
  };

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginCheckboxChecked, setLoginCheckBoxChecked] = useState("");
  const [loginError, setLoginError] = useState({});
  const [signInLoader, setSignInLoader] = useState(false);

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

  const [captchaValue, setCaptchaValue] = useState(null);
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

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
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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

  const [seeAllImageModalOpen, setSeeAllImageModalOpen] = useState(false);
  const [currentIndex1, setCurrentIndex1] = useState(0);

  const openModal = (index = 0) => {
    setCurrentIndex1(index);
    setSeeAllImageModalOpen(true);
  };

  const closeModal = () => {
    setSeeAllImageModalOpen(false);
  };

  const [isFading, setIsFading] = useState(false);

  const goNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex1((prev) =>
        prev === apiData?.data?.[0]?.images?.length - 1 ? 0 : prev + 1
      );
      setIsFading(false);
    }, 300); // 300ms matches the fade duration
  };

  const goPrev = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex1((prev) =>
        prev === 0 ? apiData?.data?.[0]?.images?.length - 1 : prev - 1
      );
      setIsFading(false);
    }, 300);
  };

  // this will stop scroll when modal is open
  useEffect(() => {
    // Add or remove the 'overflow-hidden' class on the <body> based on modal state
    if (bookNowClicked || loginCliked || show || seeAllImageModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up on component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [bookNowClicked, loginCliked, show, seeAllImageModalOpen]);

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const totalReviews = apiData?.data?.[0]?.review.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = apiData?.data?.[0]?.review.slice(
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

  return (
    <div>
      {/* <TopHeader/> */}

      <Header />

      <div
        onClick={() => setBookNowClicked(!bookNowClicked)}
        className={`fixed md:hidden  px-5 py-2 shadow-2xl shadow-black bottom-0 w-full bg-white z-20 ${
          show ? "hidden" : "visible"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            {apiData?.data?.[0]?.actual_price && (
              <del className=" text-md text-[#7C7C7C]">
                ₹ {Number(apiData?.data?.[0]?.actual_price).toLocaleString()}
              </del>
            )}
            {apiData?.data?.[0]?.discount_price && (
              <p className="font-bold text-lg">
                ₹ {Number(apiData?.data?.[0]?.discount_price).toLocaleString()}
              </p>
            )}
          </div>

          <button
            onClick={() => setShow(!show)}
            disabled={!userDetails}
            className={`w-fit px-5 font-semibold text-white rounded-lg text-base py-2  transition-transform hover:scale-105 duration-300 ${
              userDetails ? "bg-[#004679]" : "bg-sky-300"
            }`}
          >
            Reserve
          </button>
        </div>

        {!userDetails && (
          <p className="text-sm text-red-500 mt-2">
            Please{" "}
            <span
              onClick={handleLoginClick}
              className="underline cursor-pointer"
            >
              login
            </span>{" "}
            to reserve
          </p>
        )}
      </div>

      <div className="mt-10 md:mt-20  mx-3 md:mx-10   xl:mx-20 ">
        {apiData?.data &&
          apiData.data.map((item, index) => (
            <div key={index}>
              <div className="flex flex-wrap flex-col items-start justify-between gap-2 sm:gap-5 md:gap-3">
                <p className="font-semibold text-2xl md:text-4xl">
                  {item.stay_title}
                </p>

                <div className="flex flex-wrap gap-5 justify-between w-full">
                  {item.destination && (
                    <div className="flex items-center  gap-1">
                      <img
                        src={locationimg}
                        alt=""
                        className="object-contain"
                      />

                      <p
                        className="text-gray-600"
                        dangerouslySetInnerHTML={{
                          __html: item.destination,
                        }}
                      />
                    </div>
                  )}

                  <div className="flex flex-row  flex-wrap md:flex-col gap-5 ">
                    <div className="flex flex-wrap items-center gap-2 md:gap-5">
                      <FacebookShareButton
                        url={currentUrl}
                        quote={metaDescription}
                        hashtag="#innerpece"
                      >
                        <div className="flex items-center cursor-pointer border-2 hover:bg-[#0965FE]  hover:border-white border-gray-400 text-gray-700 hover:text-white transition-all ease-in duration-200 rounded-full py-1 md:py-2 gap-2 px-3">
                          <FacebookIcon size={22} round={true} />
                          <p>Share</p>
                        </div>
                      </FacebookShareButton>

                      <LinkedinShareButton
                        url={currentUrl}
                        quote={metaDescription}
                        hashtag="#innerpece"
                      >
                        <div className="flex items-center cursor-pointer border-2 hover:bg-[#0077B5]  hover:border-white border-gray-400 text-gray-700 hover:text-white transition-all ease-in duration-200 rounded-full py-1 md:py-2 gap-2 px-3">
                          <LinkedinIcon size={22} round={true} />
                          <p>Share</p>
                        </div>
                      </LinkedinShareButton>

                      <WhatsappShareButton
                        url={currentUrl}
                        quote={metaDescription}
                        hashtag="#innerpece"
                      >
                        <div className="flex items-center cursor-pointer border-2 hover:bg-[#25D366]  hover:border-white border-gray-400 text-gray-700 hover:text-white transition-all ease-in duration-200 rounded-full py-1 md:py-2 gap-2 px-3">
                          <WhatsappIcon size={22} round={true} />
                          <p>Share</p>
                        </div>
                      </WhatsappShareButton>

                      {/* wishlist */}
                      <div
                        className="flex items-center cursor-pointer border-2 hover:bg-red-500  hover:border-white border-gray-400 text-gray-700 hover:text-white transition-all ease-in duration-200  rounded-full py-1 md:py-2 gap-2 px-3"
                        onClick={() => handleWishlistClick(id)}
                      >
                        {isWishlisted ? (
                          <IoHeartSharp className="text-red-300" />
                        ) : (
                          <IoHeartOutline />
                        )}
                        <p>WishList</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-5 mt-5 h-[60vh] max-md:hidden">
                {/* Left Large Image */}
                <img
                  src={`https://backoffice.innerpece.com/${item.images[0]}`}
                  alt=""
                  className="rounded-xl w-[60%] h-full object-cover"
                />

                {/* Right Grid of 4 Small Images */}
                <div className="w-[40%] grid grid-cols-2 grid-rows-2 gap-5">
                  {item.images.slice(1, 5).map((img, index) => (
                    <div
                      onClick={() => openModal(index + 1)}
                      key={index}
                      className="w-full h-full relative cursor-pointer "
                    >
                      <div className="bg-black/40 hover:bg-transparent transition-all duration-500 rounded-xl  absolute w-full h-full z-10"></div>
                      <img
                        src={`https://backoffice.innerpece.com/${img}`}
                        alt=""
                        className="rounded-xl w-full   h-full object-cover absolute"
                      />
                      {index === 3 && (
                        <div
                          onClick={() => openModal(index + 1)}
                          className="flex items-center gap-3 absolute bottom-2 right-2 z-10 bg-white rounded-full px-4 py-1"
                        >
                          <FaImage />
                          <p className="font-medium text-sm text-black text">
                            See All
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {apiData && apiData?.data?.[0].images.length > 0 && (
                <Carousel
                  swipeable={true}
                  draggable={true}
                  pauseOnHover={false}
                  responsive={{
                    mobile: {
                      breakpoint: { max: 768, min: 0 },
                      items: 1,
                    },
                  }}
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={5000}
                  arrows={true}
                  keyBoardControl={true}
                  transitionDuration={1000}
                  containerClass="carousel-container mx-auto z-0 w-full object-cover rounded-xl mt-5"
                  itemClass="carousel-item-padding-40-px block shadow-lg md:hidden   object-cover shadow-black/10 "
                >
                  {apiData?.data?.[0]?.images?.map((item, index) => (
                    <div key={item.id || index} className="overflow-hidden">
                      <img
                        src={
                          item
                            ? `https://backoffice.innerpece.com/${item}`
                            : defaultimage
                        }
                        alt={`Gallery Image ${index + 1}`}
                        className="h-[30vh]  lg:h-[440px] w-full object-cover "
                      />
                    </div>
                  ))}
                </Carousel>
              )}
            </div>
          ))}

        <div className="flex bg-[#FEFEFE] mt-8 md:mt-10 gap-8 md:gap-12  flex-col justify-between lg:flex-row bg-gray-50/10   items-start font-mulish">
          <div className="w-full md:basis-[45%] bg-[#FEFEFE] xl:basis-[55%] overflow-x-hidden font-mulish  flex-grow ">
            {apiData?.data?.[0].destination && (
              <p className="font-mulish font-bold text-[#11142D] text-2xl">
                {`Room in ${apiData?.data?.[0].destination}, India`}
              </p>
            )}

            {apiData?.data?.[0]?.tag_line && (
              <p className="font-mulish text-sm mt-1">
                {apiData?.data?.[0]?.tag_line}
              </p>
            )}

            <hr className="border-gray-200 mt-5 md:mt-10" />

            {apiData?.data?.[0]?.stay_description != "<p><br></p>" && (
              <div className="mt-8 md:mt-10">
                <div className="flex gap-2 mt-8 items-center">
                  <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
                  <p className="font-semibold font-mulish text-xl md:text-2xl  text-[#11142D]">
                    About this place
                  </p>
                </div>

                {
                  apiData?.data && (
                    // apiData.data.map((item, index) => (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: apiData?.data?.[0]?.stay_description,
                      }}
                      className="text-[#4B4B4B] font-mulish leading-7 mt-3 md:mt-5"
                    />
                  )
                  // ))
                }
                <hr className="border-gray-200 mt-5 md:mt-10" />
              </div>
            )}

            {apiData?.amenities?.length > 0 && (
              <div className="mt-8 md:mt-10">
                <div className="flex gap-2 mt-8 items-center">
                  <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
                  <p className="font-semibold font-mulish text-xl md:text-2xl  text-[#11142D]">
                    What this place offers
                  </p>
                </div>

                <div className="flex flex-wrap flex-col  mt-3 md:mt-5">
                  <div className="flex  flex-wrap gap-3 md:gap-5">
                    {apiData?.amenities?.map((item, index) => {
                      return (
                        <div className="flex gap-2 " key={index}>
                          <img
                            src={`https://backoffice.innerpece.com/${item.amenity_pic}`}
                            className="w-6 h-6 bg-cover md:w-7 md:h-7"
                          />
                          <p className="">{item.amenity_name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <hr className="border-gray-200 mt-5 md:mt-10" />
              </div>
            )}

            {apiData?.safety?.length > 0 && (
              <div className="mt-8 md:mt-10">
                <div className="flex gap-2 mt-8 items-center">
                  <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
                  <p className="font-semibold font-mulish text-xl md:text-2xl  text-[#11142D]">
                    Safety Features
                  </p>
                </div>

                <div className="flex flex-wrap flex-col  mt-3 md:mt-5">
                  <div className="flex  flex-wrap gap-3 md:gap-5">
                    {apiData?.safety?.map((item, index) => {
                      return (
                        <div className="flex gap-2 " key={index}>
                          <img
                            src={`https://backoffice.innerpece.com/${item.safety_features_pic}`}
                            className="w-6 h-6 bg-cover md:w-7 md:h-7"
                          />
                          <p className="">{item.safety_features}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <hr className="border-gray-200 mt-5 md:mt-10" />
              </div>
            )}

            {apiData?.data?.[0]?.stay_exclusive && (
              <div className="mt-8 md:mt-10">
                <div className="flex gap-2 mt-8 items-center">
                  <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
                  <p className="font-semibold font-mulish text-xl md:text-2xl  text-[#11142D]">
                    Stay Exclusion
                  </p>
                </div>

                <p
                  dangerouslySetInnerHTML={{
                    __html: apiData.data[0].stay_exclusive,
                  }}
                  className="text-[#4B4B4B] font-mulish leading-7 mt-3 md:mt-5"
                />
                <hr className="border-gray-200 mt-5 md:mt-10" />
              </div>
            )}

            {apiData?.data?.[0]?.stay_inclusive && (
              <div className="mt-8 md:mt-10">
                <div className="flex gap-2 mt-8 items-center">
                  <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
                  <p className="font-semibold font-mulish text-xl md:text-2xl  text-[#11142D]">
                    Stay Inclusion
                  </p>
                </div>

                <p
                  dangerouslySetInnerHTML={{
                    __html: apiData.data[0].stay_inclusive,
                  }}
                  className="text-[#4B4B4B] font-mulish leading-7 mt-3 md:mt-5"
                />
                <hr className="border-gray-200 mt-5 hidden sm:block md:mt-10" />
              </div>
            )}
          </div>

          <div
            className={` w-full overflow-y-auto  md:pb-10 lg:sticky top-5  sidebar bg-[#FEFEFE]  md:basis-[32%] xl:basis-[25%] flex-grow  md:mt-10                            `}
          >
            <div className="border border-[#E4E4E4] max-md:hidden shadow-xl mx-6 shadow-black/15 rounded-xl p-8">
              <div className="flex gap-5">
                <del className="font-mulish text-xl text-gray-500">
                  ₹{Number(apiData?.data?.[0]?.actual_price).toLocaleString()}
                </del>
                <p className="font-mulish font-semibold text-xl">
                  ₹{Number(apiData?.data?.[0]?.discount_price).toLocaleString()}
                </p>
              </div>

              <div className="border border-[#8C8C8C] rounded-xl mt-5 ">
                <div className="flex ">
                  <label
                    onClick={() => checkInDateInputRef.current?.showPicker()}
                    htmlFor="checkin"
                    className="flex flex-col  border-[#8C8C8C]   p-2 w-1/2 cursor-pointer"
                  >
                    <p className="font-mulish font-semibold text-sm">
                      CHECK-IN
                    </p>
                    <input
                      ref={checkInDateInputRef}
                      type="date"
                      value={checkinDate}
                      onChange={(e) => setCheckinDate(e.target.value)}
                      name=""
                      id="checkin"
                      className="border-none outline-none font-mulish text-[#4B4B4B]  font-medium"
                    />
                  </label>

                  <label
                    onClick={() => checkOutDateInputRef.current?.showPicker()} // Focus and open the picker
                    className="flex flex-col p-2 border-[#8C8C8C]  border-l w-1/2 cursor-pointer"
                  >
                    <p className="font-mulish font-semibold text-sm">
                      CHECK-OUT
                    </p>
                    <input
                      ref={checkOutDateInputRef}
                      value={checkoutDate}
                      onChange={(e) => setCheckoutDate(e.target.value)}
                      type="date"
                      className="border-none outline-none font-mulish text-[#4B4B4B] font-medium"
                    />
                  </label>
                </div>

                {/* <div className="flex flex-col p-2 pb-5">
                  <p className="font-mulish font-semibold text-sm">Guests</p>
                  <select
                    name=""
                    id=""
                    className="border-none outline-none font-mulish text-[#4B4B4B]  font-medium"
                  >
                    <option value="">1</option>
                    <option value="">1</option>
                    <option value="">1</option>
                    <option value="">1</option>
                    <option value="">1</option>
                    <option value="">1</option>
                    <option value="">1</option>
                    <option value="">1</option>
                  </select>
                </div> */}
              </div>

              <button
                onClick={() => setShow(!show)}
                className={`  text-white special_button cursor-pointer font-mulish font-medium text-sm w-full mt-5 px-2 py-3 rounded-xl`}
              >
                Reserve
              </button>

              {!userDetails && (
                <p className="text-sm text-center  text-blue-900 mt-2">
                  Please{" "}
                  <span
                    onClick={handleLoginClick}
                    className="underline text-red-500 text-lg font-semibold cursor-pointer"
                  >
                    Login
                  </span>{" "}
                  to reserve
                </p>
              )}
            </div>

            <div className="md:shadow-xl md:mx-6 md:mt-10  bg-white  border  md:shadow-black/15 rounded-xl p-3 sm:p-6 md:p-8">
              <div className="flex gap-4  ms-1 text-lg">
                <p className="text-sky-800">|</p>
                <p className="font-semibold">Book With Confidence</p>
              </div>

              <div className="flex flex-wrap  items-start mt-4 bg-white  justify-between md:flex-col    gap-y-4 gap-2">
                <div className="flex gap-2 sm:gap-4 items-center">
                  <img src={customerservice} alt="" />
                  <p>Customer care available 24/7</p>
                </div>

                <div className="flex gap-2 sm:gap-4 items-center">
                  <img src={approve} alt="" />
                  <p>Hand-picked Tours & Activities</p>
                </div>

                <div className="flex gap-2 sm:gap-4 items-center">
                  <img src={insurance} alt="" />
                  <p>Women-Friendly Environments</p>
                </div>

                <div className="flex gap-2 sm:gap-4 items-center">
                  <img src={pricetag} alt="" />
                  <p>No-hassle best price guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {map && (
            <div className="mt-8 md:mt-10">
              {/* <hr className="border-gray-400 mt-8 md:mt-10" /> */}

              <div className="flex gap-2 items-start">
                <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
                <div className="flex flex-col ">
                  <p className="font-jost font-medium text-xl   text-[#2D2D2D]">
                    Where you'll be
                  </p>
                  <p className="font-mulish text-sm  text-[#2D2D2D]">
                    {apiData?.data?.[0]?.destination}
                  </p>
                </div>
              </div>

              <div
                className=" overflow-hidden mt-3 md:mt-5  h-72 w-full object-cover  "
                dangerouslySetInnerHTML={{ __html: map }}
              />
            </div>
          )}

          <div className="mt-8 md:mt-10 ">
            <div className="flex flex-wrap flex-col justify-start ">
              <div className="flex gap-2 ">
                <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
                <p className="font-semibold text-2xl  text-[#11142D]">
                  Client's Review
                </p>
              </div>

              <div className="border  border-gray-500 flex  flex-col gap-2 rounded-xl ps-5 pe-3 py-3 mt-3 md:mt-5">
                <div className="flex ">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      // disabled={!userDetails}
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
                <p className="text-blue-900 text-sm mt-1 max-lg:hidden">
                  Please{" "}
                  <button
                    onClick={handleLoginClick}
                    className="cursor-pointer text-red-500 text-lg font-semibold underline"
                  >
                    Login{" "}
                  </button>
                  {"  "} to add review
                </p>
              )}

              {currentReviews?.length > 0 && (
                <div className="mt-5 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {currentReviews?.map((item, index) => (
                      <div key={index} className="bg-gray-100 p-4 rounded-xl">
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
                            dangerouslySetInnerHTML={{ __html: item.review }}
                          />

                          <p className="text-gray-500 text-xs md:text-sm">
                            {item.created_at.split("T")[0]}
                          </p>

                          <hr className="border-black/20 w-full" />

                          <div className="flex items-center gap-3">
                            <img
                              src={`${
                                item.user.profile_image
                                  ? `https://backoffice.innerpece.com/${item.user.profile_image}`
                                  : default_user_image2
                              }`}
                              alt="Profile"
                              className="w-[40px] h-[40px] object-cover rounded-full border-2 border-gray-300"
                            />
                            <p className="font-medium text-gray-800">
                              {item.user.first_name} {item.user.last_name}
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
        </div>
      </div>

      {show && (
        <div className="fixed inset-0 z-10 flex items-center bg-black/10 justify-center backdrop-blur overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-lg max-w-full w-[100%] sm:w-[80%] h-screen  sm:max-h-[90vh] overflow-y-auto">
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
                <div className="relative w-full h-52 md:w-1/2 overflow-hidden">
                  {apiData?.data &&
                    apiData?.data?.[0]?.images.map((image, index) => (
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
                    {apiData?.data?.[0]?.stay_title}
                  </h1>
                  <div className="flex gap-5">
                    {apiData?.data?.[0]?.actual_price && (
                      <del className=" text-xl text-[#7C7C7C]">
                        ₹{" "}
                        {Number(
                          apiData?.data?.[0]?.actual_price
                        ).toLocaleString()}
                      </del>
                    )}
                    {apiData?.data?.[0]?.discount_price && (
                      <p className="font-bold text-xl">
                        ₹{" "}
                        {Number(
                          apiData?.data?.[0]?.discount_price
                        ).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-5">
                {/* Form Section */}
                <div className="w-full">
                  <form onSubmit={handleSubmit} className="space-y-4">
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
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              placeholder="Phone"
                              id="phone"
                              name="phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
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

                      <div className="flex gap-4 w-full flex-col sm:flex-row">
                        {/*travel destination*/}
                        <div className="flex flex-col sm:w-1/2">
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
                              value={apiData?.data?.[0]?.stay_title}
                            />
                          </div>
                          {errors.travel_destination && (
                            <p className="text-red-500 text-xs">
                              {errors.travel_destination[0]}
                            </p>
                          )}
                        </div>

                        {/* DOB Input */}
                        <div className="flex flex-col sm:w-1/2 ">
                          {/* <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <FaBirthdayCake />
                            </span>
                            <input
                              autoComplete="on"
                              type="text"
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              placeholder="Select DOB"
                              id="dob"
                              name="dob"
                              value={dob}
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "text")}
                              onChange={(e) => setDob(e.target.value)}
                            />
                          </div> */}

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

                      <div className="flex gap-4 w-full flex-col sm:flex-row">
                        {/* engagement date */}
                        <div className="flex flex-col sm:w-1/2 ">
                          {/* <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <GiLovers />
                            </span>
                            <input
                              type="text"
                              className="w-full p-2 border-l h-10 focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              placeholder="Select Engagement Date"
                              id="engagement date"
                              name="engagement date"
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "text")}
                              value={engagementDate}
                              onChange={(e) =>
                                setEngagementDate(e.target.value)
                              }
                            />
                          </div> */}

                          <div className="relative flex items-center border rounded-md w-full">
                            {/* Left Icon */}
                            <span className="p-2">
                              <GiLovers />
                            </span>

                            {/* Datepicker Input */}
                            <DatePicker
                              selected={engagementDate}
                              onChange={(date) => setEngagementDate(date)}
                              placeholderText="Select Engagement Date"
                              className="w-full border-l p-2 rounded-e-md focus:outline-none placeholder:text-gray-600 placeholder:text-sm"
                            />

                            {/* Right Icon */}
                            <span className="absolute right-2 text-gray-500 pointer-events-none">
                              <IoCalendarNumberSharp />
                            </span>
                          </div>
                        </div>

                        {/*how many days*/}
                        <div className="flex flex-col sm:w-1/2 ">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <FaCalendarDays />
                            </span>
                            <input
                              type="number"
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              placeholder="Number of days you would like to travel"
                              id="Number of days you would like to travel"
                              name="Number of days you would like to travel"
                              value={howManyDays}
                              onChange={(e) => setHowManyDays(e.target.value)}
                            />
                          </div>
                          {errors.days && (
                            <p className="text-red-500 text-xs">
                              {errors.days[0]}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 w-full flex-col sm:flex-row">
                        {/*Budget Per Head */}
                        {/* <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <RiMoneyRupeeCircleFill />
                            </span>
                            <input
                              type="number"
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              placeholder="Budget Per Head"
                              id="Budget Per Head"
                              name="Budget Per Head"
                              value={budgetPerHead}
                              onChange={(e) => setBudgetPerHead(e.target.value)}
                            />
                          </div>
                          <p className="text-gray-500 text-xs">
                            Note : Excluding flight/train cost
                          </p>
                          {errors.budget_per_head && (
                            <p className="text-red-500 text-xs">
                              {errors.budget_per_head[0]}
                            </p>
                          )}
                        </div> */}

                        {/*total count*/}
                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <FaPeopleLine />
                            </span>
                            <input
                              type="number"
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              placeholder="Total Count"
                              id="Total Count"
                              name="Total Count"
                              value={totalCount}
                              onChange={(e) => setTotalCount(e.target.value)}
                            />
                          </div>
                          {errors.total_count && (
                            <p className="text-red-500 text-xs">
                              {errors.total_count[0]}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col sm:w-1/2">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <FaMale />
                            </span>
                            <input
                              type="number"
                              className="w-full p-2 border-l focus:outline-none me-2 placeholder:text-gray-600 placeholder:text-sm "
                              placeholder="Male Count"
                              id="Male Count"
                              name="Male Count"
                              value={maleCount}
                              onChange={(e) => setMaleCount(e.target.value)}
                            />
                          </div>
                          {errors.male_count && (
                            <p className="text-red-500 text-xs">
                              {errors.male_count[0]}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 w-full flex-col  sm:flex-row">
                        {/*male &  count*/}

                        <div className="flex flex-col sm:w-1/2 ">
                          <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <FaFemale />
                            </span>
                            <input
                              type="number"
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              placeholder="Female Count"
                              id="Female Count"
                              name="Female Count"
                              value={femaleCount}
                              onChange={(e) => setFemaleCount(e.target.value)}
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
                              type="number"
                              className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                              placeholder="Child Count"
                              id="Child Count"
                              name="Child Count"
                              value={childCount}
                              onChange={(e) => setChildCount(e.target.value)}
                            />
                          </div>
                          {errors.child_count && (
                            <p className="text-red-500 text-xs">
                              {errors.child_count[0]}
                            </p>
                          )}
                        </div>
                        {/* </div> */}
                        {/* </div> */}
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
                                  <input
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
                          {/* <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <MdOutlineCalendarMonth />
                            </span>
                            <input
                              type="text"
                              className="w-full p-2 border-l h-10 focus:outline-none placeholder:text-gray-600 text-black placeholder:text-sm me-2"
                              id="checkinDate"
                              name="checkinDate"
                              value={checkinDate}
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "text")}
                              placeholder="Select Checkin date"
                              onChange={(e) => setCheckinDate(e.target.value)}
                            />
                          </div> */}

                          <div className="relative flex items-center border rounded-md w-full">
                            {/* Left Icon */}
                            <span className="p-2">
                              <MdOutlineCalendarMonth />
                            </span>

                            {/* Datepicker Input */}
                            <DatePicker
                              selected={dob}
                              onChange={(date) => setCheckinDate(date)}
                              placeholderText="Select Checkout Date"
                              className="w-full border-l p-2 rounded-e-md focus:outline-none placeholder:text-gray-600 placeholder:text-sm"
                            />

                            {/* Right Icon */}
                            <span className="absolute right-2 text-gray-500 pointer-events-none">
                              <IoCalendarNumberSharp />
                            </span>
                          </div>
                          {errors.checkin_date && (
                            <p className="text-red-500 text-xs">
                              {errors.checkin_date[0]}
                            </p>
                          )}
                        </div>

                        {/*checkout data*/}
                        <div className="flex flex-col sm:w-1/2">
                          {/* <div className="flex items-center border rounded-md">
                            <span className="p-2">
                              <FaHouse />
                            </span>
                            <input
                              type="text"
                              className="w-full p-2 border-l h-10  focus:outline-none placeholder:text-gray-600 text-black placeholder:text-sm me-2"
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "text")}
                              placeholder="Select Checkout date"
                              id="checkoutDate"
                              name="checkoutDate"
                              value={checkoutDate}
                              onChange={(e) => setCheckoutDate(e.target.value)}
                            />
                          </div> */}

                          <div className="relative flex items-center border rounded-md w-full">
                            {/* Left Icon */}
                            <span className="p-2">
                              <FaHouse />
                            </span>

                            {/* Datepicker Input */}
                            <DatePicker
                              selected={checkoutDate}
                              onChange={(date) => setCheckoutDate(date)}
                              placeholderText="Select Checkout Date"
                              className="w-full border-l p-2 rounded-e-md focus:outline-none placeholder:text-gray-600 placeholder:text-sm"
                            />

                            {/* Right Icon */}
                            <span className="absolute right-2 text-gray-500 pointer-events-none">
                              <IoCalendarNumberSharp />
                            </span>
                          </div>
                          {errors.checkoutDate && (
                            <p className="text-red-500 text-xs">
                              {errors.checkoutDate[0]}
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
                      </div>

                      <div className="flex items-center border rounded-md">
                        <span className="p-2">
                          <FaPeopleLine />
                        </span>

                        <p className="border-l p-2">
                          ₹{" "}
                          {Number(
                            apiData?.data?.[0]?.discount_price
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {success && (
                      <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
                        {success}
                      </div>
                    )}
                    {loadingform && (
                      <div className="bg-orange-100  text-orange-700 p-2 rounded mb-4">
                        {loadingform}
                      </div>
                    )}
                    {failure && (
                      <div className="bg-red-100  text-red-700 p-2 rounded mb-4">
                        {failure}
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="text-center mt-4">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                      >
                        Send me Details
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loginCliked && (
        <div className="fixed inset-0 z-50 flex items-center bg-black/10 justify-center backdrop-blur overflow-y-auto overflow-x-hidden">
          <div className="flex items-center justify-center  bg-white">
            <div className="w-screen   md:w-[70vw] py-3  lg:w-[60vw]  shadow-2xl  shadow-black/30 rounded-md">
              <button
                onClick={() => {
                  setLoginClicked(false);
                  setBookNowClicked(false);
                }}
                className="text-gray-500 w-full pe-5 font-extrabold text-xl hover:text-gray-700 focus:outline-none placeholder:text-gray-600 placeholder:text-sm flex justify-end"
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
                        // onClick={onClickBtn}
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

      {seeAllImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xl">
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black"
          >
            <FaTimes size={20} />
          </button>

          {/* Arrows and Image */}
          <div className="relative flex items-center justify-center w-full">
            {/* Left arrow */}
            <button
              onClick={goPrev}
              className="absolute left-5 text-white bg-black/50 p-2 rounded-full hover:bg-black"
            >
              <FaChevronLeft size={24} />
            </button>

            {/* Current image */}
            <img
              src={`https://backoffice.innerpece.com/${apiData?.data?.[0]?.images[currentIndex1]}`}
              alt="modal-img"
              className={`w-[80vw] h-[80vh] object-cover rounded-xl  transition-opacity duration-500 ease-out ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Right arrow */}
            <button
              onClick={goNext}
              className="absolute right-5 text-white bg-black/50 p-2 rounded-full hover:bg-black"
            >
              <FaChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
      <Footer className="pb-20 md:pb-0" />
    </div>
  );
};

export default StaysDetails;
