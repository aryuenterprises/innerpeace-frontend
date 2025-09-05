import { lazy, Suspense } from "react";
let Header = lazy(() => import("../components/Header"));
let Featuredhero = lazy(() => import("../components/FeaturedHero"));
let Featured = lazy(() => import("../components/Featured"));
let TourDetailsTwoComponents = lazy(() =>
  import("../components/TourDetailsTwoComponents")
);
let Footer = lazy(() => import("../components/Footer"));
import { useRef, useEffect, useState } from "react";
import whatsapp from "../assets/whatsapp.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import telegram from "../assets/telegram.png";
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
import Swal from "sweetalert2";

function TourDetails() {
  useEffect(() => {
    document.title = "Tour Details - Innerpece";
  }, []); // Empty dependency array ensures it runs once on mount

  let highlightsRef = useRef(null);
  let informationRef = useRef(null);
  let TourPlanningRef = useRef(null);
  let LocationShareRef = useRef(null);
  let reviewRef = useRef(null);
  let dummyRef = useRef(null);

  const handlehighlightsScroll = () => {
    highlightsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleInformationScroll = () => {
    informationRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleTourPlanningScroll = () => {
    TourPlanningRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleLocationShareScroll = () => {
    LocationShareRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const reviewRefScroll = () => {
    reviewRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const [apiData, setApiData] = useState([]);
  const pathName = window.location.pathname;
  const slicedPathName = window.location.pathname.split("/")[1];
  const [signInLoader, setSignInLoader] = useState(false);
  const [userDetails, setUserDetails] = useState(false);
  const [userId, setUserId] = useState("");
  const [priceSelected, setPriceSelected] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [loginCliked, setLoginClicked] = useState(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [failure, setFailure] = useState("");
  const [homeImage, setHomeImage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState({});
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
  const [map, setMap] = useState("");
  const [loadingform, setLoadingform] = useState("");
  const [reference_id, setReferenceId] = useState("");
  const [childCount, setChildCount] = useState("");
  const [childAge, setChildAge] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === homeImage.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [homeImage.length]);

  const handleClose = () => {
    setFailure(false);
    setSuccess(false);
    setLoading(false);
    setShow(false);
  };

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("loginDetails");
    const userDetails = storedUserDetails
      ? JSON.parse(storedUserDetails)
      : null;
    setUserDetails(userDetails);

    setUserId(localStorage.getItem("loginid"));
  }, [loginCliked]);

  const slicedUserId = window.location.href.split("#")[1];

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const storedUserDetails = localStorage.getItem("loginDetails");

        const userDetails = storedUserDetails
          ? JSON.parse(storedUserDetails)
          : null;

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
        setHomeImage(response.data.data.gallery_img);
        setSelectedPackage(response.data.data.price_title[0]);
        setPriceSelected(response.data.data.price_amount[0]);
      } catch (err) {
        console.log(err.response.data.message);
        if ((err.status = 404)) {
          setApiError(err.response.data.message);
        }
      }
    };
    fetchProgramData();
  }, []);

  const [bookNowClicked, setBookNowClicked] = useState(false);

  const handleLoginClick = () => {
    setLoginClicked(true);
    setBookNowClicked(false);
  };

  const onChangePrice = (item, index) => {
    setSelectedPackage(item);
    setPriceSelected(apiData.price_amount[index]);
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
        "https://backoffice.innerpece.com/api/enquiry-form",
        {
          name,
          email,
          phone,
          comments,
          budget_per_head: budgetPerHead,
          cab_need: isCabNeed,
          days: howManyDays,
          location: yourResidenceLocation,
          rooms_count: howManyRoomsYouNeed,
          total_count: totalCount,
          travel_date: travelDate,
          travel_destination: apiData.title,
          male_count: maleCount,
          female_count: femaleCount,
          reference_id: reference_id,
          program_title: apiData.title,
          child_count: childCount,
          child_age: childAge,
          engagement_date: engagementDate,
          birth_date: dob,
          pricing: priceSelected,
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

      setBookNowClicked(false);
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

  const [captchaValue, setCaptchaValue] = useState(null);
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  // this will stop scroll when modal is open
  useEffect(() => {
    // Add or remove the 'overflow-hidden' class on the <body> based on modal state
    if (bookNowClicked || loginCliked) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up on component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [bookNowClicked, loginCliked]);

  return (
    <div className="bg-[#FEFEFE]">
      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }
      >
        {!apiError ? (
          <>
            {/* Floating Button */}
            {/* <div
              onClick={() => setBookNowClicked(!bookNowClicked)}
              className="fixed md:hidden flex items-center justify-center px-5 py-4 shadow-2xl shadow-black bottom-0 w-full bg-white z-20"
            >
              <button className="w-full font-semibold text-white rounded-lg text-base py-3 bg-gradient-to-r from-sky-600 to-sky-800 transition-transform hover:scale-105 duration-300">
                Book Now
              </button>
            </div> */}

            {/* Slide-Up Panel */}
     

      

            {loginCliked && (
              <div className="fixed inset-0 z-40 flex items-center bg-black/10 justify-center backdrop-blur overflow-y-auto overflow-x-hidden">
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
                              <label
                                htmlFor="loginEmail"
                                className="font-semibold"
                              >
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
                              <label
                                htmlFor="password"
                                className="font-semibold"
                              >
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

            <Header />
            <Featuredhero
              handlehighlightsScroll={handlehighlightsScroll}
              handleInformationScroll={handleInformationScroll}
              handleTourPlanningScroll={handleTourPlanningScroll}
              handleLocationShareScroll={handleLocationShareScroll}
              reviewRefScroll={reviewRefScroll}
            />
            <Featured />
            <TourDetailsTwoComponents
              highlightsRef={highlightsRef}
              LocationShareRef={LocationShareRef}
              informationRef={informationRef}
              TourPlanningRef={TourPlanningRef}
              reviewRef={reviewRef}
              dummyRef={dummyRef}
            />
            <Footer className="pb-36 md:pb-0" />
          </>
        ) : (
          <div className="flex flex-col gap-3 justify-center items-center h-screen">
            <p className="text-xl md:text-2xl lg:text-3xl">Package not found</p>

            <NavLink
              to="/"
              className="bg-blue-600 text-white px-5  py-2 rounded-lg font-semibold"
            >
              Go back
            </NavLink>
          </div>
        )}
      </Suspense>
    </div>
  );
}

export default TourDetails;