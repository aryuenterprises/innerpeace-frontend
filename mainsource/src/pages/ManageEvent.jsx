import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import { FaCalendar } from "react-icons/fa";
import { MdLocationOn, MdOutlineKeyboardArrowRight } from "react-icons/md";
import {
  FaShare,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaCopy,
  FaEnvelope,
} from "react-icons/fa";
import styled from "styled-components";
import Swal from "sweetalert2";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import defaultimg from "../assets/defaultimg.png";
import ReCAPTCHA from "react-google-recaptcha";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { useGoogleLogin } from "@react-oauth/google";
import GoToTop from "../components/GoToTop";
import Footer from "../components/Footer";
import {
  m,
  LazyMotion,
  domAnimation,
  motion,
  AnimatePresence,
} from "framer-motion";

const ManageEvent = () => {
  let navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [apiError, setApiError] = useState("");
  const [registeredGuestListData, setRegisteredGuestListData] = useState([]);
  const [eventStartDate, setEventStartDate] = useState();
  const [map, setMap] = useState("");
  const [
    clickHereToRegisterButtonClicked,
    setClickHereToRegisterButtonClicked,
  ] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [registeredUserIconClicked, setRegisteredUserIconClicked] =
    useState(false);
  const [copyLinkClicked, setCopyLinkClicked] = useState(false);
  const [userDetails, setUserDetails] = useState(false);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [eventRegisteringLoading, setEventRegisteringLoading] = useState(false);

  let slicedId = window.location.pathname.split("/")[2];
  const url = window.location.href; // current page URL

  // Styled button
  const StyledWrapper = styled.div`
    .btn-donate {
      cursor: pointer;
      padding: 0.6em 1.2em;
      min-width: 120px;
      font-size: 1rem;
      font-weight: 500;
      transition: 0.8s;
      background-size: 280% auto;
      background-image: linear-gradient(
        325deg,
        hsla(250, 100%, 56%, 1) 0%,
        hsla(194, 100%, 69%, 1) 55%,
        hsla(250, 100%, 56%, 1) 90%
      );
      border: none;
      border-radius: 0.5em;
      color: white;
      box-shadow: 0px 0px 20px rgba(71, 184, 255, 0.5),
        0px 5px 5px -1px rgba(58, 125, 233, 0.25);
    }
    .btn-donate:hover {
      background-position: right top;
    }
  `;

  // Fetch API data
  useEffect(() => {
    const storedUserDetails = localStorage.getItem("loginDetails");
    const userDetails1 = storedUserDetails
      ? JSON.parse(storedUserDetails)
      : null;
    setUserDetails(userDetails1);
    setUserId(localStorage.getItem("loginid"));

    setName(userDetails1?.first_name + userDetails1?.last_name);
    setEmail(userDetails1?.email);
    setPhone(userDetails1?.phone);

    const fetchApiData = async () => {
      try {
        let response = await axios.get(
          `https://backoffice.innerpece.com/api/v1/program-event-view/${slicedId}`,
          {
            params: {
              user_id: userDetails1?.id,
            },
          }
        );
        setLoading(false);

        setApiData(response?.data?.data?.programdetails);
        setEventStartDate(response?.data?.data?.programdetails?.start_datetime);
        let modifiedMapHtml = response?.data?.data?.programdetails.embed_map;
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
        setLoading(false);
      }
    };

    fetchApiData();
  }, []);

  // Fetch registered user data
  useEffect(() => {
    let fetchApiData = async () => {
      try {
        let response = await axios.get(
          `https://backoffice.innerpece.com/api/v1/program-registration/${slicedId}`
        );
        setRegisteredGuestListData(response.data.data.programdetails);
      } catch (err) {
        console.log(err);
      }
    };

    fetchApiData();
  }, []);

  // Format date
  const dateFormatter = (data) => {
    const date = new Date(data);
    const options = { month: "short", day: "numeric", weekday: "short" };
    return date.toLocaleDateString("en-US", options);
  };

  // Countdown
  useEffect(() => {
    if (!eventStartDate) return;
    const targetDate = new Date(eventStartDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft("Started");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft(`Starting in ${days}d ${hours}h ${minutes}m`);
    }, 1000);

    return () => clearInterval(interval);
  }, [eventStartDate]);

  // Copy link
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopyLinkClicked(true);
  };

  // this useeffect is used to stop background scroll when modals is open
  useEffect(() => {
    if (
      clickHereToRegisterButtonClicked ||
      registeredUserIconClicked ||
      isOpen
    ) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [clickHereToRegisterButtonClicked, registeredUserIconClicked, isOpen]);

  const registerForEventButtonClicked = async () => {
    setEventRegisteringLoading(true);

    let {
      anniversary_date,
      city,
      country,
      dob,
      email,
      email_verified,
      first_name,
      id,
      last_name,
      login_type,
      newsletter_sub,
      phone,
      preferred_lang,
      profile_image,
      state,
      street,
      terms_condition,
      zip_province_code,
    } = userDetails;

    let payload = { name, email, phone, event_id: slicedId, ...userDetails };

    try {
      let response = await axios.post(
        `https://backoffice.innerpece.com/api/v1/events-register`,
        payload
      );

      setEventRegisteringLoading(false);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registration completed successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        setClickHereToRegisterButtonClicked(false);
        window.location.reload();
      }, 2000);

      setApiError(" ");
    } catch (err) {
      setEventRegisteringLoading(false);

      console.log(err.response.data.errors);
    }
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

      setClickHereToRegisterButtonClicked(false);
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

  function onClickBtn() {
    navigate("/signup");
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

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

      // setTimeout(() => {
      //   navigate("/");
      // }, 2000);

      window.location.reload();
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

  const SkeletonLoader = () => (
    <div className="relative z-10 w-[90%] md:w-[85%] lg:w-[75%] mt-8 mb-10 bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-5 sm:p-8 animate-pulse">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Section */}
        <div className="flex flex-col gap-6 lg:w-1/2">
          <div className="w-full h-60 sm:h-72 md:h-80 bg-gray-300 rounded-2xl" />
          <div className="bg-white/70 p-4 rounded-xl shadow-sm">
            <div className="w-24 h-3 bg-gray-300 rounded mb-2" />
            <div className="w-40 h-4 bg-gray-300 rounded" />
          </div>
          <div className="bg-white/70 p-4 rounded-xl shadow-sm">
            <div className="w-20 h-3 bg-gray-300 rounded mb-2" />
            <div className="flex items-center mt-2 -space-x-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-300 border border-white"
                  />
                ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6 lg:w-1/2">
          <div className="w-3/4 h-7 bg-gray-300 rounded" />
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-6 h-6 bg-gray-300 rounded-full" />
            <div>
              <div className="w-32 h-3 bg-gray-300 rounded mb-2" />
              <div className="w-48 h-3 bg-gray-300 rounded" />
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-gray-300 rounded-full" />
            <div className="w-48 h-3 bg-gray-300 rounded" />
          </div>
          <div className="flex justify-end">
            <div className="w-28 h-8 bg-gray-300 rounded-xl" />
          </div>
          <div className="bg-white/70 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gray-200 p-3 w-28 h-4" />
            <div className="p-4">
              <div className="w-full h-3 bg-gray-300 rounded mb-3" />
              <div className="w-1/2 h-8 bg-gray-300 rounded mx-auto" />
            </div>
          </div>
          <div className="bg-white/70 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gray-200 p-3 w-32 h-4" />
            <div className="p-4 space-y-3">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="w-full h-3 bg-gray-300 rounded" />
                ))}
            </div>
          </div>
          <div className="overflow-hidden mt-3 md:mt-5 h-52 w-full rounded-xl bg-gray-300" />
        </div>
      </div>
    </div>
  );
  return (
    <div className="overflow-hidden">
      {/* <TopHeader /> */}
      <Header />

      <GoToTop />

      {/* breadcrumbs */}
      <div className="flex gap-1 sm:gap-2  px-2 py-0.5  items-center">
        <Link to="/">
          <p className="text-xs sm:text-sm">Home</p>
        </Link>
        <MdOutlineKeyboardArrowRight className="text-xl" />
        <p className="text-xs sm:text-sm">Events History</p>
        <MdOutlineKeyboardArrowRight className="text-xl" />
        <p className="text-blue-500 font-medium sm:font-semibold">
          Events Details
        </p>
      </div>

      <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center font-PlusJakartaSansMedium text-black/80">
        {/* Background animation */}
        <LazyMotion features={domAnimation}>
          <m.div
            className="absolute inset-0 h-full w-full will-change-transform"
            style={{
              background: `
          radial-gradient(circle at 20% 30%, #bae6fd, transparent 50%),
          radial-gradient(circle at 80% 20%, #3b82f6, transparent 40%),
          radial-gradient(circle at 30% 80%, #38bdf8, transparent 40%),
          radial-gradient(circle at 80% 80%, #fbcfe8, transparent 50%)
        `,
              backgroundBlendMode: "overlay",
              filter: "blur(120px)",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 6,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        </LazyMotion>

        {/* Main Card */}
        {loading ? (
          <SkeletonLoader />
        ) : (
          <div className="relative z-10 w-[90%] md:w-[85%] lg:w-[75%] mt-8 mb-10 bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-5 sm:p-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Left Section */}
              <div className="flex flex-col gap-6 lg:w-1/2">
                <img
                  className="w-full h-60 sm:h-72 md:h-80 rounded-2xl object-cover object-top shadow-lg"
                  src={`https://backoffice.innerpece.com/${apiData.cover_img}`}
                  alt="Event Cover"
                />

                <div className="bg-white/70 p-4 rounded-xl shadow-sm">
                  <p className="text-sm uppercase tracking-wide text-gray-500">
                    Hosted by
                  </p>
                  <p className="text-lg font-semibold mt-1">
                    {apiData.hosted_by}
                  </p>
                </div>

                {/* Registered Guests */}
                {registeredGuestListData.length > 0 && (
                  <div className="bg-white/70 p-4 rounded-xl shadow-sm">
                    <p className="font-medium">
                      {registeredGuestListData.length} Going
                    </p>
                    <div className="flex items-center mt-2 -space-x-2">
                      {registeredGuestListData
                        .slice(0, 5)
                        .map((item, index) => (
                          <div
                            key={index}
                            onClick={() => setRegisteredUserIconClicked(true)}
                            className="w-8 h-8 rounded-full cursor-pointer bg-gray-200 flex items-center justify-center border border-white"
                          >
                            <FaCircleUser className="text-xl text-gray-600" />
                          </div>
                        ))}
                      {registeredGuestListData.length > 5 && (
                        <p className="ml-2 text-sm text-gray-500">
                          +{registeredGuestListData.length - 5} more
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Section */}
              <div className="flex flex-col gap-6 lg:w-1/2">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
                    {apiData.event_name}
                  </h1>
                </div>

                {/* Date */}
                <div className="flex items-start sm:items-center gap-3">
                  <FaCalendar className="text-2xl text-blue-500" />
                  <div className="text-sm sm:text-base">
                    <p className="font-semibold">
                      {dateFormatter(apiData.start_datetime)}
                    </p>
                    <p className="text-gray-600">
                      {apiData?.start_datetime?.split(" ")[1]}{" "}
                      {apiData?.start_datetime?.split(" ")[2]} –{" "}
                      {apiData.end_datetime}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <a target="_blank" rel="noreferrer" href={apiData.send_link}>
                  <div className="flex items-start gap-3">
                    <MdLocationOn className="text-2xl text-pink-500 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base">
                      {apiData.location_address}
                    </p>
                  </div>
                </a>

                {/* Share Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-black/30 rounded-xl bg-white hover:bg-gray-200 transition-all duration-300"
                  >
                    <FaShare className="text-lg" />
                    Share Event
                  </button>
                </div>

                {/* Registration Status */}
                {userDetails && apiData.eventdetails && (
                  <div className="bg-green-100 rounded-xl p-3 flex justify-between items-center">
                    <p className="font-medium text-green-800">You’re in!</p>
                    <button className="bg-green-700 rounded-xl text-xs text-white px-4 py-1">
                      {timeLeft}
                    </button>
                  </div>
                )}

                {/* Registration Form */}
                {(!userDetails || !apiData.eventdetails) && (
                  <div className="bg-white/70 rounded-xl shadow-sm overflow-hidden">
                    <p className="bg-gray-200 text-black p-3 font-medium">
                      Registration
                    </p>
                    <div className="p-4 text-sm sm:text-base">
                      <p>Welcome! To join the event, please register below.</p>
                      <StyledWrapper className="mt-4">
                        {/* <button
                        disabled={eventRegisteringLoading}
                          onClick={() =>
                            userDetails
                              ? registerForEventButtonClicked()
                              : setClickHereToRegisterButtonClicked(true)
                          }
                          className="btn-donate"
                        >
                          {userDetails
                            ? "One click to register"
                            : "Click here to register"}
                        </button> */}

                        <button
                          onClick={() =>
                            userDetails
                              ? registerForEventButtonClicked()
                              : setClickHereToRegisterButtonClicked(true)
                          }
                          disabled={eventRegisteringLoading} // disable during loading
                          className={`btn-donate flex items-center justify-center gap-2 ${
                            eventRegisteringLoading
                              ? "opacity-70 cursor-wait"
                              : ""
                          }`}
                        >
                          {eventRegisteringLoading ? (
                            <>
                              <svg
                                className="animate-spin h-5 w-5 text-white"
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
                              <span>Registering...</span>
                            </>
                          ) : userDetails ? (
                            "One click to register"
                          ) : (
                            "Click here to register"
                          )}
                        </button>
                      </StyledWrapper>
                    </div>
                  </div>
                )}

                {/* About Event */}
                {apiData.event_description &&
                  apiData.event_description !== "<p><br></p>" && (
                    <div className="bg-white/70 rounded-xl shadow-sm overflow-hidden">
                      <p className="bg-gray-200 text-black p-3 font-medium">
                        About Event
                      </p>
                      <div
                        className="p-4 text-sm sm:text-base leading-relaxed text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: apiData.event_description,
                        }}
                      />
                    </div>
                  )}

                {/* Map */}
                {map && (
                  <div
                    className="overflow-hidden mt-3 md:mt-5 h-52 w-full rounded-xl shadow-lg"
                    dangerouslySetInnerHTML={{ __html: map }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Registration Modal */}
      {registeredUserIconClicked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md px-4 py-6 overflow-y-auto">
          <div className="relative bg-white backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl w-full sm:w-[80%] md:w-[60%] lg:w-[35%] max-h-[90vh] overflow-y-auto ">
            {/* Close Button */}
            <button
              onClick={() => setRegisteredUserIconClicked(false)}
              className="absolute top-3 right-3 text-2xl font-extrabold text-gray-500 hover:text-gray-700 transition-all"
            >
              ✕
            </button>

            {/* Header */}
            <div className="text-center pt-6 pb-3 border-b border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Registered Guests
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                {registeredGuestListData.length}{" "}
                {registeredGuestListData.length === 1 ? "Guest" : "Guests"}{" "}
                attending
              </p>
            </div>

            {/* Guest List */}
            <div className="p-5 sm:p-6 flex flex-col gap-4">
              {registeredGuestListData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white/70 hover:bg-white/90 transition-all rounded-xl p-3 border border-gray-100 shadow-inner"
                >
                  <FaCircleUser className="text-3xl text-blue-500 flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-gray-800 text-sm sm:text-base font-medium">
                      {item.first_name} {item.last_name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {clickHereToRegisterButtonClicked && (
        <div className="fixed inset-0 z-10 flex items-center bg-black/10 justify-center backdrop-blur overflow-y-auto overflow-x-hidden">
          <div className="flex items-center justify-center  bg-white">
            <div className="w-screen   md:w-[70vw] py-3  lg:w-[60vw]  shadow-2xl  shadow-black/30 rounded-md">
              <button
                onClick={() => setClickHereToRegisterButtonClicked(false)}
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

      {/* Share Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-2xl shadow-2xl w-[90vw] sm:w-[70vw] lg:w-[50vw] text-center relative"
            >
              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black text-lg"
              >
                ✖
              </button>

              <h2 className="text-lg sm:text-xl font-semibold mb-6 text-gray-800">
                Share this Event
              </h2>

              {/* Share Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    url
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white p-4 rounded-xl flex gap-3 items-center justify-center hover:scale-105 transition"
                >
                  <FaFacebook className="text-2xl" />
                  Facebook
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    url
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-500 text-white p-4 rounded-xl flex gap-3 items-center justify-center hover:scale-105 transition"
                >
                  <FaTwitter className="text-2xl" />
                  Twitter
                </a>

                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                    url
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-700 text-white p-4 rounded-xl flex gap-3 items-center justify-center hover:scale-105 transition"
                >
                  <FaLinkedin className="text-2xl" />
                  Linkedin
                </a>

                <a
                  href={`https://www.instagram.com/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-500 text-white p-4 rounded-xl flex gap-3 items-center justify-center hover:scale-105 transition"
                >
                  <FaInstagram className="text-2xl" />
                  Instagram
                </a>

                <a
                  href={`mailto:?subject=Check this event&body=${encodeURIComponent(
                    url
                  )}`}
                  className="bg-red-500 text-white p-4 rounded-xl flex gap-3 items-center justify-center hover:scale-105 transition"
                >
                  <FaEnvelope className="text-2xl" />
                  Gmail
                </a>

                <button
                  onClick={handleCopy}
                  className="bg-gray-700 text-white p-4 rounded-xl flex gap-3 items-center justify-center hover:scale-105 transition"
                >
                  <FaCopy className="text-2xl" />
                  {copyLinkClicked ? "link copied" : "Copy link"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ManageEvent;
